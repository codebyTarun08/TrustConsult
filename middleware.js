import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const { role, id } = payload;

    // Clone headers and attach user info
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", id);
    requestHeaders.set("x-user-role", role);

    // 🔒 Check for admin-only routes
    const pathname = request.nextUrl.pathname;

    const adminOnlyRoutes = [
      "/dashboard/category",
    ];

    if (adminOnlyRoutes.some((route) => pathname.startsWith(route))) {
      if (role !== "Admin") {
        return NextResponse.redirect(new URL("/403", request.url)); // custom Forbidden page
      }
    }

    // Forward request with headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("Middleware JWT Error:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/users/uploadProfile",
    "/api/users/updateProfile",
    "/api/consultant/:path",
    "/api/admin/:path*",       // protect admin APIs
  ],
};

import { NextResponse } from "next/server";
import databaseConnection from "@/lib/dbConfig";
import Booking from "@/models/bookingModel";

export async function PUT(req) {
  try {
    await databaseConnection();

    const { bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID required" }, { status: 400 });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

    if (booking.status !== "pending") {
      return NextResponse.json({ error: "Booking already processed" }, { status: 400 });
    }

    booking.status = "confirmed";
    await booking.save();

    return NextResponse.json(
      { message: "Booking accepted successfully", booking, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error accepting booking:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

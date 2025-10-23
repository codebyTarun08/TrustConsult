import { NextResponse } from "next/server";
import databaseConnection from "@/lib/dbConfig";
import Booking from "@/models/bookingModel";

export async function PUT(req) {
  try {
    await databaseConnection();

    const { bookingId, reason } = await req.json();

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID required" }, { status: 400 });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

    if (booking.status === "completed") {
      return NextResponse.json({ error: "Completed bookings cannot be cancelled" }, { status: 400 });
    }

    booking.status = "cancelled";
    booking.cancelReason = reason || "Cancelled by consultant";
    await booking.save();

    return NextResponse.json(
      { message: "Booking cancelled successfully", booking, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

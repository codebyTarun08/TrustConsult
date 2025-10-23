import { NextResponse } from "next/server";
import databaseConnection from "@/lib/dbConfig";
import Booking from "@/models/bookingModel"
import Review from "@/models/reviewModel";
export async function POST(request){
    try {
        databaseConnection();
        const {clientId, consultantId, description,slot} = await request.json();
        if(!clientId || !consultantId || !description || !slot){ 
            return NextResponse.json(
                {
                    success:false,
                    error:"Missing required fields"
                },
                {status:400}
            )
        }
        const newBooking = await Booking.create({
            clientId,
            consultantId,
            description,
            slot,
            review:null
        });
        return NextResponse.json({
            success:true,
            message:"Booking created successfully",
        },{status:201});
    } catch (error) {
        console.error("Error creating booking:", error);
        return NextResponse.json({
            success:false,
            message:"Failed to create booking"
        },{status:500});
    }
}
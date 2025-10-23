import databaseConnection from "@/lib/dbConfig";
import {NextResponse} from "next/server";
import Booking from "@/models/bookingModel";

export async function GET(request){
    try {
        databaseConnection();
        const userId = request.headers.get("x-user-id");
        const userRole = request.headers.get("x-user-role");
        
        if(!userId || !userRole){
            return NextResponse.json(
                {success:false,message:"Missing required headers"},
                {status:400}
            )
        }
        const query = {};
        if(userRole == "Client"){
            query.clientId = userId;
        }else if (userRole == "Consultant"){
            query.consultantId = userId;
        }
        const bookings = await Booking.find(query);
        return NextResponse.json({ success: true, bookings },{status:200});
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return NextResponse.json({ success: false, message: "Error fetching bookings" },{status:500});
    }
}
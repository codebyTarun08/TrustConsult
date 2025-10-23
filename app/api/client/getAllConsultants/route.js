import User from '@/models/userModel'
import Consultant from '@/models/consultantModel'
import databaseConnection from '@/lib/dbConfig'
import { NextResponse } from 'next/server'
import Availability from '@/models/availabilityModel'
import Category from '@/models/categoryModel'
export async function GET(){
    try {
        // const consultants = await User.find({ role: "Consultant" });
        databaseConnection();
        const consultants = await Consultant.find()
        .populate("consultantId")
        .populate({path:"categories",select:"name"})
        .populate("availability")
        return NextResponse.json(
            {
                success:true,
                message:"All Consultants fetched Successfully",
                consultants
            },
            {status:200}
        )
    } catch (error) {
        console.log("error in getting consultants:", error)
        return NextResponse.json(
            {
                message: "Error in getting consultants",
                error: error.message
            },
            { status: 500 }
        )
    }
}
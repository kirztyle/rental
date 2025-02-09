import { connectDB } from "@/lib/mongodb";
import { Booking } from "@/models/Booking"; // Pastikan Booking sudah import
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB(); // Pastikan DB sudah connect sebelum query
  const bookings = await Booking.find().populate("carId");
  return NextResponse.json(bookings);
}

export async function POST(req: Request) {
  await connectDB();
  const { carId, user, whatsappNumber, startDate, endDate, totalPrice } = await req.json();

  if (!whatsappNumber) {
    return NextResponse.json({ error: "WhatsApp number is required" }, { status: 400 });
  }

  const booking = await Booking.create({
    carId,
    user,
    whatsappNumber,
    startDate,
    endDate,
    totalPrice,
  });

  return NextResponse.json(booking, { status: 201 });
}

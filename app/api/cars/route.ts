import { connectDB } from "@/lib/mongodb";
import { Car } from "@/models/Car";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const cars = await Car.find();
  return NextResponse.json(cars);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const car = await Car.create(data);
  return NextResponse.json(car, { status: 201 });
}

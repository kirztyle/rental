import { connectDB } from "@/lib/mongodb";
import { Car } from "@/models/Car";
import { NextResponse } from "next/server";

// Ambil mobil berdasarkan ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const car = await Car.findById(params.id);
  if (!car) return NextResponse.json({ message: "Mobil tidak ditemukan" }, { status: 404 });
  return NextResponse.json(car);
}

// Update mobil berdasarkan ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();
  const updatedCar = await Car.findByIdAndUpdate(params.id, data, { new: true });
  if (!updatedCar) return NextResponse.json({ message: "Mobil tidak ditemukan" }, { status: 404 });
  return NextResponse.json(updatedCar);
}

// Hapus mobil berdasarkan ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deletedCar = await Car.findByIdAndDelete(params.id);
  if (!deletedCar) return NextResponse.json({ message: "Mobil tidak ditemukan" }, { status: 404 });
  return NextResponse.json({ message: "Mobil berhasil dihapus" });
}

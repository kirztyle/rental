import { connectDB } from "@/lib/mongodb";
import { Car } from "@/models/Car";
import { NextRequest, NextResponse } from "next/server";

// Ambil mobil berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectDB();
  const car = await Car.findById(id);
  if (!car) {
    return NextResponse.json({ message: "Mobil tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(car);
}

// Update mobil berdasarkan ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectDB();
  const data = await request.json();
  const updatedCar = await Car.findByIdAndUpdate(id, data, { new: true });
  if (!updatedCar) {
    return NextResponse.json({ message: "Mobil tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json(updatedCar);
}

// Hapus mobil berdasarkan ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectDB();
  const deletedCar = await Car.findByIdAndDelete(id);
  if (!deletedCar) {
    return NextResponse.json({ message: "Mobil tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ message: "Mobil berhasil dihapus" });
}

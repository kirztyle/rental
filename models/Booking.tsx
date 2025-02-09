import mongoose, { Schema, models } from "mongoose";
import { Car } from "@/models/Car"; // Import model Car biar bisa dipopulate

const BookingSchema = new Schema({
  carId: { type: Schema.Types.ObjectId, ref: "Car" },
  user: String,
  whatsappNumber: { type: String, required: true },
  startDate: Date,
  endDate: Date,
  totalPrice: Number,
});

export const Booking = models.Booking || mongoose.model("Booking", BookingSchema);

import mongoose, { Schema, models } from "mongoose";

const BookingSchema = new Schema({
  carId: { type: Schema.Types.ObjectId, ref: "Car" },
  user: String,
  whatsappNumber: { type: String, required: true },
  startDate: Date,
  endDate: Date,
  totalPrice: Number,
});

export const Booking = models.Booking || mongoose.model("Booking", BookingSchema);

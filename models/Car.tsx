import mongoose, { Schema, models } from "mongoose";

const CarSchema = new Schema({
  name: String,
  brand: String,
  year: Number,
  pricePerDay: Number,
  image: String,
});

export const Car = models.Car || mongoose.model("Car", CarSchema);

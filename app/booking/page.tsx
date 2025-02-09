"use client";

import { useState, useEffect } from "react";

export default function AdminBookingDashboardCards() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/booking");
        if (!res.ok) {
          setError("Failed to fetch bookings");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setBookings(data);
      },
    }
    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-slate-300">
      <h1 className="text-3xl font-bold mb-6">Admin Booking Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-bold mb-2">
                {booking.carId
                  ? `${booking.carId.brand} ${booking.carId.name}`
                  : "N/A"}
              </h2>
              <p className="mb-1">
                <span className="font-semibold">Nama pemesan:</span> {booking.user}
              </p>
              <p className="mb-1">
                <span className="font-semibold">WhatsApp:</span> {booking.whatsappNumber}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Untuk tanggal:</span>{" "}
                {new Date(booking.startDate).toLocaleDateString()}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Sampai tanggal:</span>{" "}
                {new Date(booking.endDate).toLocaleDateString()}
              </p>
              <p className="mt-2 text-lg font-bold text-blue-600">
                Biaya: Rp. {booking.totalPrice}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

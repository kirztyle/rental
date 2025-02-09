"use client";

import { useState, useEffect, Fragment } from "react";
import { Transition } from "@headlessui/react";
import dynamic from 'next/dynamic';

export default function CarCatalog() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    user: "",
    whatsappNumber: "",
    startDate: "",
    endDate: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState("");

  // Fetch list of cars
  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await fetch("/api/cars");
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    }
    fetchCars();
  }, []);

  // Calculate total price
  useEffect(() => {
    if (selectedCar && form.startDate && form.endDate) {
      const start = new Date(form.startDate);
      const end = new Date(form.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalPrice(diffDays * selectedCar.pricePerDay);
    } else {
      setTotalPrice(0);
    }
  }, [selectedCar, form.startDate, form.endDate]);

  const openModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null); // reset selectedCar
    setForm({
      user: "",
      whatsappNumber: "",
      startDate: "",
      endDate: "",
    });
    setTotalPrice(0);
    setMessage("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCar) return;
    const payload = {
      carId: selectedCar._id,
      ...form,
      totalPrice,
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        setMessage("Form berhasil diisi, kami akan mengirim pesan melalui WhatsApp");
        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        const errorData = await res.json();
        setMessage(errorData.error || "Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Car Catalog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car._id} className="border rounded-lg shadow p-4 flex flex-col">
            <img
              src={car.image}
              alt={`${car.brand} ${car.name}`}
              className="w-full h-40 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">
              {car.brand} {car.name}
            </h2>
            <p>Tahun: {car.year}</p>
            <p>Biaya sewa: Rp.{car.pricePerDay} / Hari</p>
            <button
              className="mt-auto bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              onClick={() => openModal(car)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Modal Booking with Transitions */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={closeModal}
              ></div>
            </Transition.Child>

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                  X
                </button>
                <h2 className="text-2xl mb-4">
                  Isi form untuk booking mobil <span className="font-bold"> <br />{selectedCar?.brand} - {selectedCar?.name}</span>
                </h2>
                <h2></h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="user" className="block font-medium">
                      Your Name:
                    </label>
                    <input
                      type="text"
                      id="user"
                      name="user"
                      value={form.user}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="whatsappNumber" className="block font-medium">
                      WhatsApp Number:
                    </label>
                    <input
                      type="text"
                      id="whatsappNumber"
                      name="whatsappNumber"
                      value={form.whatsappNumber}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md"
                      placeholder="e.g., +628123456789"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="startDate" className="block font-medium">
                      Start Date:
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={form.startDate}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block font-medium">
                      End Date:
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={form.endDate}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <p className="font-medium">
                      Total Price:{" "}
                      <span className="text-blue-600">${totalPrice}</span>
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                  >
                    Confirm Booking
                  </button>
                </form>
                {message && <p className="mt-4 text-center">{message}</p>}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Transition>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    year: "",
    pricePerDay: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const res = await axios.get("/api/cars");
    setCars(res.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`/api/cars/${editingId}`, formData);
      setEditingId(null);
    } else {
      await axios.post("/api/cars", formData);
    }
    setFormData({ name: "", brand: "", year: "", pricePerDay: "", image: "" });
    fetchCars();
  };

  const handleEdit = (car) => {
    setEditingId(car._id);
    setFormData({
      name: car.name,
      brand: car.brand,
      year: car.year,
      pricePerDay: car.pricePerDay,
      image: car.image,
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/cars/${id}`);
    fetchCars();
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Manajemen Mobil
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-white p-6 rounded-lg shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama Mobil"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Tahun"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleChange}
              placeholder="Harga per Hari"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="URL Gambar"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
          >
            {editingId ? "Update Mobil" : "Tambah Mobil"}
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:flex lg:justify-center lg:space-x-5 place-items-center pt-5">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 flex flex-col items-center text-center w-72"
          >
            <Image
              src={car.image}
              alt={car.name}
              width={288} // w-72 => 288px
              height={160} // h-40 => 160px
              className="object-cover rounded-xl"
            />
            <div className="mt-4">
              <h2 className="text-xl font-bold text-gray-800">{car.name}</h2>
              <p className="text-gray-500">
                {car.brand} - {car.year}
              </p>
              <p className="text-blue-600 font-semibold text-lg mt-1">
                Rp {car.pricePerDay}/Hari
              </p>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleEdit(car)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(car._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

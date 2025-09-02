

import React from "react";

// Sample Product Data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    image: "headphone.png",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 3999,
    image: "watch.png",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 1999,
    image: "speaker.png",
  },
];

export default function ProductList() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">₹{product.price}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

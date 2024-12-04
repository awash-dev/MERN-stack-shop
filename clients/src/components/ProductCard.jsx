import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, darkMode, closeModal }) => {
  const navigate = useNavigate();

  const handleViewDetails = (e) => {
    e.preventDefault();
    console.log(`Viewing details for ${product.name}`);
    navigate(`/products/${product._id}`);
  };

  return (
    <div
      className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 "
    >
      <span
        onClick={closeModal}
        className="close absolute top-4 right-4 cursor-pointer bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-slate-100 text-2xl transition"
      >
        &times;
      </span>
      <div className="border rounded-lg shadow-md p-4 mt-7 flex justify-center items-center flex-col bg dark:bg-slate-800 bg-slate-200 text-black dark:text-slate-100">
        <img
          src={`http://localhost:3000/img/${product.image}`}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-2"
        />
        <h2
          className={`text-lg font-bold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {product.name}
        </h2>
        <p
          className="dark:text-slate-50 text-black"
        >
          {product.description}
        </p>
        <p
          className={`font-semibold ${
            darkMode ? "text-green-400" : "text-green-600"
          }`}
        >
          {product.price} $
        </p>
        <button
          onClick={handleViewDetails}
          className={`text-blue-500 cursor-pointer hover:underline ${
            darkMode ? "hover:text-blue-300" : "hover:text-blue-700"
          }`}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

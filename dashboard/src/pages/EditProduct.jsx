import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    for (const key in product) {
      formData.append(key, product[key]);
    }

    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      navigate("/product"); // Redirect to product list after successful update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50">
      <Link
        to="/product"
        className="mb-2 w-40 bg-blue-600 text-white rounded-lg p-2 text-center hover:bg-blue-500 transition duration-300"
      >
        Back to Product
      </Link>
      <div className="flex w-full items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex max-w-md w-full bg-white shadow-lg rounded-lg p-6 flex-col"
        >
          <h2 className="text-xl font-semibold text-center mb-6">Edit Product</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="mb-1 text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Product name"
              className="border rounded-lg p-1 w-full bg-gray-100 focus:bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="price" className="mb-1 text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Product price"
              className="border rounded-lg p-1 w-full bg-gray-100 focus:bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="category" className="mb-1 text-gray-700">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="border rounded-lg p-1 w-full bg-gray-100 focus:bg-white focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home</option>
              <option value="toys">Toys</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="description" className="mb-1 text-gray-700">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Product description"
              className="border rounded-lg p-2 w-full bg-gray-100 focus:bg-white focus:border-blue-500 focus:outline-none resize-none overflow-hidden"
              rows={3}
            ></textarea>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="image" className="mb-1 text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="border rounded-lg p-1 w-full bg-gray-100 focus:bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

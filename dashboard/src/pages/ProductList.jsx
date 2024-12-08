import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState(null); // Track which product is being deleted

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const response = await fetch("http://localhost:3000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(`http://localhost:3000/img/${image}`);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    setIsDeleting(true);
    setDeletingId(id);

    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete product");
      }

      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      setError(error.message);
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 p-2">
      <div className="mb-4">
        <Link
          to="/create"
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-500 transition duration-300"
        >
          Create Product
        </Link>
      </div>
      {loading && <p className="text-center">Loading products...</p>}
      {error && (
        <div className="text-red-600 text-center">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()} className=" text-white mt-5">
            Refrash
          </button>
        </div>
      )} <div className="flex-grow rounded-lg shadow-lg h-[calc(100vh-120px)]">
        <div className="overflow-y-auto h-full scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-xs sm:text-sm">ID</th>{" "}
                {/* New ID column */}
                <th className="py-3 px-4 text-left text-xs sm:text-sm">Name</th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm">
                  Price
                </th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm">
                  Category
                </th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm">
                  Description
                </th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm">
                  Image
                </th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No products available
                  </td>{" "}
                  {/* Adjust colspan */}
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-100">
                    <td className="py-3 px-4 border-b text-xs sm:text-sm">
                      {product._id}
                    </td>

                    <td className="py-3 px-4 border-b text-xs sm:text-sm">
                      {product.name}
                    </td>
                    <td className="py-3 px-4 border-b text-xs sm:text-sm">
                      {product.price}
                    </td>
                    <td className="py-3 px-4 border-b text-xs sm:text-sm">
                      {product.category}
                    </td>
                    <td className="py-3 px-4 border-b text-xs sm:text-sm">
                      {product.description}
                    </td>
                    <td className="py-3 px-4 border-b">
                      <img
                        src={`http://localhost:3000/img/${product.image}`}
                        alt={product.name}
                        className="w-16 h-16 object-cover cursor-pointer"
                        onClick={() => handleImageClick(product.image)}
                      />
                    </td>
                    <td className="py-3 px-4 border-b flex space-x-2">
                      <Link
                        to={`/edit/${product._id}`}
                        className="bg-yellow-500 text-white rounded-lg px-4 py-2 hover:bg-yellow-400 transition duration-200 flex items-center"
                      >
                        <FaPen className="mr-1" />
                        
                      </Link>
                      <button
                        className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-500 transition duration-200"
                        onClick={() => handleDelete(product._id)}
                        aria-label={`Delete ${product.name}`}
                        disabled={isDeleting && deletingId === product._id} // Disable only for the current product
                      >
                        {isDeleting && deletingId === product._id ? (
                          "Deleting..."
                        ) : (
                          <MdDelete />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for displaying the image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedImage} alt="Selected" height={50} width={250} />
            <button
              className="mt-4 bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-500 transition duration-300"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

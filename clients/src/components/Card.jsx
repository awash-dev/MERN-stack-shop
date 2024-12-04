import React, { useEffect, useState } from "react";

const Card = ({ darkMode }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleImageClick = (image, product) => {
    setSelectedImage(`http://localhost:3000/img/${image}`);
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedProduct(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <div
      className="flex items-center justify-around flex-col h-full dark:text-white dark:bg-slate-800 "
    >
      {loading && <p className="text-center">Loading products...</p>}
      {error && (
        <div className="text-red-600 text-center">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()} className=" text-white mt-5">
            Refrash
          </button>
        </div>
      )}
      <div className="w-full grid xl:grid-cols-4 md:grid-cols-3 md:gap-x-4 grid-cols-1 justify-around pl-14 xl:pl-20 xl:p-14 gap-y-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="card w-64 h-74 items-center gap-y-2 dark:bg-slate-900 dark:text-slate-50 "
          >
            <img
              src={`http://localhost:3000/img/${product.image}`}
              alt={product.name}
              className="card-img-top h-64 w-64 cursor-pointer"
              onClick={() => handleImageClick(product.image, product)}
            />
            <div className="card-body justify-start">
              <h5 className="card-title">Model: {product.name}</h5>
              <p className="card-text">Price: {product.price} $</p>
              <p className="card-text">{product.description}</p>
              <p className="bg-primary text-white">{product.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for displaying selected image */}
      {selectedImage && (
        <div
          className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
          role="dialog"
          aria-modal="true"
        >
          <span
            onClick={closeModal}
            className="close absolute text-[20px] top-4 right-4 text-white cursor-pointer"
            aria-label="Close modal"
          >
            &times;
          </span>
          <img
            className="modal-content max-w-[400px] max-h-[400px]"
            src={selectedImage}
            alt={selectedProduct?.name || "Selected"}
            role="img"
          />
        </div>
      )}
    </div>
  );
};

export default Card;

import React, { useState, useEffect } from "react";
import {
  FaSun,
  FaMoon,
  FaHome,
  FaEnvelope,
  FaCaretDown,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import ProductDisplay from "./ProductCard";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  // Dark mode config
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className="flex items-center   justify-between p-4 h-[70px] z-50  dark:bg-gray-950 bg-slate-50  
      shadow-md transition-all duration-300 w-full "
    >
      <div className="text-lg  font-bold dark:text-white">eCommerce</div>
      <div className="hidden md:flex items-center space-x-4 ">
        <Link
          to="/home"
          className="flex items-center p-2 rounded dark:text-white  transition  duration-300"
        >
          <FaHome className="mr-1" />
          Home
        </Link>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center p-2 bg-transparent roundedtransition duration-300 dark:text-white"
          >
            Categories
            <FaCaretDown className="ml-1" />
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 bg-slate-50 dark:bg-slate-800 shadow-lg">
              {/* Category Links */}
              <Link
                onClick={toggleDropdown}
                to="/product"
                className="block px-4 py-2 dark:text-white "
              >
                Mobile
              </Link>
              <Link
                onClick={toggleDropdown}
                to="/product"
                className={`block px-4 py-2 dark:text-white hover:bg-gray-600 transition duration-300`}
              >
                Clothes
              </Link>
              <Link
                onClick={toggleDropdown}
                to="/product"
                className={`block px-4 py-2 dark:text-white hover:bg-gray-600 transition duration-300`}
              >
                PC
              </Link>
            </div>
          )}
        </div>
        <Link
          to="/contact"
          className="flex items-center p-2 rounded transition duration-300 dark:text-white "
        >
          <FaEnvelope className="mr-1" />
          Contact
        </Link>
        <form onSubmit={handleSearch} className="flex items-center gap-1">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`p-1 rounded-xl border-2 border-gray-900 dark:text-white transition duration-300`}
          />
          <button
            type="submit"
            className={`flex items-center p-2 rounded-md dark:text-white bg-slate-400 transition duration-300`}
          >
            <FaSearch className=" " />
          </button>
        </form>

        {/* Dropdown for filtered products */}
        {searchQuery && filteredProducts.length > 0 && (
          <div
            className="absolute bg-white shadow-lg rounded-md mt-2 z-20"
            role="menu"
            aria-label="Product List"
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  // Handle the click event, e.g., navigate to the product page programmatically
                  setSearchQuery("");
                  // Add your navigation logic here
                }}
                className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                role="menuitem"
                aria-label={`View details for ${product.name}`}
              >
                <ProductDisplay product={product} />
              </div>
            ))}
          </div>
        )}

        <div onClick={toggleTheme} className="cursor-pointer">
          {theme === "dark" ? (
            <img src="/sun.png" width={40} height={40} alt="Light Mode" />
          ) : (
            <img src="/moon.png" width={40} height={40} alt="Dark Mode" />
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={toggleMobileMenu} className="md:hidden p-2 rounded">
        {isMobileMenuOpen ? (
          <FaTimes className="text-white" />
        ) : (
          <FaBars className="text-white" />
        )}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`absolute top-[80px] left-0 w-fulldark:text-white shadow-lg md:hidden`}
        >
          <Link
            to="/home"
            className={`block px-4 py-2 dark:text-white hover:bg-gray-200 transition duration-300`}
            onClick={toggleMobileMenu}
          >
            <FaHome className="mr-1" />
            Home
          </Link>
          <button
            onClick={toggleDropdown}
            className={`block w-full text-left px-4 py-2 dark:text-white hover:bg-gray-200 transition duration-300`}
          >
            Categories
            <FaCaretDown className="ml-1" />
          </button>
          {isDropdownOpen && (
            <div className="pl-4">
              <Link
                onClick={toggleMobileMenu}
                to="/product"
                className={`block py-2 dark:text-white hover:bg-gray-200 transition duration-300`}
              >
                Mobile
              </Link>
              <Link
                onClick={toggleMobileMenu}
                to="/product"
                className={`block py-2 dark:text-white hover:bg-gray-200 transition duration-300`}
              >
                Clothes
              </Link>
              <Link
                onClick={toggleMobileMenu}
                to="/product"
                className={`block py-2 dark:text-white hover:bg-gray-200 transition duration-300`}
              >
                PC
              </Link>
            </div>
          )}
          <Link
            to="/contact"
            className={`block px-4 py-2 dark:text-white hover:bg-gray-200 transition duration-300`}
            onClick={toggleMobileMenu}
          >
            <FaEnvelope className="mr-1" />
            Contact
          </Link>
          <div className="flex justify-center">
            <div onClick={toggleTheme} className="cursor-pointer">
              {theme === "dark" ? (
                <img src="/sun.png" width={40} height={40} alt="Light Mode" />
              ) : (
                <img src="/moon.png" width={40} height={40} alt="Dark Mode" />
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

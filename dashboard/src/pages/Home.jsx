import React from "react";
import { Link } from "react-router-dom";
import '../index.css'; // Import the CSS file for animations

function Home() {
  return (
    <div className="flex items-center justify-center w-full h-full flex-col mt-8">
      <div>
        <h1 className="text-[30px] animate-fadeIn">Welcome To Admin Panel</h1>
      </div>
      <div className="w-full max-w-[600px]">
        <iframe
          src="https://lottie.host/embed/d25f3a5a-68ca-4357-8f7f-84378ab671de/6Qt0EmWwCg.json"
          className="w-full h-[400px] mt-8"
          style={{ border: "none" }}
          title="Lottie Animation"
        ></iframe>
      </div>
      <Link
        to="/product"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300 animate-bounce"
      >
        Show Product
      </Link>
    </div>
  );
}

export default Home;

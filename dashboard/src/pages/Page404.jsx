import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center  text-center"
      style={{ height: 'calc(100vh - 70px)' }} // Inline style for height calculation
    >
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2 text-gray-600">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;

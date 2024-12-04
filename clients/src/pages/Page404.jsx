import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen  text-center dark:bg-slate-800 dark:text-slate-50"
      
    >
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2 text-gray-500">Sorry, the page you are looking for does not exist.</p>
      <Link to="/home" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;

import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function Admin() {
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "", // Added password field
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${id}` // Fetch user data
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in user) {
      formData.append(key, user[key]);
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${id}`, // Update user data
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      navigate("/user"); // Redirect to user list after successful update
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50">
      <Link
        to="/user"
        className="mb-2 w-40 bg-blue-600 text-white rounded-lg p-2 text-center hover:bg-blue-500 transition duration-300"
      >
        Back to Users
      </Link>
      <div className="flex w-full items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex max-w-md w-full bg-white shadow-lg rounded-lg p-6 flex-col"
        >
          <h2 className="text-xl font-semibold text-center mb-6">
            Edit User
          </h2>
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="mb-1 text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Username"
              className="border rounded-lg p-1 w-full bg-gray-100 focus:bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="User email"
              className="border rounded-lg p-1 w-full bg-gray-100 focus:bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password" className="mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
              className="border rounded-lg p-1 w-full bg-gray-100 focus:bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Fetching users...");
        const response = await fetch("http://localhost:3000/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        console.log("Fetched users:", data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Could not load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setIsDeleting(true);
      setDeletingId(userId);
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${userId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        setUsers(users.filter((u) => u._id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
        setError("Could not delete user. Please try again.");
      } finally {
        setIsDeleting(false);
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 p-2">
      <div className="mb-4">
        <Link
          to="/userEdit"
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-500 transition duration-300"
        >
          Back to Product
        </Link>
      </div>
      {loading && <p className="text-center">Loading users...</p>}
      {error && <p className="text-red-600 text-center">Error: {error}</p>}
      <div className="flex-grow rounded-lg shadow-lg h-[calc(100vh-120px)]">
        <div className="overflow-y-auto h-full scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-600 text-white">
              <tr>
              <th className="py-3 px-4 text-left text-xs sm:text-sm">#</th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm">Name</th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm">
                  Email
                </th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm">
                  password
                </th>
                <th className="py-3 px-4 text-left text-xs sm:text-sm">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center">
                    No users available
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-100">
                    <td className="py-3 px-4 border-b text-xs sm:text-sm">
                      {u._id}
                    </td>
                    <td className="py-3 px-4 border-b text-xs sm:text-sm">
                      {u.username}
                    </td>

                    <td className="py-3 px-4 border-b text-xs sm:text-sm">
                      {u.email}
                    </td>
                    <td className="py-3 px-4 border-b text-xs sm:text-sm">
                      {u.password}
                    </td>
                    <td className="py-3 px-4 border-b flex space-x-2">
                      {/* <Link
                        to={`/admin/${u._id}`}
                        className="bg-yellow-500 text-white rounded-lg px-4 py-2 hover:bg-yellow-400 transition duration-200 flex items-center"
                        
                      >
                        <FaPen className="mr-1" />
                      </Link> */}
                      <button
                        className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-500 transition duration-200"
                        onClick={() => handleDelete(u._id)}
                        aria-label={`Delete user ${u.username}`}
                        disabled={isDeleting && deletingId === u._id}
                      >
                        {isDeleting && deletingId === u._id ? (
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
    </div>
  );
}

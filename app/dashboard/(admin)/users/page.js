"use client";
import { getAllUsers } from "@/services/adminService";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getAllUsers())
        setUsers(result);
        console.log("Fetched users:", result);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (users.length === 0) {
      fetchUsers();
    }
  }, [dispatch, users.length,isClient]);

  const filteredUsers = users.filter((u) =>
    isClient ? u.role === "Client" : u.role === "Consultant"
  );

  return (
    <div className="text-white min-h-[calc(100vh-3.5rem)] font-inter">
      <h3 className="text-xl">All Users</h3>
      <div className="w-11/12 mt-4 border-b border-richblack-400"></div>

      {/* Toggle Buttons */}
      <div className="flex justify-around items-center text-richblack-200 my-5">
        <button
          onClick={() => setIsClient(true)}
          className={`relative pb-2 transition-all duration-200
            ${isClient ? "text-richblack-5 font-semibold" : ""}
            ${isClient ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-yellow-500' : ""}`}
        >
          Client
        </button>
        <button
          onClick={() => setIsClient(false)}
          className={`relative pb-2 transition-all duration-200
            ${!isClient ? "text-richblack-5 font-semibold" : ""}
            ${!isClient ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-yellow-500' : ""}`}
        >
          Consultant
        </button>
      </div>

      {/* Users Table */}
      <div className="w-11/12 border border-richblack-400 rounded-lg flex flex-col items-center overflow-hidden transition-all duration-300">
        {loading ? (
          <p className="flex justify-center items-center text-white">Loading..</p>
        ) : filteredUsers.length > 0 ? (
          <table className="min-w-full">
            <thead className="bg-black/50 backdrop-blur-3xl">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-medium uppercase tracking-wider">
                  S.No.
                </th>
                <th className="px-6 py-5 text-center text-xs font-medium uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-5 text-center text-xs font-medium uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-5 text-center text-xs font-medium uppercase tracking-wider">
                  Phone Number
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u, index) => (
                  <tr
                    key={u._id}
                    className={index % 2 === 0 ? "bg-richblue-700/30" : "bg-black/15"}
                  >
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium flex justify-evenly items-center">
                        <span>
                            <img
                              className='w-12 h-12 object-cover rounded-full object-center z-10'
                              src={u?.image}
                              alt={`${u?.firstName}`}
                            />
                        </span>
                        <p>{u.firstName + " " + u.lastName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-medium">
                      <div className="flex justify-center items-center space-x-2">
                        {u.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-center text-sm font-medium">
                      {u.phoneNumber}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-8 text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <p className="p-4">No users</p>
        )}
      </div>
    </div>
  );
};

export default Page;

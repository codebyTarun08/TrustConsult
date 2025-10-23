"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { getBookings } from "@/services/clientService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faUserTie,
  faDollarSign,
  faSpinner,
  faTimesCircle,
  faCheckCircle,
  faCircleInfo,
  faStar,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

// ========================== Utility Functions ==========================

// Format 24-hour integer to 12-hour string
const formatHour = (hour) => {
  const h = hour % 12 || 12;
  const ampm = hour < 12 || hour === 24 ? "AM" : "PM";
  return `${h}:00 ${ampm}`;
};

// Display slot as "9:00 AM - 10:00 AM"
const formatSlotForDisplay = (slotObject) => {
  if (!slotObject || slotObject.startHour === undefined || slotObject.endHour === undefined) return "N/A";
  const start = formatHour(slotObject.startHour);
  const end = formatHour(slotObject.endHour);
  return `${start} - ${end}`;
};

// Format ISO date to human-readable
const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Invalid Date";
  }
};

// Check if current time is within booking slot time
const isChatActive = (slot) => {
  const now = new Date();
  const start = new Date(slot.date);
  start.setHours(slot.startHour, 0, 0);
  const end = new Date(slot.date);
  end.setHours(slot.endHour, 0, 0);
  return (now >= start);
};

// Status badge (booking + payment)
const getStatusBadge = (status) => {
  const baseClasses = "text-xs px-2 py-0.5 rounded-full font-bold shadow-sm";

  if (status === "unpaid") {
    return (
      <span className={`${baseClasses} bg-red-600 text-white`}>
        <FontAwesomeIcon icon={faDollarSign} className="mr-1" /> UNPAID
      </span>
    );
  }else if (status === "paid") {
    return (
      <span className={`${baseClasses} bg-green-600 text-white`}>
        <FontAwesomeIcon icon={faDollarSign} className="mr-1" /> PAID
      </span>
    );
  }

  switch (status) {
    case "completed":
      return (
        <span className={`${baseClasses} bg-green-500 text-white`}>
          <FontAwesomeIcon icon={faCheckCircle} className="mr-1" /> COMPLETED
        </span>
      );
    case "cancelled":
      return (
        <span className={`${baseClasses} bg-gray-500 text-white`}>
          <FontAwesomeIcon icon={faTimesCircle} className="mr-1" /> CANCELED
        </span>
      );
    case "pending":
      return (
        <span className={`${baseClasses} bg-yellow-500 text-gray-900`}>
          <FontAwesomeIcon icon={faClock} className="mr-1" /> PENDING
        </span>
      );
    case "confirmed":
      return (
        <span className={`${baseClasses} bg-blue-500 text-white`}>
          <FontAwesomeIcon icon={faCheckCircle} className="mr-1" /> CONFIRMED
        </span>
      );
    default:
      return (
        <span className={`${baseClasses} bg-neutral-600 text-white`}>
          STATUS UNKNOWN
        </span>
      );
  }
};

// ========================== Main Component ==========================

const BookingsPage = () => {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  // ---------------------- Fetch Bookings ----------------------
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        let payload = {
          userId : user._id,
          role: user.role
        }
        const result = await dispatch(getBookings(payload));
        setBookings(result?.data || result || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load your booking history.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [dispatch]);

  // ---------------------- Filter Bookings ----------------------
  const filteredBookings = useMemo(() => {
    const now = new Date();

    return bookings.filter((b) => {
      const bookingDate = new Date(b.slot.date);

      switch (activeTab) {
        case "upcoming":
          return b.status === "confirmed" && bookingDate >= now;
        case "payment_pending":
          return b.paymentStatus === "unpaid";
        case "completed":
          return b.status === "completed";
        case "all":
        default:
          return true;
      }
    });
  }, [bookings, activeTab]);

  // ---------------------- Action Handlers ----------------------

  const handleChat = (bookingId, slot) => {
    if (!isChatActive(slot)) {
      toast.error("Chat will open only during your scheduled slot time.");
      return;
    }
    window.location.href = `/chat/${bookingId}`;
  };

  const handlePay = (bookingId) => {
    toast.success(`Redirecting to payment for Booking ID: ${bookingId}`);
    // Implement payment modal or redirect logic
  };

  const handleReview = (bookingId) => {
    toast.success(`Opening review form for Booking ID: ${bookingId}`);
    // Implement review modal or separate page
  };

  // ---------------------- Render ----------------------
  if (loading) {
    return (
      <div className="bg-gray-900 h-[calc(100vh-4rem)] font-inter text-white p-10 flex justify-center items-center">
        <div className="flex flex-row justify-center items-center gap-4">
          <FontAwesomeIcon icon={faSpinner} spin className="w-8 h-8 text-blue-400" />
          <p className="text-xl text-blue-200">Loading your consultations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen font-inter text-white p-4 sm:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-white">🗓️ My Consultation History</h2>

        {/* Tabs */}
        <div className="flex space-x-2 sm:space-x-4 mb-8 border-b border-gray-700">
          {["all", "upcoming", "payment_pending", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 sm:px-6 text-sm sm:text-base font-semibold transition-colors duration-200 ${
                activeTab === tab
                  ? "border-b-4 border-blue-500 text-blue-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab === "all" && "All Bookings"}
              {tab === "upcoming" && "Upcoming Consultations"}
              {tab === "payment_pending" && "Payment Pending"}
              {tab === "completed" && "Completed"}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="p-10 bg-gray-800 rounded-lg text-center border-2 border-dashed border-gray-700">
            <p className="text-xl text-gray-400">
              {activeTab === "all" && "You haven't made any bookings yet."}
              {activeTab === "upcoming" && "No upcoming consultations found."}
              {activeTab === "payment_pending" && "No pending payments."}
              {activeTab === "completed" && "No completed consultations yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-700 flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  {getStatusBadge(booking.status)}
                  {getStatusBadge(booking.paymentStatus)}
                  <span className="text-xs text-gray-500">
                    Booked: {formatDate(booking.createdAt)}
                  </span>
                </div>

                {/* Consultant Info */}
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-1 flex items-center">
                    <FontAwesomeIcon icon={faUserTie} className="mr-2 text-blue-400" />
                    Consultant:
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {booking.consultantId?.firstName
                      ? `${booking.consultantId.firstName} ${booking.consultantId.lastName}`
                      : booking.consultantId?._id || booking.consultantId}
                  </p>
                </div>

                {/* Slot Details */}
                <div className="mb-4 space-y-2">
                  <p className="flex items-center text-md font-medium text-gray-300">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-yellow-400 w-4 h-4" />
                    Date: {formatDate(booking.slot.date)}
                  </p>
                  <p className="flex items-center text-md font-medium text-gray-300">
                    <FontAwesomeIcon icon={faClock} className="mr-2 text-yellow-400 w-4 h-4" />
                    Time: {formatSlotForDisplay(booking.slot)}
                  </p>
                </div>

                {/* Description & Amount */}
                <div className="mb-4 border-t border-gray-700 pt-3">
                  <p className="text-sm font-medium text-gray-400 flex items-center mb-1">
                    <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
                    Description:
                  </p>
                  <p className="text-sm text-gray-200 line-clamp-2 italic mb-3">
                    {booking.description}
                  </p>

                  <p className="text-xl font-bold text-green-400 flex items-center">
                    <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                    ${booking.slot.bookingAmount.toFixed(2)}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-auto space-y-2">
                  {/* CHAT Button */}
                  {booking.status === "confirmed" ? (
                    <button
                      disabled={!isChatActive(booking.slot)}
                      onClick={() => handleChat(booking._id, booking.slot)}
                      className={`w-full py-2 rounded-lg font-semibold transition ${
                        !isChatActive(booking.slot)
                          ? "bg-gray-600 cursor-not-allowed text-gray-300"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      <FontAwesomeIcon icon={faComments} className="mr-2" />
                      {!isChatActive(booking.slot) ? "Chat (Locked)" : "Join Chat"}
                    </button>
                  ):(
                    <p className="text-center text-red-600 font-semibold bg-yellow-300 py-2 rounded-xl">Request Not Accepted yet</p>
                  )}

                  {/* PAY Button */}
                  {(booking.paymentStatus === "unpaid" && booking.status === "completed") && (
                    <button
                      onClick={() => handlePay(booking._id)}
                      className="w-full py-2 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      <FontAwesomeIcon icon={faDollarSign} className="mr-2" /> Pay Now
                    </button>
                  )}

                  {/* REVIEW Button */}
                  {booking.status === "completed" && !booking.reviewStatus && (
                    <button
                      onClick={() => handleReview(booking._id)}
                      className="w-full py-2 bg-yellow-600 rounded-lg font-semibold hover:bg-yellow-700 transition"
                    >
                      <FontAwesomeIcon icon={faStar} className="mr-2" /> Leave a Review
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;

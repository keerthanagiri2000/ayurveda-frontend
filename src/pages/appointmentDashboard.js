import React, { useEffect, useState } from "react";
import { APPOINTMENT } from "../config";

const AppointmentDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchAppointments();
  }, [filter]);

  const fetchAppointments = async () => {
    const res = await fetch(APPOINTMENT.DASHBOARD_LIST(user.id, filter), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setAppointments(data.data || []);
  };

  const handleCancel = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    const res = await fetch(APPOINTMENT.CANCEL(appointmentId), { method: "POST" });
    const result = await res.json();
    if (res.ok) fetchAppointments();
    else alert(result.message);
  };

  const statusBadge = (status) => {
    switch (status) {
      case "booked":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const now = new Date();

  const upcomingAppointments = appointments.filter(
    (appt) => new Date(appt.slotId.startTime) > now && appt.status === "booked"
  );

  const pastAppointments = appointments.filter(
    (appt) =>
      new Date(appt.slotId.startTime) <= now ||
      appt.status === "completed" ||
      appt.status === "cancelled"
  );

  const renderAppointmentCard = (appt) => (
    <div
      key={appt._id}
      className="bg-white shadow rounded p-4 flex flex-col items-center text-center mb-4 border-l-4 hover:shadow-md transition w-full sm:w-80"
    >
      <p className="text-green-600 text-sm mb-1">{appt.doctorId.mode}</p>
      <h4 className="font-bold text-gray-800 mb-1">{appt.doctorId.name}</h4>
      <p className="text-gray-600 mb-2">{appt.doctorId.specialization}</p>
      <p className="text-gray-500 text-sm mb-2">{new Date(appt.slotId.startTime).toLocaleString()}</p>
      <span
        className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-2 ${statusBadge(
          appt.status
        )}`}
      >
        {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
      </span>
      {appt.status === "booked" && (
        <button
          className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={() => handleCancel(appt._id)}
        >
          Cancel
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Appointments</h2>

      {/* Filter */}
      <div className="mb-6 flex items-center space-x-3">
        <label className="font-medium text-gray-700">Filter by Status:</label>
        <select
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="booked">Booked</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Upcoming */}
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Upcoming Appointments</h3>
      {upcomingAppointments.length === 0 ? (
        <p className="text-gray-500 mb-6">No upcoming appointments.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {upcomingAppointments.map(renderAppointmentCard)}
        </div>
      )}

      {/* Past */}
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Past Appointments</h3>
      {pastAppointments.length === 0 ? (
        <p className="text-gray-500">No past appointments.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pastAppointments.map(renderAppointmentCard)}
        </div>
      )}
    </div>
  );
};

export default AppointmentDashboard;

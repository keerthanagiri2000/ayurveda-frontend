import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AppointmentModal({ doctor, show, onClose }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");

  // Mock slots
  const slots = [
    { start: "09:00 AM", end: "09:15 AM" },
    { start: "09:15 AM", end: "09:30 AM" },
    { start: "09:30 AM", end: "09:45 AM" },
    { start: "09:45 AM", end: "10:00 AM" },
    { start: "10:00 AM", end: "10:15 AM" },
  ];

  const handleConfirmStep = () => {
    if (!showOtp) {
      setShowOtp(true);
    } else {
      if (otp === "1234") {
        alert("Appointment booked successfully");
        onClose();
      } else {
        alert("Invalid OTP, try again");
      }
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[40%] relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Book Appointment with Dr. {doctor?.name}
        </h2>

        {!showOtp ? (
          <>
            {/* Calendar + Slots */}
            <div className="grid grid-cols-2 gap-4">
              {/* Calendar */}
              <div>
                <h3 className="font-medium mb-2">Select Date</h3>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  inline
                />
              </div>

              {/* Time slots */}
              <div>
                <h3 className="font-medium mb-2">Pick a time</h3>
                <div className="flex flex-col gap-2">
                  {slots.map((slot, idx) => (
                    <label
                      key={idx}
                      className={`border rounded-md px-3 py-2 cursor-pointer ${
                        selectedTime === idx ? "bg-green-600 text-white" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="slot"
                        className="hidden"
                        onChange={() => setSelectedTime(idx)}
                      />
                      {slot.start} - {slot.end}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-4 p-3 border rounded-md bg-gray-50">
              <p className="text-sm text-gray-600">Scheduling</p>
              {selectedTime !== null ? (
                <p className="font-medium">
                  {selectedDate.toLocaleDateString()} —{" "}
                  {slots[selectedTime].start} to {slots[selectedTime].end}
                </p>
              ) : (
                <p className="text-gray-400">Select a time slot</p>
              )}
            </div>

            <div className="flex justify-end mt-4">
              <button
                disabled={selectedTime === null}
                onClick={handleConfirmStep}
                className="bg-green-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                Next Step
              </button>
            </div>
          </>
        ) : (
          <>
            {/* OTP Step */}
            <p className="mb-2 text-gray-600">
              Enter OTP to confirm your booking for <br />
              <b>
                {selectedDate.toLocaleDateString()} —{" "}
                {slots[selectedTime].start} to {slots[selectedTime].end}
              </b>
            </p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full border rounded-md p-2 mb-3"
            />
            <button
              onClick={handleConfirmStep}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              Confirm Appointment
            </button>
          </>
        )}
      </div>
    </div>
  );
}

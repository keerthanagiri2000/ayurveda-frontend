import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SLOT } from "../config";
import { formatSlotDate } from "../utils/formatSlotDate";
import { formatDateForAPI } from "../utils/formatDateForAPI";

export default function AppointmentModal({ doctor, show, onClose }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");

   useEffect(() => {
    if (show) {
      setSelectedDate(new Date());
      setSelectedTime(null);
      setShowOtp(false);
      setOtp("");
    }
  }, [show, doctor]);

  const fetchSlots = async () => {
    try {
        const formattedDate = formatDateForAPI(selectedDate);
        const res = await fetch(SLOT.AVAILABLE_DOCTOR_SLOTS(doctor._id, formattedDate))
        const data = await res.json();
        setSlots(data.data)
    } catch (error) {
        console.log(error.message);
    }
  };

  useEffect(() => {
    fetchSlots()
  }, [doctor, selectedDate])


  const handleConfirmStep = async (slotId) => {
    if (!showOtp) {
      const res = await fetch(SLOT.LOCK_SLOT(slotId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data?.data?.message) {
        alert(data.data.message);
      }

      setShowOtp(true);
      return;
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
                    {slots.length > 0 ? (
                    slots.map((slot) => {
                        const isBooked = slot.booked === true;
                        const isLocked = slot.locked === true;

                        return (
                        <label
                            key={slot._id}
                            className={`border rounded-md px-3 py-2 cursor-pointer 
                            ${selectedTime === slot._id ? "bg-green-600 text-white" : ""}
                            ${isBooked || isLocked ? "bg-gray-200 text-gray-500 cursor-not-allowed" : ""}
                            `}
                        >
                            <input
                            type="radio"
                            name="slot"
                            className="hidden"
                            disabled={isBooked || isLocked}
                            onChange={() => setSelectedTime(slot._id)}
                            />
                            {formatSlotDate(slot.startTime)} - {formatSlotDate(slot.endTime)}
                            {isBooked && " (Booked)"}
                        </label>
                        );
                    })
                    ) : (
                    <p className="text-gray-500 italic">No slots available for this day</p>
                    )}
                </div>
                </div>
            </div>

            {/* Summary */}
            <div className="mt-4 p-3 border rounded-md bg-gray-50">
              <p className="text-sm text-gray-600">Scheduling</p>
              {selectedTime !== null ? (
                (() => {
                    const slot = slots.find((s) => s._id === selectedTime);
                    if(!slot) return <p className="text-gray-400">Select a time slot</p>;
                    return (
                        <p className="font-medium">
                            {selectedDate.toLocaleDateString()} — {" "}
                            {formatSlotDate(slot.startTime)} to {formatSlotDate(slot.endTime)}
                        </p>
                    )
                })()
              ) : (
                <p className="text-gray-400">Select a time slot</p>
              )}
            </div>

            <div className="flex justify-end mt-4">
              <button
                disabled={selectedTime === null}
                onClick={() => handleConfirmStep(selectedTime)}
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
                    {(() => {
                    const slot = slots.find((s) => s._id === selectedTime);
                    if (!slot) return "No slot selected";
                    return `${selectedDate.toLocaleDateString()} — ${formatSlotDate(
                        slot.startTime
                    )} to ${formatSlotDate(slot.endTime)}`;
                    })()}
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

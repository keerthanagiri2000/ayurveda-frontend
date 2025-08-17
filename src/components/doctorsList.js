import { useEffect, useState } from "react";
import { DOCTORS } from "../config";
import AppointmentModal from "./appointmentModal";
import { useNavigate } from "react-router-dom";
import CompactPagination from "./pagination";

export default function DoctorsList() {
    const navigate = useNavigate();
    const [doctors, setDoctorData] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [total, setTotal] = useState(0);
    const [specialization, setSpecialization] = useState("");
    const [mode, setMode] = useState("");

      const fetchDoctors = async (pageNumber = 1, pageLimit = 12) => {
      try {
        const response = await fetch(DOCTORS.GET_ACTIVE_DOCTORS_LIST(pageNumber, pageLimit, specialization, mode));
        const data = await response.json();
        setDoctorData(data.data);
        setTotal(data.total);
        setPage(data.page);
        setLimit(data.limit);
      } catch (error) {
        console.log(error.message);
      }
    };

    useEffect(() => {
      fetchDoctors();
    }, [specialization, mode]);

    const handlePageChange = (pageNumber) => {
      fetchDoctors(pageNumber);
    };

    const handleBookAppointment = (doctor) => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }
     setSelectedDoctor(doctor);
     setShowModal(true);
    };

    const clearFilters = () => {
    setSpecialization("");
      setMode("");
      fetchDoctors(1, limit);
    }

  return (
    <div className="w-full pb-12">
      <div className="w-full flex flex-col items-center gap-6">
        <div className="w-3/4">
          <h1 className="text-2xl font-semibold">Doctors List</h1>
          <p className="font-extralight text-md text-gray-700">
            Search doctors by specialization and mode
          </p>
          <div className="flex gap-6 mt-6">
            <input
              type="text"
              placeholder="Search by Specialization"
              className="border border-md p-2"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
            <select 
              className="border borde-md p-2" 
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="">Select Mode</option>
              <option value="online">Online</option>
              <option value="in_person">In-Person</option>
            </select>

            <button
              onClick={clearFilters}
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-3/4">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="flex flex-col gap-2 border border-md">
              <img
                src={doctor.image}
                alt="doctor"
                className="w-full h-64 object-cover"
              />
              <div className="p-2">
                <p className="border border-md w-full text-sm p-1 text-green-700 font-semibold">
                  {doctor.specialization}
                </p>
                <h2 className="font-bold mt-2 text-black-500 text-xl">
                  Dr. {doctor.name}
                </h2>
                <p className="text-gray-500 font-extralight">{doctor.mode}</p>
              </div>
              <div className="bg-[#4dae37] hover:bg-green-500">
                <button
                  onClick={() => handleBookAppointment(doctor)}
                  className="p-2 w-full text-white font-semibold text-sm"
                >
                  Book An Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
        <CompactPagination
            currentPage={page}
            totalItems={total}
            limit={limit}
            onPageChange={handlePageChange}
          />
      </div>

       <AppointmentModal
        doctor={selectedDoctor}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

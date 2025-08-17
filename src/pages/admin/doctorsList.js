import { useNavigate } from "react-router-dom"
import Layout from "../../components/layout";
import { useState, useEffect } from "react";
import { DOCTORS } from "../../config.js";
import { formatDate } from "../../utils/formatDate.js";
import CompactPagination from "../../components/pagination.js";

export default function DoctorsList () {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);

    const fetchDoctors = async (pageNumber = 1, pageLimit = 12) => {
      try {
        const response = await fetch(DOCTORS.LIST(pageNumber, pageLimit));
        const data = await response.json();
        setDoctors(data.data);
        setTotal(data.total);
        setPage(data.page);
        setLimit(data.limit);
      } catch (error) {
        console.log(error.message);
      }
    };

    useEffect(() => {
      fetchDoctors();
    }, []);

    const handlePageChange = (pageNumber) => {
      fetchDoctors(pageNumber);
    };

    return (
        <Layout>
            <div className="flex h-screen">
                <main className="flex-1 p-6">
                    <div className="flex justify-between ltems-center">
                        <h1 className="text-xl font-bold">Doctors List</h1>
                        <button className="text-sm bg-[#4dae37] text-white px-4 py-2 rounded-lg hover:bg-green-700" onClick={() => navigate("/admin/add_doctor")}>+ Add Doctor</button>
                    </div>
                    <table className="w-full border-collpase mt-6">
                        <thead>
                            <tr className="text-left border-b">
                                <th className="p-3 text-sm font-semibold">Name</th>
                                <th className="p-3 text-sm font-semibold">Specialization</th>
                                <th className="p-3 text-sm font-semibold">Mode</th>
                                <th className="p-3 text-sm font-semibold">Profile</th>
                                <th className="p-3 text-sm font-semibold">Status</th>
                                <th className="p-3 text-sm font-semibold">Created Date</th>
                                <th className="p-3 text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((doctor) => (
                                <tr key={doctor.id} className="border-b">
                                    <td className="p-2 text-sm text-gray-700">{doctor.name}</td>
                                    <td className="p-2 text-sm text-gray-700">{doctor.specialization}</td>
                                    <td className="p-2 text-sm text-gray-700">{doctor.mode}</td>
                                    <td className="p-2">
                                        <img src={doctor.image} alt="doctors-img" className="w-10 h-10 rounded-full"/>
                                    </td>
                                    <td className="p-2 text-sm text-gray-700">{doctor.status}</td>
                                    <td className="p-2 text-sm text-gray-700">{formatDate(doctor.createdAt)}</td>
                                    <td className="p-2 flex space-x-2">
                                        <button className="text-sm text-gray-700 hover:text-green-700" onClick={() => navigate(`/admin/edit_doctor/${doctor._id}`)}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <CompactPagination
                        currentPage={page}
                        totalItems={total}
                        limit={limit}
                        onPageChange={handlePageChange}
                    />
                </main>
            </div>
        </Layout>
    )
};
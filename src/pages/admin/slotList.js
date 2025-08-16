import { useNavigate } from "react-router-dom"
import Layout from "../../components/layout";
import { useEffect, useState } from "react";
import { SLOT } from "../../config";
import { formatDate } from "../../utils/formatDate";

export default function SlotList () {
    const navigate = useNavigate();
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        fetch(SLOT.LIST(1, 10))
        .then(res => res.json())
        .then(data => setSlots(data.data))
        .catch(error => console.log(error.message))
    }, []);

    return (
        <Layout>
            <div className="flex h-screen">
                <main className="flex-1 p-6">
                    <div className="flex justify-between ltems-center">
                        <h1 className="text-xl font-bold">Slot List</h1>
                        <button className="text-sm bg-[#4dae37] text-white px-4 py-2 rounded-lg hover:bg-green-700" onClick={() => navigate("/admin/add_slot")}>+ Add Slot</button>
                    </div>
                    <table className="w-full border-collpase mt-6">
                        <thead>
                            <tr className="text-left border-b">
                                <th className="p-3 text-sm font-semibold">Name</th>
                                <th className="p-3 text-sm font-semibold">Specialization</th>
                                <th className="p-3 text-sm font-semibold">Mode</th>
                                <th className="p-3 text-sm font-semibold">Start Date & Time</th>
                                <th className="p-3 text-sm font-semibold">End Date & Time</th>
                                <th className="p-3 text-sm font-semibold">Available Status</th>
                                <th className="p-3 text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slots.map((slot) => (
                                <tr className="border-b">
                                    <td className="p-3 text-sm text-gray-700">{slot.doctorId.name}</td>
                                    <td className="p-3 text-sm text-gray-700">{slot.specialization}</td>
                                    <td className="p-3 text-sm text-gray-700">{slot.doctorId.mode}</td>
                                    <td className="p-3 text-sm text-gray-700">{formatDate(slot.startTime)}</td>
                                    <td className="p-3 text-sm text-gray-700">{formatDate(slot.endTime)}</td>
                                    <td className="p-3 text-sm text-gray-700">Available</td>
                                    <td className="p-3 flex space-x-2">
                                        <button className="text-sm text-gray-700 hover:text-green-700" onClick={() => navigate("/admin/edit_slot")}>
                                            Edit
                                        </button>
                                    </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </Layout>
    )
};
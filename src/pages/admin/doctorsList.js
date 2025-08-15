import { useNavigate } from "react-router-dom"
import Layout from "../../components/layout";

export default function DoctorsList () {
    const navigate = useNavigate();
    return (
        <Layout>
            <div className="flex h-screen">
                <main className="flex-1 p-6">
                    <h1 className="text-xl font-bold">Doctors List</h1>
                    <button className="text-sm bg-[#4dae37] text-white px-4 py-2 rounded-lg hover:bg-green-700" onClick={() => navigate("/admin/add_doctor")}>+ Add Doctor</button>
                    <table className="w-full border-collpase">
                        <thead>
                            <tr className="text-left border-b">
                                <th className="p-3 text-sm font-semibold">Name</th>
                                <th className="p-3 text-sm font-semibold">Specialization</th>
                                <th className="p-3 text-sm font-semibold">Mode</th>
                                <th className="p-3 text-sm font-semibold">Profile</th>
                                <th className="p-3 text-sm font-semibold">Status</th>
                                <th className="p-3 text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-3 text-sm text-gray-700">Dr.Keerthana</td>
                                <td className="p-3 text-sm text-gray-700">Ayurveda</td>
                                <td className="p-3 text-sm text-gray-700">Online</td>
                                <td className="p-3">
                                    <img src="/img-1.jpeg" alt="img" className="w-10 h-10 rounded-full"/>
                                </td>
                                <td className="p-3 text-sm text-gray-700">Active</td>
                                <td className="p-3 flex space-x-2">
                                    <button className="text-sm text-gray-700 hover:text-green-700" onClick={() => navigate("/admin/edit_doctor")}>
                                        Edit
                                    </button>
                                </td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-3 text-sm text-gray-700">Dr.Keerthana</td>
                                <td className="p-3 text-sm text-gray-700">Ayurveda</td>
                                <td className="p-3 text-sm text-gray-700">Online</td>
                                <td className="p-3">
                                    <img src="/img-1.jpeg" alt="img" className="w-10 h-10 rounded-full"/>
                                </td>
                                <td className="p-3 text-sm text-gray-700">Active</td>
                                <td className="p-3 flex space-x-2">
                                    <button className="text-sm text-gray-700 hover:text-green-700">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </main>
            </div>
        </Layout>
    )
};
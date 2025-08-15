import { useNavigate } from "react-router-dom";

export default function Sidebar () {
    const navigate = useNavigate();
    return (
        <aside className="w-64 bg-white text-black p-4 border-r border-gray-200">
                <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                <nav className="space-y-2">
                    <button className="block w-full text-left mb-2 text-sm font-semibold bg-[#4dae37] text-white px-5 py-2 rounded-lg hover:bg-green-700" onClick={() => navigate("/admin/doctors")}>
                        Doctors
                    </button>
                    <button className="block w-full text-left mb-2 text-sm font-semibold">
                        Availability
                    </button>
                </nav>
        </aside>
    )
};
import { useState } from "react";
import Layout from "../../components/layout";
import { DOCTORS } from "../../config";
import { useNavigate } from "react-router-dom";

export default function AddDoctor() {
    const navigate = useNavigate();
    const [doctorForm, setDoctorForm] = useState({
        name: "",
        specialization: "",
        mode: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctorForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setDoctorForm((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", doctorForm.name);
            formData.append("specialization", doctorForm.specialization);
            formData.append("mode", doctorForm.mode);
            formData.append("image", doctorForm.image);

            const res = await fetch(DOCTORS.CREATE, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data) {
                navigate("/admin/doctors")
            }
        } catch(error) {
            console.log(error.message);
        }

    }


    return (
        <Layout>
            <div>
                <h1 className="text-xl font-bold">Add Doctor</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Name <span className="text-red-400">*</span></label>
                        <input type="text" name="name" value={doctorForm.name} required onChange={handleChange} placeholder="Enter doctor's name" className="w-full border border-gray-300 rounded-lg p-2 text-sm"/>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Specialization <span className="text-red-400">*</span></label>
                        <input type="text" name="specialization" value={doctorForm.specialization} required onChange={handleChange} placeholder="Enter specialization" className="w-full border border-gray-300 rounded-lg p-2 text-sm"/>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Mode <span className="text-red-400">*</span></label>
                        <select name="mode" value={doctorForm.mode} required onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 text-sm">
                            <option value="">Select Mode</option>
                            <option value="in_person">In person</option>
                            <option value="online">Online</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Image <span className="text-red-400">*</span></label>
                        <input type="file" accept="image/*" required onChange={handleFileChange} className="w-full border border-gray-300 rounded-lg p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-500 file:text-white hover:file:bg-green-700"/>
                    </div>
                    <div>
                        <button
                        type="submit"
                        className="bg-[#4dae37] text-white px-6 py-2 rounded-lg hover:bg-green-700 text-sm"
                        >
                        Submit
                        </button>
                    </div>
                </form>
             
            </div>
        </Layout>
    );
}
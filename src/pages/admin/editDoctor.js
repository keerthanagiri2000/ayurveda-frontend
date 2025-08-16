import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout";
import { useState, useEffect } from "react";
import { DOCTORS } from "../../config";

export default function EditDoctor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState({});
    const [formValues, setFormValues] = useState({ mode: "", status: "" });
    
    useEffect(() => {
        fetch(DOCTORS.GET(id))
        .then(res => res.json())
        .then((data) => {
            setDoctor(data.data);
            setFormValues({ mode: data.data.mode, status: data.data.status });
        })
        .catch(error => console.log(error.message))
    }, [id]);

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { mode: formValues.mode, status: formValues.status }
            const res = await fetch(DOCTORS.UPDATE(id), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await res.json()
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
                <h1 className="text-xl font-bold">Edit Doctor</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Name</label>
                        <input type="text" name="name" value={doctor.name} placeholder="Enter doctor's name" className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-gray-100" readOnly/>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Specialization</label>
                        <input type="text" name="specialization" value={doctor.specialization} placeholder="Enter specialization" className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-gray-100" readOnly/>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Mode <span className="text-red-400">*</span></label>
                        <select name="mode"  value={formValues.mode} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 text-sm" required>
                            <option value="">Select Mode</option>
                            <option value="in_person">In person</option>
                            <option value="online">Online</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Image</label>
                        {doctor.image && (
                            <img 
                            src={`${doctor.image}`} 
                            alt="Doctor" 
                            className="w-32 h-32 object-cover rounded-md my-2" 
                            />
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Status <span className="text-red-400">*</span></label>
                        <div className="flex items-center space-x-6">
                            <label>
                                <input type="radio" name="status" value="active" checked={formValues.status === "active"} onChange={handleChange} className="text-green-600 focus:ring-green-500"/>
                                <span className="text-sm">Active</span>
                            </label>
                            <label>
                                <input type="radio" name="status" value="in_active" checked={formValues.status === "in_active"} onChange={handleChange} className="text-green-600 focus:ring-green-500"/>
                                <span className="text-sm">In Active</span>
                            </label>
                        </div>
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
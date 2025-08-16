import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SLOT, DOCTORS } from "../../config";
import { useNavigate } from "react-router-dom";


export default function AddSlot() {
    const navigate = useNavigate();
    const [doctorsData, setDoctorsData] = useState([]);
    const [formValues, setFormValues] = useState({
        doctorId: "",
        specialization: "",
        startTime: null,
        endTime: null,
    })

    useEffect(() => {
      fetch(DOCTORS.GET_ACTIVE_DOCTORS)
      .then(res => res.json())
      .then((data) => {
        setDoctorsData(data.data)
      })
      .catch(error => console.log(error.message))
    },[]);

    const handleChange = (e) => {
        setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const payload = { 
            doctorId: formValues.doctorId,
            specialization: formValues.specialization,
            startTime: formValues.startTime,
            endTime: formValues.endTime,
        };

        const res = await fetch(SLOT.CREATE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (data) {
            navigate("/admin/slots")
        }
        } catch(error) {
            console.log(error.message);
        }
    };
    
    return (
        <Layout>
            <div>
                <h1 className="text-xl font-bold">Add Slot</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Doctor Name</label>
                        <select name="doctorId" onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 text-sm">
                            <option value="">Select Name</option>
                            {doctorsData.map((doctor) => (
                                <option key={doctor._id} value={doctor._id}>
                                    {doctor.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Specialization</label>
                        <select name="specialization" onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 text-sm">
                            <option value="">Select Specialization</option>
                            <option value="toxicology">Toxicology</option>
                            <option value="psychiatry">Psychiatry</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Start Time</label>
                        <DatePicker
                            selected={formValues.startTime}
                            onChange={(date) =>
                                setFormValues({ ...formValues, startTime: date })
                            }
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="yyyy-MM-dd HH:mm"
                            placeholderText="Start Date & Time"
                            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">End Time</label>
                        <DatePicker
                            selected={formValues.endTime}
                            onChange={(date) =>
                                setFormValues({ ...formValues, endTime: date })
                            }
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="yyyy-MM-dd HH:mm"
                            placeholderText="End Date & Time"
                            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                        />
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
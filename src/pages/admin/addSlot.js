import Layout from "../../components/layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function AddSlot() {
    return (
        <Layout>
            <div>
                <h1 className="text-xl font-bold">Add Slot</h1>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Doctor Name</label>
                        <select name="name" className="w-full border border-gray-300 rounded-lg p-2 text-sm">
                            <option value="">Select Name</option>
                            <option value="">Doe</option>
                            <option value="">John</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Specialization</label>
                        <select name="specialization" className="w-full border border-gray-300 rounded-lg p-2 text-sm">
                            <option value="">Select Specialization</option>
                            <option value="toxicology">Toxicology</option>
                            <option value="psychiatry">Psychiatry</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Start Time</label>
                        <DatePicker
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
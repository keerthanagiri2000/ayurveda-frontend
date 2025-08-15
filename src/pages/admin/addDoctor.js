import Layout from "../../components/layout";

export default function AddDoctor() {
    return (
        <Layout>
            <div>
                <h1 className="text-xl font-bold">Add Doctor</h1>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Name</label>
                        <input type="text" name="name" placeholder="Enter doctor's name" className="w-full border border-gray-300 rounded-lg p-2 text-sm"/>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Specialization</label>
                        <input type="text" name="specialization" placeholder="Enter specialization" className="w-full border border-gray-300 rounded-lg p-2 text-sm"/>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Mode</label>
                        <select name="mode" className="w-full border border-gray-300 rounded-lg p-2 text-sm">
                            <option value="">Select Mode</option>
                            <option value="in_person">In person</option>
                            <option value="online">Online</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Profile Image</label>
                        <input type="file" name="profile" className="w-full border border-gray-300 rounded-lg p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-500 file:text-white hover:file:bg-green-700"/>
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
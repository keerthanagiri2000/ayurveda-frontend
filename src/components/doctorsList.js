export default function DoctorsList () {
    return (
        <div className="w-full">
            <div className="w-full flex flex-col items-center gap-6">
                <div className="w-3/4">
                    <h1 className="text-2xl font-semibold">Doctors List</h1>
                    <p className="font-extralight">Search doctors by specialization and mode</p>
                    <div className="flex gap-6 mt-6">
                        <input type="text" placeholder="Search by Specialization" className="border border-md p-2"/>
                        <select className="border borde-md p-2">
                            <option>Select Mode</option>
                            <option>Online</option>
                            <option>In-Person</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-3/4">
                        <div className="flex flex-col gap-2 border border-md">
                            <img src="./doctorImg.jpg" alt="doctor" className="w-full"/>
                            <div className="p-2">
                                <p className="border border-md w-full text-sm p-1 text-[#58d2c4]">Cardiology</p>
                                <h2 className="font-bold mt-2 text-[#073a68] text-xl">Dr. Keerthana</h2>
                                <p className="text-gray-500 font-extralight">In-person</p>
                            </div>
                            <div className="bg-[#f1f5f8]">
                                <button className="p-2 w-full text-[#073a68] font-semibold">Book An Appointment</button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 border border-md">
                            <img src="./doctorImg.jpg" alt="doctor" className="w-full"/>
                            <div className="p-2">
                                <p className="border border-md w-full text-sm p-1 text-[#58d2c4]">Cardiology</p>
                                <h2 className="font-bold mt-2 text-[#073a68] text-xl">Dr. Keerthana</h2>
                                <p className="text-gray-500 font-extralight">In-person</p>
                            </div>
                            <div className="bg-[#f1f5f8]">
                                <button className="p-2 w-full text-[#073a68] font-semibold">Book An Appointment</button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 border border-md">
                            <img src="./doctorImg.jpg" alt="doctor" className="w-full"/>
                            <div className="p-2">
                                <p className="border border-md w-full text-sm p-1 text-[#58d2c4]">Cardiology</p>
                                <h2 className="font-bold mt-2 text-[#073a68] text-xl">Dr. Keerthana</h2>
                                <p className="text-gray-500 font-extralight">In-person</p>
                            </div>
                            <div className="bg-[#f1f5f8]">
                                <button className="p-2 w-full text-[#073a68] font-semibold">Book An Appointment</button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 border border-md">
                            <img src="./doctorImg.jpg" alt="doctor" className="w-full"/>
                            <div className="p-2">
                                <p className="border border-md w-full text-sm p-1 text-[#58d2c4]">Cardiology</p>
                                <h2 className="font-bold mt-2 text-[#073a68] text-xl">Dr. Keerthana</h2>
                                <p className="text-gray-500 font-extralight">In-person</p>
                            </div>
                            <div className="bg-[#f1f5f8]">
                                <button className="p-2 w-full text-[#073a68] font-semibold">Book An Appointment</button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 border border-md">
                            <img src="./doctorImg.jpg" alt="doctor" className="w-full"/>
                            <div className="p-2">
                                <p className="border border-md w-full text-sm p-1 text-[#58d2c4]">Cardiology</p>
                                <h2 className="font-bold mt-2 text-[#073a68] text-xl">Dr. Keerthana</h2>
                                <p className="text-gray-500 font-extralight">In-person</p>
                            </div>
                            <div className="bg-[#f1f5f8]">
                                <button className="p-2 w-full text-[#073a68] font-semibold">Book An Appointment</button>
                            </div>
                        </div>
                </div>
            </div>
           
        </div>
    )
}
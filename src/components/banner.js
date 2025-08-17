import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

export default function Banner () {
    const images = [
    "/img-1.jpeg",
    "/img-2.webp",
    "/img-3.jpg",
    "/img-4.jpg",
    "/img-5.jpg",
    "/img-6.jpeg",
  ];

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
  };

    return (
    <div className="relative w-full h-[80vh] mb-6">
        <div className='homeBannerBackground py-6 px-20 flex flex-col absolute inset-0 z-10'>
            <div className="flex justify-between ltems-center">
                <h1 className='text-xl font-semibold text-green-800'>Home</h1>
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="font-semibold">Hi, {user.userName}</span>
                        <Link to="/appointment_dashboard" className="text-lg font-semibold text-green-700 cursor-pointer">
                          Dashboard
                        </Link>
                        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
                    </div>

                ) : (
                    <Link to="/login">
                        <button className='bg-[#4dae37] text-white rounded-lg px-4 py-1 hover:bg-green-700'>
                            Sign In
                        </button>
                    </Link>  
                )}
            </div>
            
            <div className="flex items-center gap-12">
                <div className="grid grid-cols-4 grid-rows-3 gap-4 h-[350px] w-[60%] mt-12">
                    <div className="col-span-1 row-span-2">
                        <img src={images[0]} alt="banner images" className="w-full h-full object-cover rounded-lg" />
                    </div>

                    <div className="col-span-1 row-span-2">
                        <img src={images[1]} alt="banner images" className="w-full h-full object-cover rounded-lg" />
                    </div>

                    <div className="col-span-2 row-span-1">
                        <img src={images[2]} alt="banner images" className="w-1/2 h-full object-cover rounded-lg" />
                    </div>

                    <div className="col-span-1 row-span-1">
                        <img src={images[3]} alt="banner images" className="w-full h-full object-cover rounded-lg" />
                    </div>

                    <div className="col-span-2 row-span-1">
                        <img src={images[4]} alt="banner images" className="w-full h-full object-cover rounded-lg" />
                    </div>

                    <div className="col-span-1 row-span-2">
                        <img src={images[5]} alt="banner images" className="w-full h-full object-cover rounded-lg" />
                    </div>
                </div>
                <div className="flex flex-col justify-center w-1/2">
                    <h2 className="text-3xl font-bold text-black-800">Consult Trusted Ayurveda Doctors Online</h2>
                    <p className="mt-4 text-md text-gray-700"> Book consultations with trusted Ayurveda doctors for natural healing 
                    and lifestyle guidance. Receive personalized care, herbal remedies, 
                    and wellness plans from the comfort of your home.</p>
                    <div className="mt-6 flex gap-4">
                        <button className="bg-[#4dae37] text-white px-5 py-2 rounded-lg hover:bg-green-700">
                            Book Consultation
                        </button>
                        <button className="bg-white border border-green-600 text-green-600 px-5 py-2 rounded-lg hover:bg-green-100">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
};
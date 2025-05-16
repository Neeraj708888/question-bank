import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Navbar = () => {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { adminInfo } = useSelector((state) => state.admin);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-gradient-to-r from-teal-300 via-yellow-300 to-blue-800 text-white">
            <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">
                    {/* Logo */}

                    <div className="w-60 overflow-hidden rounded-2xl bg-gradient-to-r from-pink-800 via-cyan-600 to-purple-400 px-2 py-2 relative h-10">
                        <div className="absolute left-0 animate-marquee whitespace-nowrap text-yellow-400 px-2 font-semibold">
                            Question Bank
                        </div>
                    </div>


                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-4 font-semibold ">
                        <button className="hover:bg-blue-600 px-1 py-1 rounded-md text-md" onClick={()=> navigate('/')} >Home</button>
                        <button className="hover:bg-blue-600 px-1.5 py-1.5 rounded-md text-md" onClick={()=> navigate('/login')} >Login</button>
                         <button className="hover:bg-blue-600 px-2 py-2 rounded-md text-md" onClick={()=> navigate('/addTopic')}>Add Topic</button>
                        <button className="hover:bg-blue-600 px-2 py-2 rounded-md text-md" onClick={()=> navigate('/topics')}>Topic</button>
                        <button className="hover:bg-blue-600 px-2 py-2 rounded-md text-md onClick={() => navigate("/admin")} >
                          All Admin{" "}
                          <span className="text-red-300 text-lg font-bold animate-blink">
                            {adminInfo?.length || 0}
                          </span>
                        </button>

                        {/* Search Box */}
                        <div className="border rounded-b-sm">
                            <input
                                type="text"

                                placeholder="Search..."
                                className="px-3 py-1 rounded-md tracking-tighter font-semibold focus:outline-none
                                hover:placeholder:text-gray-400 hover:placeholder:text-center text-black bg-gradient-to-b from-gray-200 via-red-200 to-green-100 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="focus:outline-none">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu dropdown */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 flex flex-col">
                    <button className="hover:bg-blue-600 px-1 py-1 rounded-md text-xl" onClick={()=> navigate('/')} >Home</button>
                    <button className="hover:bg-blue-600 px-1.5 py-1.5 rounded-md text-xl" onClick={()=> navigate('/login')}>Login</button>
                    <button className="hover:bg-blue-600 px-2 py-2 rounded-md text-xl" onClick={()=> navigate('/topics')}>Topic</button>
                    <button className="hover:bg-blue-600 px-2 py-2 rounded-md text-xl" onClick={() => navigate("/admin")} >
                      All Admin{" "}
                      <span className="text-red-300 text-lg font-bold animate-blink">
                    {adminInfo?.length || 0} </span>
                    </button>
                    
                    {/* Mobile Search Box */}
                    <div className="mt-2 items-center flex justify-center">
                        <input
                            type="text"

                            placeholder="Search..."
                            className="w-1/2 px-3 py-2 rounded-md bg-black text-white hover:font-semibold focus:outline-none cursor-pointer text-center"
                        />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const { adminInfo } = useSelector((state) => state.admin);
  const [isOpen, setIsOpen] = useState(false);

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
            <button onClick={() => navigate('/')} className="hover:bg-blue-600 px-3 py-1 rounded-md">Home</button>
            <button onClick={() => navigate('/login')} className="hover:bg-blue-600 px-3 py-1 rounded-md">Login</button>
            <button onClick={() => navigate('/addTopic')} className="hover:bg-blue-600 px-3 py-1 rounded-md">Add Topic</button>
            <button onClick={() => navigate('/topics')} className="hover:bg-blue-600 px-3 py-1 rounded-md">Topic</button>
            <button onClick={() => navigate('/admin')} className="hover:bg-blue-600 px-3 py-1 rounded-md">
              All Admin
            </button>
            <p className="animate-blink">Count <span className="text-red-300 text-lg font-bold">{adminInfo?.length || 0}</span></p>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isOpen && (
          <div className="md:hidden flex flex-col items-center space-y-2 mt-4">
            <button onClick={() => navigate('/')} className="hover:bg-blue-600 px-3 py-2 rounded-md">Home</button>
            <button onClick={() => navigate('/login')} className="hover:bg-blue-600 px-3 py-2 rounded-md">Login</button>
            <button onClick={() => navigate('/topics')} className="hover:bg-blue-600 px-3 py-2 rounded-md">Topic</button>
            <button onClick={() => navigate('/admin')} className="hover:bg-blue-600 px-3 py-2 rounded-md">
              All Admin
            </button>
            <p className="animate-blink text-center items-center">Count <span className="text-red-300 text-lg font-bold">{adminInfo?.length || 0}</span></p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

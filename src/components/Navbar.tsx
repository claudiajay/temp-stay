import React from "react";
import { Link } from "react-router-dom";
import { GlobeAltIcon, Bars3Icon } from "@heroicons/react/24/outline";
import DropMenu from "./DropMenu";

const Navbar = () => {
  return (

    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <div className="text-2xl font-bold text-red-500">stay-savy</div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Stays</a>
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Experiences</a>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-700 hover:text-gray-900 font-medium">Airbnb your home</button>
        {/* <div className="w-8 h-8 bg-gray-800 rounded-full"></div> */}
      </div>
    </div>
  </nav>
    
  );
};

export default Navbar;

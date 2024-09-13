import React from 'react';
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-sky-200 to-blue-50 py-8 shadow-lg rounded-b-md mb-4">
      <img src={logo} alt="Logo" className="h-24" />
    </div>
  );
};

export default Header;
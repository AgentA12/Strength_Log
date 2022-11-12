import React from "react";
import auth from "../../utils/auth/auth";

export default function LogoutBtn({ setIsOpen, isOpen }) {
  return (
    <button
      className="flex items-center bg-background py-2 px-4 border  rounded shadow hover:bg-primary_faded hover:bg-opacity-10 hover:border-opacity-10 transition-colors duration-100 text-gray-400 border-gray-600 hover:border-white hover:text-white"
      onClick={() => [auth.logout(), setIsOpen(!isOpen)]}
    >
      logout
    </button>
  );
}

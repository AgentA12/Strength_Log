import React from "react";
import auth from "../../utils/auth/auth";

export default function LogoutBtn({ setIsOpen, isOpen }) {
  return (
    <button
      className="flex items-center  py-2 px-4 border  rounded shadow hover:bg-primary_faded hover:bg-opacity-10 hover:border-opacity-10 transition-colors duration-100  border-gray-600 "
      onClick={() => [auth.logout(), setIsOpen(!isOpen)]}
    >
      logout
    </button>
  );
}

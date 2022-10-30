import { useState } from "react";
import { Link } from "react-router-dom";
import { GiWeightLiftingUp } from "react-icons/gi";
import { IconContext } from "react-icons";
import LoginBtn from "../buttons/LoginBtn";
import SignupBtn from "../buttons/SignupBtn";
import TemplateNavBtn from "../buttons/TemplateNavBtn";
import ProgressNavBtn from "../buttons/ProgressNavBtn";
import AddTemplateBtn from "../buttons/AddTemplateBtn";
import Auth from "../../utils/auth/auth";
import auth from "../../utils/auth/auth";

export const Nav = ({ activeNav }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="px-2 sm:px-4 py-2 text-white bg-background border-b border-gray-600">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <IconContext.Provider value={{ className: "text-primary ml-5" }}>
          <GiWeightLiftingUp size={50} />
        </IconContext.Provider>
        <button
          onClick={() => setIsOpen(!isOpen)}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-primary rounded-lg md:hidden  focus:outline-none  "
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`${
            isOpen
              ? " md:block md:w-auto w-full"
              : "hidden md:block md:w-auto w-full"
          }`}
          id="navbar-default"
        >
          <ul className="flex flex-col items-center p-4 mt-4 text-center md:text-start rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
            <li className="flex">
              {auth.isLoggedIn() ? <AddTemplateBtn /> : null}
              <Link onClick={() => setIsOpen(!isOpen)} to={"/Templates"}>
                <TemplateNavBtn activeNav={activeNav} />
              </Link>
            </li>
            <li>
              <Link onClick={() => setIsOpen(!isOpen)} to={"/Progress"}>
                <ProgressNavBtn activeNav={activeNav} />
              </Link>
            </li>
            {Auth.isLoggedIn() ? (
              <>
                <li>
                  <a
                    className="block py-2 pr-4 pl-3 rounded hover:text-primary md:hover:bg-transparent md:border-0 md:dark:hover:bg-transparent cursor-pointer transition-colors duration-300"
                    onClick={() => [Auth.logout(), setIsOpen(!isOpen)]}
                  >
                    logout
                  </a>
                </li>
              </>
            ) : (
              <li className="flex gap-2 justify-center items-center">
                <LoginBtn />
                <SignupBtn />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

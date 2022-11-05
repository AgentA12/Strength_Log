import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";
import { GiWeightLiftingUp } from "react-icons/gi";
import { IconContext } from "react-icons";
import LoginBtn from "../buttons/LoginBtn";
import SignupBtn from "../buttons/SignupBtn";
import TemplateNavBtn from "../buttons/TemplateNavBtn";
import ProgressNavBtn from "../buttons/ProgressNavBtn";
import AddTemplateBtn from "../buttons/AddTemplateBtn";
import LogoutBtn from "../buttons/LogoutBtn";
import Auth from "../../utils/auth/auth";
import auth from "../../utils/auth/auth";

export const Nav = ({ activeNav }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:mr-10 items-center lg:gap-6">
      <Typography as="li" variant="small" className="p-1 font-normal">
        {auth.isLoggedIn() ? <AddTemplateBtn /> : null}
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <Link onClick={() => setIsOpen(!isOpen)} to={"/Templates"}>
          <TemplateNavBtn activeNav={activeNav} />
        </Link>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <Link onClick={() => setIsOpen(!isOpen)} to={"/Progress"}>
          <ProgressNavBtn activeNav={activeNav} />
        </Link>
      </Typography>

      <Typography as="li" variant="small" className="p-1 font-normal">
        {Auth.isLoggedIn() ? (
          <>
            <li>
              <LogoutBtn setIsOpen={setIsOpen} isOpen={isOpen} />
            </li>
          </>
        ) : (
          <li className="flex gap-2 justify-center items-center">
            <LoginBtn />
            <SignupBtn />
          </li>
        )}
      </Typography>
    </ul>
  );

  return (
    <Navbar className=" max-w-full px-2 sm:px-4 py-2 text-white bg-background border-none rounded-none border-gray-600">
      <div className="w-full flex items-center justify-between">
        <Typography
          as="a"
          href="#"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          <IconContext.Provider value={{ className: "text-primary ml-5" }}>
            <GiWeightLiftingUp size={50} />
          </IconContext.Provider>
        </Typography>
        <div className="hidden lg:block">{navList}</div>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>{navList}</MobileNav>
    </Navbar>
  );

  return (
    <nav className="px-2 sm:px-4 py-2 text-white bg-background border-b border-gray-600">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <IconContext.Provider value={{ className: "text-primary ml-5" }}>
          <GiWeightLiftingUp size={50} />
        </IconContext.Provider>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center p-2 ml-3 text-sm text-primary rounded-lg md:hidden  focus:outline-none  "
        >
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
            <li> {auth.isLoggedIn() ? <AddTemplateBtn /> : null}</li>

            <li>
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
                  <LogoutBtn setIsOpen={setIsOpen} isOpen={isOpen} />
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

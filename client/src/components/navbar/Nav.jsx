import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { IconContext } from "react-icons";
import Auth from "../../utils/auth/auth";
import LoginBtn from "../buttons/LoginBtn";
import SignupBtn from "../buttons/SignupBtn";
import TemplateNavBtn from "../buttons/TemplateNavBtn";
import ProgressNavBtn from "../buttons/ProgressNavBtn";
import AddTemplateBtn from "../buttons/AddTemplateBtn";
import LogoutBtn from "../buttons/LogoutBtn";

export function Nav({ activeNav }) {
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
        {Auth.isLoggedIn() ? (
          <AddTemplateBtn setOpenNav={setOpenNav}  />
        ) : null}
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <Link onClick={() => setOpenNav(false)} to={"/Templates"}>
          <TemplateNavBtn activeNav={activeNav} />
        </Link>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <Link onClick={() => setOpenNav(false)} to={"/Progress"}>
          <ProgressNavBtn activeNav={activeNav} />
        </Link>
      </Typography>

      {Auth.isLoggedIn() ? (
        <Typography as="li" variant="small" className="p-1 font-normal">
          <LogoutBtn setOpenNav={setOpenNav} openNav={openNav} />
        </Typography>
      ) : (
        <Typography as="li" variant="small" className="flex gap-1 items-center font-normal">
          <LoginBtn />
          <SignupBtn />
        </Typography>
      )}
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
            <AiOutlineThunderbolt size={50} />
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
}

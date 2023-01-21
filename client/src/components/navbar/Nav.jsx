import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth/auth";
import { AiOutlineThunderbolt } from "react-icons/ai";
import LoginBtn from "../buttons/LoginBtn";
import SignupBtn from "../buttons/SignupBtn";
import TemplateNavBtn from "../buttons/TemplateNavBtn";
import ProgressNavBtn from "../buttons/ProgressNavBtn";
import SettingsBtn from "../buttons/SettingsBtn";
import LogoutBtn from "../buttons/LogoutBtn";

export function Nav({ activeNav }) {
  const [openNav, setOpenNav] = useState(false);

  // close the hambuger menu if the screen width is to large
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navData = [
    {
      componentName: TemplateNavBtn,
      link: "/Templates",
      name: "Templates",
    },
    {
      componentName: ProgressNavBtn,
      link: "/Progress",
      name: "Progress",
    },
    {
      componentName: SettingsBtn,
      link: "/Settings",
      name: "Settings",
    },
  ];

  const navItems = (
    <ul className="flex flex-col items-center">
      <li>
        <AiOutlineThunderbolt color="#BB86FC" size={90} />
      </li>

      <li className="my-10">
        {Auth.isLoggedIn() ? (
          <LogoutBtn setOpenNav={setOpenNav} openNav={openNav} />
        ) : (
          <div className="flex flex-col gap-1 items-center mt-2">
            <LoginBtn />
            <SignupBtn />
          </div>
        )}
      </li>

      {navData.map((item) => (
        <li className="mb-5" key={item.link}>
          <Link onClick={() => setOpenNav(false)} to={item.link}>
            <item.componentName activeNav={activeNav} />
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="absolute h-screen top-0 left-0 border-r border-r-gray-600 p-8 z-10 test">
      {navItems}
    </nav>
  );
}

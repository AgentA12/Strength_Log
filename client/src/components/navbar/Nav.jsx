import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineThunderbolt } from "react-icons/ai";
import TemplateNavBtn from "./TemplateNavBtn";
import ProgressNavBtn from "./ProgressNavBtn";
import SettingsNavBtn from "./SettingsBtn";
import { Drawer, Burger } from "@mantine/core";

export function Nav() {
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
      componentName: SettingsNavBtn,
      name: "Settings",
    },
  ];

  const navItems = (
    <ul className="m-0 flex flex-col md:flex-row items-center justify-between list-none p-0 md:p-6 ">
      <li className="">
        <AiOutlineThunderbolt size={60} />
      </li>

      <li className="">
        <ul className="p-0 flex items-center justify-center list-none md:mr-5">
          <li className="flex flex-col items-center  md:block">
            {navData.map((item) =>
              item.name === "Settings" ? (
                <item.componentName key={item.name} className="" />
              ) : (
                <Link
                  key={item.link}
                  onClick={() => setOpenNav(false)}
                  to={item.link}
                >
                  <item.componentName />
                </Link>
              )
            )}
          </li>
        </ul>
      </li>
    </ul>
  );

  return (
    <>
      <nav className="hidden z-0 md:block">{navItems}</nav>

      <div className="md:hidden">
        <Burger
          onClick={() => setOpenNav(!openNav)}
          opened={openNav}
          className="ml-5 mt-2"
        />

        <Drawer
          onClose={() => setOpenNav(false)}
          opened={openNav}
          transition="rotate-left"
          transitionDuration={250}
          transitionTimingFunction="ease"
          overlayOpacity={0.55}
          overlayBlur={3}
          size="sm"
        >
          {navItems}
        </Drawer>
      </div>
    </>
  );
}

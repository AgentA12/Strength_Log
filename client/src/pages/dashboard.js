import { AiOutlineThunderbolt } from "react-icons/ai";
import { HiOutlineTemplate } from "react-icons/hi";
import { SiProgress } from "react-icons/si";
import { FiSettings } from "react-icons/fi";
import { Typography } from "@material-tailwind/react";

const navItems = [
  {
    icon: HiOutlineTemplate(),
    name: "Templates",
  },
  {
    icon: SiProgress(),
    name: "Progress",
  },
  {
    icon: FiSettings(),
    name: "Settings",
  },
];

export default function Dashboard() {
  return (
    <nav className="pl-10 pt-16">
      <h2 className="flex text-2xl items-center mb-5 text-primary">
        <AiOutlineThunderbolt size={50}/> Weight Logger
      </h2>

      <ul className="flex-col gap-5 cursor-pointer">
        {navItems.map((item) => (
          <Typography as="li" variant="large" className="p-1 font-normal">
            <li className="flex items-center gap-1">
              {item.icon}
              {item.name}
            </li>
          </Typography>
        ))}
      </ul>
    </nav>
  );
}

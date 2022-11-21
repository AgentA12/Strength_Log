import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function TemplateMenu({ template, handleTemplateDelete }) {
  const menuList = (
    <MenuList
      className="bg-overlay_two border-none  shadow-none text-white_faded"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <MenuItem className="hover:bg-overlay hover:text-primary ">
        <Link
          to={"/Edit-template"}
          className="flex items-center gap-1 py-2 px-4"
          state={{ template: template }}
        >
          <FaEdit size={14} />
          Edit Template
        </Link>
      </MenuItem>
      <MenuItem
        className="hover:bg-overlay hover:text-error "
        onClick={() => handleTemplateDelete(template._id)}
      >
        <span className="flex items-center gap-1 py-2 px-4">
          <FaTrash size={14} />
          Delete Template
        </span>
      </MenuItem>
    </MenuList>
  );

  return (
    <Menu placement="bottom-end" className="shadow-none">
      <MenuHandler
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          data-dropdown-toggle="dropdownDotsHorizontal"
          className="border border-primary inline-flex items-center py-1 px-2 text-sm font-medium text-center text-gray-900 bg-background rounded-lg hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-primary"
          type="button"
        >
          <svg
            className="w-6 h-6 fill-primary"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
          </svg>
        </button>
      </MenuHandler>
      {menuList}
    </Menu>
  );
}

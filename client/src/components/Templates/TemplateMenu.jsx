import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function TemplateMenu({ handleEdit, handleDelete, refetch }) {
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
      <MenuList className="bg-overlay_two border-none p-1">
        <MenuItem className="hover:bg-overlay hover:text-primary">
          <a
            onClick={(event) => handleEdit(event)}
            href="#"
            className="flex items-center gap-1 py-2 px-4 "
          >
            <FaEdit size={14} />
            Edit Template
          </a>
        </MenuItem>
        <MenuItem className="hover:bg-overlay hover:text-error">
          <a
            onClick={(event) => [handleDelete(event), refetch()]}
            href="#"
            className="flex items-center gap-1 py-2 px-4 "
          >
            <FaTrash size={14} />
            Delete Template
          </a>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

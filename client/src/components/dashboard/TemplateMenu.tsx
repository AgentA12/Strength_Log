import { Link } from "react-router-dom";
import { Menu, Button } from "@mantine/core";
import { FaEdit, FaRegChartBar } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";

export default function TemplateMenu({ template, setModalOpen }) {
  const editState = {
    templateName: template.templateName,
    templateNotes: template.templateNotes,
    templateId: template._id,
    exercises: template.exercises.map((exercise) => {
      return {
        exerciseName: exercise.exercise.exerciseName,
        sets: [...exercise.sets],
        restTime: exercise.restTime ? exercise.restTime : 0,
        _id: exercise.exercise._id,
      };
    }),
  };

  const menuList = (
    <Menu.Dropdown
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <Menu.Item
        component={Link}
        to={`/Progress`}
        state={{ activeTab: "templates", templateName: template.templateName }}
        leftSection={<FaRegChartBar size={14} />}
      >
        Progress
      </Menu.Item>

      <Menu.Item
        component={Link}
        to="/Create-template"
        state={{ template: editState }}
        leftSection={<FaEdit size={14} />}
      >
        Edit
      </Menu.Item>

      <Menu.Item
        color="red"
        onClick={setModalOpen}
        leftSection={<BsTrash3 size={14} />}
      >
        Delete
      </Menu.Item>
    </Menu.Dropdown>
  );

  return (
    <Menu
      position="bottom-end"
      zindex={99}
      shadow="lg"
      width={175}
      trigger="click"
      closeDelay={100}
      transition="fade"
      ml={5}
    >
      <Menu.Target>
        <Button
          variant="subtle"
          onClick={(event) => {
            event.stopPropagation();
          }}
          data-dropdown-toggle="dropdownDotsHorizontal"
          p="xs"
        >
          <svg
            width={20}
            height={20}
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
          </svg>
        </Button>
      </Menu.Target>

      {menuList}
    </Menu>
  );
}

import { Link } from "react-router-dom";
import { ActionIcon, NavLink } from "@mantine/core";

export default function NavbarLink({ icon: Icon, label, link, clickHandler }) {
  return (
    <ActionIcon size={25} variant="subtle" component={Link} to={link}  aria-label={label}>
      <Icon color="white" style={{ width: "70%", height: "70%" }} stroke={1.5}/>
    </ActionIcon>
  );
}

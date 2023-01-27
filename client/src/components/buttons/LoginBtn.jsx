import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

export default function LoginBtn() {
  return (
    <Link to={"/Login"}>
      <Button variant="outline" color={'grape'}>Login</Button>
    </Link>
  );
}

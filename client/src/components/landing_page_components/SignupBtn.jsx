import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

export default function SignupBtn() {
  return (
    <Link to={"/Signup"}>
      <Button variant="outline">
        Sign up
      </Button>
    </Link>
  );
}

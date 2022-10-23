import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function LoginBtn() {
  return (
    <Link to={"/Login"}>
      <Button className="bg-primary text-overlay">Login</Button>
    </Link>
  );
}

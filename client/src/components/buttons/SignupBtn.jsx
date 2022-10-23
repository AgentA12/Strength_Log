import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function SignupBtn() {
  return (
    <Link to={"/Signup"}>
      <Button
        className="text-gray-400 border-gray-400 hover:border-white hover:text-white"
        variant="outlined"
        ripple={false}
      >
        Sign up
      </Button>
    </Link>
  );
}

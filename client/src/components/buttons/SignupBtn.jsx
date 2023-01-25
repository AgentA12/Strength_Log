import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function SignupBtn() {
  return (
    <Link to={"/Signup"}>
      <Button
        className="flex items-center   py-2 px-4 border  rounded shadow hover:bg-primary_faded hover:bg-opacity-10 hover:border-opacity-10 transition-colors duration-100 text-gray-400 border-gray-600 hover:border-white "
        variant="outlined"
        ripple={true}
      >
        Sign up
      </Button>
    </Link>
  );
}

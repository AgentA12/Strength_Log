import { Link } from "react-router-dom";

export default function LoginBtn() {
  return (
    <Link to={"/Login"}>
      <button className="add-template-btn">Login</button>
    </Link>
  );
}

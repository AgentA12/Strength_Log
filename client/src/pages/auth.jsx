import { useNavigate } from "react-router-dom";
import AuthorizationComponent from "../components/AuthorizationComponent";

export default function AuthPage({ isLoggedIn }) {
  const navigate = useNavigate();

  if (isLoggedIn) navigate("/Dashboard");

  return <AuthorizationComponent />;
}

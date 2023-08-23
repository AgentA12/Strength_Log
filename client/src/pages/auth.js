import { useNavigate } from "react-router-dom";
import AuthorizationComponent from "../components/AuthorizationComponent";

export default function AuthPage({ isLoggedIn }) {
  const navigate = useNavigate();

  isLoggedIn && navigate("/Home");

  return <AuthorizationComponent />;
}
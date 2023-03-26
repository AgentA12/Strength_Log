import { useNavigate } from "react-router-dom";
import AuthorizationComponent from "../components/landing_page_components/AuthorizationComponent";

export default function AuthorizationPage({ isLoggedIn }) {
  const navigate = useNavigate();

  isLoggedIn && navigate("/templates");

  return <AuthorizationComponent />;
}

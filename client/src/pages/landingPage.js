import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthorizationComponent from "../components/AuthComponent";

export default function AuthorizationPage({ isLoggedIn }) {
  const navigate = useNavigate();

  isLoggedIn && navigate("/templates");

  const [type, setType] = useState("login");
  
  return <AuthorizationComponent type={type} setType={setType} />;
}

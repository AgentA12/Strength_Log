import { useNavigate } from "react-router-dom";
import AuthorizationComponent from "../components/universal/AuthorizationComponent";
import { useEffect } from "react";

export default function AuthPage({ isLoggedIn }: { isLoggedIn: Boolean }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === true) navigate("/dashboard");
  }, [isLoggedIn]);

  return <AuthorizationComponent />;
}

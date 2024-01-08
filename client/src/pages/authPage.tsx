import { useNavigate } from "react-router-dom";
import AuthorizationComponent from "../components/AuthorizationComponent";
import { useEffect } from "react";

export default function AuthPage({ isLoggedIn }: { isLoggedIn: Boolean }) {
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === true) navigate("/Dashboard");
  }, [isLoggedIn]);

  return <AuthorizationComponent />;
}

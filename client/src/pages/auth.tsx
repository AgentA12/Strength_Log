import { useNavigate } from "react-router-dom";
import AuthorizationComponent from "../components/universal/AuthorizationComponent";
import { useEffect } from "react";
import { useAuth } from "../contexts/auth";

export default function AuthPage() {
  const navigate = useNavigate();

  const { token }: any = useAuth();

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token]);

  return <AuthorizationComponent />;
}

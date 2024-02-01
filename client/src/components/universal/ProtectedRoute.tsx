import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

interface Props {
  children: React.ReactNode;
}

export default function Protected({ children }: Props) {
  const { token }: any = useAuth();

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  return children;
}

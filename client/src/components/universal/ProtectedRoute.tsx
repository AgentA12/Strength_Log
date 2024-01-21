import { useNavigate } from "react-router-dom";

interface Props {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

export default function Protected({ isLoggedIn, children }: Props) {
  const navigate = useNavigate();

  if (!isLoggedIn) navigate("/login");

  return children;
}

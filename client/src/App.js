import { Nav } from "./components/navbar/Nav";
import Login from "./components/miscellaneous/Login";
import Signup from "./components/miscellaneous/Signup";
import { Routes, Route, useLocation } from "react-router-dom";
import  {ProgressPage} from "./pages/progressPage";
import CreateTemplate from "./components/templates/CreateTemplateContainer";
import EditTemplate from "./components/templates/EditTemplateContainer";
import Protected from "./components/ProtectedRoute";
import auth from "./utils/auth/auth";
import { TemplatePage } from "./pages/templatesPage";

export default function App() {
  const isLoggedIn = auth.isLoggedIn();

  const { pathname } = useLocation();

  return (
    <>
      <Nav activeNav={pathname.replace("/", "")} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/Login"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <TemplatePage />
            </Protected>
          }
        />
        <Route path="/Signup" element={<Signup />} />
        <Route
          path="/Templates"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <TemplatePage />
            </Protected>
          }
        />

        <Route
          path="Templates/Create-Template"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <CreateTemplate />
            </Protected>
          }
        />

        <Route
          path="/Edit-Template"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <EditTemplate />
            </Protected>
          }
        />
        <Route
          path="/Progress"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <ProgressPage />
            </Protected>
          }
        />
      </Routes>
    </>
  );
}

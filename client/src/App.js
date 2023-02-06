import { Nav } from "./components/navbar/Nav";
import { Routes, Route, useLocation } from "react-router-dom";
import { ProgressPage } from "./pages/progressPage";
import CreateTemplate from "./components/templates/CreateTemplateContainer";
import EditTemplate from "./components/templates/EditTemplateContainer";
import Protected from "./components/ProtectedRoute";
import auth from "./utils/auth/auth";
import { TemplatePage } from "./pages/templatesPage";
import LandingPage from "./pages/landingPage";
import { NotFound } from "./pages/notFound";


export default function App() {
  const isLoggedIn = auth.isLoggedIn();

  const { pathname } = useLocation();

  return (
    <Routes>
      <Route path="/" index element={<LandingPage isLoggedIn={isLoggedIn}/>} />

      <Route
        path="/Templates"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <Nav activeNav={pathname.replace("/", "")} />
            <TemplatePage />
          </Protected>
        }
      />

      <Route
        path="Templates/Create-Template"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <Nav activeNav={pathname.replace("/", "")} />
            <CreateTemplate />
          </Protected>
        }
      />

      <Route
        path="/Edit-Template"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <Nav activeNav={pathname.replace("/", "")} />
            <EditTemplate />
          </Protected>
        }
      />
      <Route
        path="/Progress"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <Nav activeNav={pathname.replace("/", "")} />
            <ProgressPage />
          </Protected>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

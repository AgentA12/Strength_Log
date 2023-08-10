import { Route, Routes } from "react-router-dom";
import {
  ProgressPage,
  AuthPage,
  HomePage,
  NotFoundPage,
  SettingsPage,
} from "../pages/index";
import CreateTemplateContainer from "../components/templatecreate&edit/CreateTemplateContainer";
import EditTemplateContainer from "../components/templatecreate&edit/EditTemplateContainer";
import Protected from "../components/ProtectedRoute";
import auth from "../utils/auth/auth";

const isLoggedIn = auth.isLoggedIn();

export default function RouteContainer() {
  return (
    <Routes>
      <Route path="/" index element={<AuthPage isLoggedIn={isLoggedIn} />} />

      <Route path="/login" element={<AuthPage isLoggedIn={isLoggedIn} />} />

      <Route
        path="/Home"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <HomePage />
          </Protected>
        }
      />
      <Route
        path="/Settings"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <SettingsPage />
          </Protected>
        }
      />

      <Route
        path="/Create-template"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <CreateTemplateContainer />
          </Protected>
        }
      />

      <Route
        path="/Edit-template"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <EditTemplateContainer />
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

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

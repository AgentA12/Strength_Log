import { Route, Routes } from "react-router-dom";
import {
  ProgressPage,
  AuthPage,
  DashBoardPage,
  NotFoundPage,
  SettingsPage,
  WorkoutPage,
} from "../pages/index";
import Protected from "../components/ProtectedRoute";
import auth from "../utils/auth/auth";
import TemplateDashBoard from "../components/create&edittemplates/TemplateDashBoard";
import UtilitiesPage from "../pages/utilities";

const isLoggedIn = auth.isLoggedIn();

export default function RouteContainer() {
  return (
    <Routes>
      <Route path="/" index element={<AuthPage isLoggedIn={isLoggedIn} />} />

      <Route path="/login" element={<AuthPage isLoggedIn={isLoggedIn} />} />

      <Route
        path="/DashBoard"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <DashBoardPage />
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
            <TemplateDashBoard />
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

      <Route
        path="/Workout"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <WorkoutPage />
          </Protected>
        }
      />

      <Route
        path="/Utilities"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <UtilitiesPage />{" "}
          </Protected>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

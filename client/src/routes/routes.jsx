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
import AppLayout from "../components/AppLayout";
import DatePage from "../components/progresspage/DatePage";

const isLoggedIn = auth.isLoggedIn();

export default function RouteContainer() {
  return (
    <Routes>
      <Route path="/" index element={<AuthPage isLoggedIn={isLoggedIn} />} />

      <Route path="/login" element={<AuthPage isLoggedIn={isLoggedIn} />} />
      <Route path="/test" element={<DatePage isLoggedIn={isLoggedIn} />} />

      <Route
        path="/Dashboard"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <AppLayout>
              <DashBoardPage />
            </AppLayout>
          </Protected>
        }
      />
      <Route
        path="/Settings"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <AppLayout>
              <SettingsPage />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/Create-template"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <AppLayout>
              <TemplateDashBoard />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/Progress"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <AppLayout>
              <ProgressPage />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/Workout"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <AppLayout>
              <WorkoutPage />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/Utilities"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <AppLayout>
              <UtilitiesPage />
            </AppLayout>
          </Protected>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

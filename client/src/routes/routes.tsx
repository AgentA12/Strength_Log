import { Route, Routes } from "react-router-dom";
import {
  CompareWorkoutPage,
  AuthPage,
  DashBoardPage,
  NotFoundPage,
  SettingsPage,
  WorkoutPage,
  ProgressPage,
} from "../pages/index";

import Protected from "../components/ProtectedRoute";
import auth from "../utils/auth/auth";
import TemplateDashBoard from "../components/create&edittemplates/TemplateDashBoard";
import UtilitiesPage from "../pages/utilitiespage";
import AppLayout from "../components/AppLayout";

const isLoggedIn = auth.isLoggedIn();

export default function RouteContainer() {
  return (
    <Routes>
      <Route path="/" index element={<AuthPage isLoggedIn={isLoggedIn} />} />

      <Route path="/login" element={<AuthPage isLoggedIn={isLoggedIn} />} />

      <Route
        path="/dashboard"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <AppLayout hasNav={true}>
              <DashBoardPage />
            </AppLayout>
          </Protected>
        }
      />
      <Route
        path="/settings"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <AppLayout hasNav={true}>
              <SettingsPage />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/create-template"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <AppLayout hasNav={true}>
              <TemplateDashBoard />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/progress"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <AppLayout hasNav={true}>
              <ProgressPage />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/compare"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <AppLayout hasNav={true}>
              <CompareWorkoutPage />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/workout"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <AppLayout hasNav={true}>
              <WorkoutPage />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/utilities"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <AppLayout hasNav={true}>
              <UtilitiesPage />
            </AppLayout>
          </Protected>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

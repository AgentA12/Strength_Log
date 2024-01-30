import { Route, Routes } from "react-router-dom";
import {
  AuthPage,
  DashBoardPage,
  NotFoundPage,
  SettingsPage,
  WorkoutPage,
  ProgressPage,
  Calories
} from "../pages/index";

import Protected from "../components/universal/ProtectedRoute";
import auth from "../utils/auth/auth";
import TemplateDashBoard from "../pages/createandedittemplate";
import UtilitiesPage from "../pages/utilities";
import AppLayout from "../components/universal/AppLayout";
import CreateTemplatePage from "../pages/createtemplate";

export default function RouteContainer() {
  const isLoggedIn = auth.isLoggedIn();

  return (
    <Routes>
      <Route
        path="/create"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <AppLayout hasNav={true}>
              <CreateTemplatePage />
            </AppLayout>
          </Protected>
        }
      />

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
        path="/edittemplate"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <AppLayout hasNav={true}>
              <CreateTemplatePage />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/foodstuffs"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <AppLayout hasNav={true}>
              <Calories />
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

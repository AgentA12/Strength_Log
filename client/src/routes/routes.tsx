import { Route, Routes } from "react-router-dom";
import {
  AuthPage,
  DashBoardPage,
  NotFoundPage,
  SettingsPage,
  WorkoutPage,
  ProgressPage,
  Calories,
} from "../pages/index";

import Protected from "../components/universal/ProtectedRoute";
import UtilitiesPage from "../pages/utilities";
import AppLayout from "../components/universal/AppLayout";
import CreateTemplatePage from "../pages/createtemplate";

export default function RouteContainer() {
  return (
    <Routes>
      <Route path="/" index element={<AuthPage />} />

      <Route path="/login" element={<AuthPage />} />

      <Route
        path="/dashboard"
        element={
          <Protected>
            <AppLayout hasNav={true}>
              <DashBoardPage />
            </AppLayout>
          </Protected>
        }
      />
      <Route
        path="/settings"
        element={
          <Protected>
            <AppLayout hasNav={true}>
              <SettingsPage />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/createtemplate"
        element={
          <Protected>
            <AppLayout hasNav={true}>
              <CreateTemplatePage />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/edittemplate"
        element={
          <Protected>
            <AppLayout hasNav={true}>
              <CreateTemplatePage />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/foodstuffs"
        element={
          <Protected>
            <AppLayout hasNav={true}>
              <Calories />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/progress"
        element={
          <Protected>
            <AppLayout hasNav={true}>
              <ProgressPage />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/workout"
        element={
          <Protected>
            <AppLayout hasNav={true}>
              <WorkoutPage />
            </AppLayout>
          </Protected>
        }
      />

      <Route
        path="/utilities"
        element={
          <Protected>
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

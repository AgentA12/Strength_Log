import { Route } from "react-router-dom";
import {
  ProgressPage,
  AuthPage,
  HomePage,
  LandingPage,
  NotFoundPage,
  SettingsPage,
} from "../pages/index";
import CreateTemplateContainer from "../components/homepage/CreateTemplateContainer";
import EditTemplateContainer from "../components/homepage/EditTemplateContainer";
import Protected from "../components/ProtectedRoute";
import auth from "../utils/auth/auth";
import SideNav from "../components/navbar/SideNav";

const isLoggedIn = auth.isLoggedIn();

export const routes = [
  {
    component: (key) => (
      <Route key={key} path="/" index element={<LandingPage />} />
    ),
  },

  {
    component: (key) => (
      <Route
        key={key}
        path="/Home"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <SideNav />
            <HomePage />
          </Protected>
        }
      />
    ),
  },
  {
    component: (key) => (
      <Route
        key={key}
        path="/login"
        index
        element={<AuthPage isLoggedIn={isLoggedIn} />}
      />
    ),
  },

  {
    component: (key) => (
      <Route
        key={key}
        path="/Settings"
        index
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <SideNav />
            <SettingsPage />
          </Protected>
        }
      />
    ),
  },

  {
    component: (key) => (
      <Route
        key={key}
        path="Home/Create-Template"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <SideNav />
            <CreateTemplateContainer />
          </Protected>
        }
      />
    ),
  },
  {
    component: (key) => (
      <Route
        key={key}
        path="Home/Edit-Template"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <SideNav />
            <EditTemplateContainer />
          </Protected>
        }
      />
    ),
  },
  {
    component: (key) => (
      <Route
        key={key}
        path="/Progress"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <SideNav />
            <ProgressPage />
          </Protected>
        }
      />
    ),
  },
  {
    component: (key) => <Route key={key} path="*" element={<NotFoundPage />} />,
  },
];

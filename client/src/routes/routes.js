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
import Layout from "../components/Layout";
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
          <Layout>
            <Protected isLoggedIn={isLoggedIn}>
              <SideNav />
              <HomePage />
            </Protected>
          </Layout>
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
          <Layout>
            <Protected isLoggedIn={isLoggedIn}>
              <SideNav />
              <SettingsPage />
            </Protected>
          </Layout>
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
          <Layout>
            <Protected isLoggedIn={isLoggedIn}>
              <SideNav />
              <CreateTemplateContainer />
            </Protected>
          </Layout>
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
          <Layout>
            <Protected isLoggedIn={isLoggedIn}>
              <SideNav />
              <EditTemplateContainer />
            </Protected>
          </Layout>
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
          <Layout>
            <Protected isLoggedIn={isLoggedIn}>
              <SideNav />
              <ProgressPage />
            </Protected>
          </Layout>
        }
      />
    ),
  },
  {
    component: (key) => <Route key={key} path="*" element={<NotFoundPage />} />,
  },
];

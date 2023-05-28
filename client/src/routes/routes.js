import { Route } from "react-router-dom";
import { ProgressPage } from "../pages/progressPage";
import CreateTemplate from "../components/template_page_components/CreateTemplateContainer";
import EditTemplate from "../components/template_page_components/EditTemplateContainer";
import Protected from "../components/ProtectedRoute";
import AuthPage from "../pages/authPage";
import NotFound from "../pages/notFound";
import auth from "../utils/auth/auth";
import SettingsPage from "../pages/settingsPage";
import LandingPage from "../pages/landingPage";
import HomePage from "../pages/Home";
import Layout from "../components/Layout";
import { SideNav } from "../components/navbar_components/SideNav";

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
              <CreateTemplate />
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
              <EditTemplate />
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
  { component: (key) => <Route key={key} path="*" element={<NotFound />} /> },
];

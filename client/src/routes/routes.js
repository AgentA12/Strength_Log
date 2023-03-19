import { Route } from "react-router-dom";
import { ProgressPage } from "../pages/progressPage";
import CreateTemplate from "../components/template_page_components/CreateTemplateContainer";
import EditTemplate from "../components/template_page_components/EditTemplateContainer";
import Protected from "../components/ProtectedRoute";
import { TemplatePage } from "../pages/templatesPage";
import LandingPage from "../pages/landingPage";
import { Nav } from "../components/navbar/Nav";
import NotFound from "../pages/notFound";
import auth from "../utils/auth/auth";

const isLoggedIn = auth.isLoggedIn();

export const routes = [
  {
    component: (key) => (
      <Route
        key={key}
        path="/"
        index
        element={<LandingPage isLoggedIn={isLoggedIn} />}
      />
    ),
  },

  {
    component: (key) => (
      <Route
        key={key}
        path="/Templates"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <Nav />
            <TemplatePage />
          </Protected>
        }
      />
    ),
  },

  {
    component: (key) => (
      <Route
        key={key}
        path="Templates/Create-Template"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <Nav />
            <CreateTemplate />
          </Protected>
        }
      />
    ),
  },
  {
    component: (key) => (
      <Route
        key={key}
        path="/Edit-Template"
        element={
          <Protected isLoggedIn={isLoggedIn}>
            <Nav />
            <EditTemplate />
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
            <Nav />
            <ProgressPage />
          </Protected>
        }
      />
    ),
  },
  { component: (key) => <Route key={key} path="*" element={<NotFound />} /> },
];

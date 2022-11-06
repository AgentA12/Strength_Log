import { Nav } from "./components/navbar/Nav";
import TemplateContainer from "./components/templates/TemplateContainer";
import Login from "./components/miscellaneous/Login";
import Signup from "./components/miscellaneous/Signup";
import { Routes, Route, useLocation } from "react-router-dom";
import ProgressContainer from "./components/progress/ProgressContainer";
import Workout from "./components/workout/Workout";
import { ThemeProvider } from "@material-tailwind/react";
import CreateTemplate from "./components/templates/CreateTemplateContainer";
import EditTemplate from "./components/templates/EditTemplateContainer";

export default function App() {
  const { pathname } = useLocation();

  const customTheme = {
    button: {
      styles: {},
    },
  };

  return (
    <ThemeProvider value={customTheme}>
      <Nav activeNav={pathname.replace("/", "")} />
      <Routes>
        <Route path="/" element={<TemplateContainer />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Templates" element={<TemplateContainer />} />
        <Route path="/Create-Template" element={<CreateTemplate />} />
        <Route path="/Edit-Template" element={<EditTemplate />} />

        <Route path="/Progress" element={<ProgressContainer />} />
        <Route path="/Workout" element={<Workout />} />
      </Routes>
    </ThemeProvider>
  );
}

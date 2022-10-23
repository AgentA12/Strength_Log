import { Nav } from "./components/Nav/Nav";
import TemplateContainer from "./components/Templates/TemplateContainer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Routes, Route, useLocation } from "react-router-dom";
import ProgressContainer from "./components/Progress/ProgressContainer";
import Workout from "./components/Templates/Workout";
import { ThemeProvider } from "@material-tailwind/react";

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
        <Route path="/Progress" element={<ProgressContainer />} />
        <Route path="/Workout" element={<Workout />} />
      </Routes>
    </ThemeProvider>
  );
}

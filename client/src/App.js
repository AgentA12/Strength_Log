import Home from "./pages/Home";
import { Nav } from "./components/Nav/Nav";
import { TemplateContainer } from "./components/Templates/TemplateContainer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Routes, Route } from "react-router-dom";
import RoutineContainer from "./components/Routines/Routine";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Templates" element={<TemplateContainer />} />
        <Route path="/Routines" element={<RoutineContainer />} />
      </Routes>
    </>
  );
}

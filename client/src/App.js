import { Main } from "./pages/Main";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/Register" element={<Register />} />
    </Routes>
  );
}

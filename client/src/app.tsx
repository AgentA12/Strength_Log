import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import { createContext } from "react";
import RouteContainer from "./routes/routes";
import auth from "./utils/auth/auth";
import ScrollToTop from "./components/ScrollToTop";

export const UserContext = createContext(auth.getInfo());

export function App() {
  return (
    <UserContext.Provider value={auth.getInfo()}>
      <Notifications position="bottom-right" limit={5} />
      <RouteContainer />
      <ScrollToTop />
    </UserContext.Provider>
  );
}

import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import RouteContainer from "./routes/routes";
import ScrollToTop from "./components/universal/ScrollToTop";
import { UserContext } from "./contexts/userInfo";
import { userInfo } from "./contexts/userInfo";

export function App() {
  return (
    <UserContext.Provider value={userInfo}>
      <Notifications position="bottom-right" limit={5} />
      <RouteContainer />
      <ScrollToTop />
    </UserContext.Provider>
  );
}

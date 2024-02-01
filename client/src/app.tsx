import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import RouteContainer from "./routes/routes";
import ScrollToTop from "./components/universal/ScrollToTop";
import { UserInfoProvider } from "./contexts/userInfo";
import AuthProvider from "./contexts/auth";

export function App() {
  return (
    <>
      <Notifications position="bottom-right" limit={10} />
      <AuthProvider>
        <UserInfoProvider>
          <RouteContainer />
        </UserInfoProvider>
      </AuthProvider>
      <ScrollToTop />
    </>
  );
}

import { Container } from "@mantine/core";

export default function AppLayout({ children }) {
  return <Container fluid ml={75} mt={50}>{children}</Container>;
}

import { Container } from "@mantine/core";
import { ProgressTabs } from "../components/progresspage";
import DividerTitle from "../components/universal/DividerTitle";

export default function ProgressPage() {
  return (
    <Container fluid>
      <DividerTitle name="Progress" />
      <ProgressTabs />
    </Container>
  );
}

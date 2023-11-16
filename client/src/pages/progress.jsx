import { Container, Divider, Title } from "@mantine/core";
import { ByChartContainer } from "../components/progresspage/index";

export default function ProgressPage() {
  return (
    <Container fluid>
      <Divider
        variant="dashed"
        labelPosition="left"
        label={<Title c={"white"}>Progress</Title>}
      />
      <ByChartContainer />
    </Container>
  );
}

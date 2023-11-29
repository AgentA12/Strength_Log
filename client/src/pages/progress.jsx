import { Container, Divider, Title } from "@mantine/core";
import { ByChartContainer } from "../components/progresspage/index";
import classes from "./dashboard.module.css";

export default function ProgressPage() {
  return (
    <Container fluid>
      <Divider
        variant="dashed"
        labelPosition="left"
        label={<Title className={classes.dividerTitle}>Progress</Title>}
      />
      <ByChartContainer />
    </Container>
  );
}

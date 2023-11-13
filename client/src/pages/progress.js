import { useState } from "react";
import { SectionMenu } from "../components/progresspage/index";
import { Container, createStyles, Divider, Title } from "@mantine/core";
import {
  ByChartContainer,
  ByDateContainer,
  UtilitiesContainer,
} from "../components/progresspage/index";
import { useLocation } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  container: {
    marginBottom: 50,
    [theme.fn.smallerThan("sm")]: {
      textAlign: "center",
    },
  },
}));

export default function ProgressPage() {
  // if routing from calendar in homepage set activeSection to "Date"
  const { state } = useLocation();

  const [activeSection, setActiveSection] = useState(state ? "Date" : "Chart");

  const { classes } = useStyles();

  return (
    <Container fluid className={classes.container}>
      <Divider variant="dashed" label={<Title>Progress</Title>} />

      <SectionMenu
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      {activeSection === "Chart" ? (
        <ByChartContainer />
      ) : activeSection === "Date" ? (
        <ByDateContainer state={state} />
      ) : (
        <UtilitiesContainer />
      )}
    </Container>
  );
}

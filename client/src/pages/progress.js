import { useState } from "react";
import { SectionMenu } from "../components/progresspage/index";
import { Container, createStyles } from "@mantine/core";
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
  const [activeSection, setActiveSection] = useState(
    state?.viewCurrentTemplate ? "Date" : "Chart"
  );

  const { classes } = useStyles();

  return (
    <Container fluid className={classes.container}>
      <SectionMenu setActiveSection={setActiveSection} />
      {activeSection === "Chart" ? (
        <ByChartContainer />
      ) : activeSection === "Date" ? (
        <ByDateContainer />
      ) : (
        <UtilitiesContainer />
      )}
    </Container>
  );
}

// import { useState } from "react";
// import { SectionMenu } from "../components/progresspage/index";
import { Container } from "@mantine/core";
import {
  ByChartContainer,
  // ByDateContainer,
  // UtilitiesContainer,
} from "../components/progresspage/index";
import { useLocation } from "react-router-dom";

export default function ProgressPage() {
  // if routing from calendar in homepage set activeSection to "Date"
  const { state } = useLocation();

  // const [activeSection, setActiveSection] = useState(state ? "Date" : "Chart");

  return (
    <Container fluid>
      <ByChartContainer />

      {/* <SectionMenu
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      /> */}
      {/* {activeSection === "Chart" ? (
      ) : activeSection === "Date" ? (
        <ByDateContainer state={state} />
      ) : (
        <UtilitiesContainer />
      )} */}
    </Container>
  );
}

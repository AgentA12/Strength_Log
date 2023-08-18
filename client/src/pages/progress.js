import { useState } from "react";
import { SectionMenu } from "../components/progresspage/index";
import { Container, Title, Text, createStyles } from "@mantine/core";
import {
  ByTemplatesContainer,
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
  // if coming from calendar in homepage set active section to date
  const { state } = useLocation();
  const [activeSection, setActiveSection] = useState(
    state?.viewCurrentTemplate ? "Date" : "Templates"
  );

  const [activeTemplate, setActiveTemplate] = useState("All templates");

  const { classes } = useStyles();

  return (
    <Container fluid className={classes.container}>
      <Title>
        <Text
          sx={(theme) => ({ color: theme.primaryColor })}
          fw={800}
          component="span"
        >
          {activeTemplate && activeTemplate}
        </Text>{" "}
        Summary
      </Title>

      <SectionMenu
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {activeSection === "Templates" ? (
        <ByTemplatesContainer
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
        />
      ) : activeSection === "Date" ? (
        <ByDateContainer />
      ) : (
        <UtilitiesContainer />
      )}
    </Container>
  );
}

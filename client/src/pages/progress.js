import { useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import {
  SectionMenu,
  TemplateSelect,
  TypeSelect,
  TemplateChart,
  DateRangeSelect,
} from "../components/progresspage/index";

import { GET_TEMPLATES } from "../utils/graphql/queries";
import {
  Container,
  Title,
  Flex,
  Loader,
  Text,
  createStyles,
  Box,
} from "@mantine/core";
import { UserContext } from "../App";

const useStyles = createStyles((theme) => ({
  container: {
    marginBottom: 50,
    [theme.fn.smallerThan("sm")]: {
      textAlign: "center",
    },
  },
}));

export default function ProgressPage() {
  const [activeTemplate, setActiveTemplate] = useState("All templates");
  const [activeSection, setActiveSection] = useState("Templates");
  const [metric, setMetric] = useState("Total weight");
  const [range, setRange] = useState("All time");

  const { classes } = useStyles();

  const {
    data: { _id: userID },
  } = useContext(UserContext);

  const { data, loading, error } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  if (error) return <Title color="red">{error.message}</Title>;

  if (loading)
    return (
      <Container fluid className={classes.container}>
        <Title>
          <Text
            sx={(theme) => ({ color: theme.colors.violet[5] })}
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
      </Container>
    );

  return (
    <Container fluid className={classes.container}>
      <Title>
        <Text
          sx={(theme) => ({ color: theme.colors.violet[5] })}
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

      {loading ? (
        <Loader />
      ) : (
        <>
          <Flex
            wrap="wrap"
            gap={5}
            justify={{ base: "center", sm: "left" }}
            mb={30}
          >
            <TemplateSelect
              templates={data.getTemplates}
              activeTemplate={activeTemplate}
              setActiveTemplate={setActiveTemplate}
            />

            <TypeSelect metric={metric} setMetric={setMetric} />
            <DateRangeSelect setRange={setRange} />
          </Flex>
          <Box
            sx={{
              height: "700px",
            }}
          >
            {" "}
            <TemplateChart
              activeTemplate={activeTemplate}
              userId={userID}
              range={range}
              metric={metric}
            />
          </Box>
        </>
      )}
    </Container>
  );
}

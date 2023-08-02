import { useState, useContext } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  SectionMenu,
  TemplateSelect,
  ExerciseSelect,
  TypeSelect,
  Table,
  TemplateChart,
} from "../components/progresspage/index";

import {
  GET_TEMPLATES,
  GET_TEMPLATE_PROGRESS,
  GET_CALENDAR_DATA,
} from "../utils/graphql/queries";
import {
  Container,
  Title,
  Flex,
  Loader,
  Text,
  createStyles,
} from "@mantine/core";
import RangeSelect from "../components/progresspage/SelectRange";
// import { useLocation } from "react-router-dom";
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
  const [exercises, setExercises] = useState("All");
  const [range, setRange] = useState("All time");

  const { classes } = useStyles();

  // const { state } = useLocation();

  const {
    data: { _id: userID },
  } = useContext(UserContext);

  const { data, loading, error } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  const [
    loadOneTemplate,
    { loading: loadOneTemplateLoading, data: loadOneTemplateData },
  ] = useLazyQuery(GET_TEMPLATE_PROGRESS);

  const [
    loadChartSummary,
    { loading: loadChartSummaryDataLoading, data: loadChartSummaryData },
  ] = useLazyQuery(GET_CALENDAR_DATA);

  async function handleQuery(templateName) {
    await loadOneTemplate({
      variables: {
        templateName: templateName,
        userID: userID,
      },
    });
  }

  async function getChartData(templateName) {
    await loadChartSummary({
      variables: {
        templateName: templateName,
        userId: userID,
      },
    });
  }
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
          <Flex wrap="wrap" gap={5} justify={{ base: "center", sm: "left" }}>
            <TemplateSelect
              templates={data.getTemplates}
              handleQuery={handleQuery}
              activeTemplate={activeTemplate}
              setActiveTemplate={setActiveTemplate}
              getChartData={getChartData}
            />

            <ExerciseSelect />
            <TypeSelect />
            <RangeSelect />
          </Flex>
          <TemplateChart
            loadChartSummaryData={loadChartSummaryData}
            activeTemplate={activeTemplate}
            loading={loading}
          />
          <Table />{" "}
        </>
      )}
    </Container>
  );
}

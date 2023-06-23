import { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  SectionMenu,
  SummaryContainer,
  ExerciseContainer,
  TemplateSelect,
} from "../components/progresspage/index";

import {
  GET_TEMPLATES,
  GET_TEMPLATES_PROGRESS,
  GET_TEMPLATE_CHART_DATA,
} from "../utils/graphql/queries";
import { Container, Title, Flex, Text } from "@mantine/core";
import auth from "../utils/auth/auth";
import RangeSelect from "../components/progresspage/SelectRange";

export default function ProgressPage() {
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [activeSection, setActiveSection] = useState("Summary");

  const {
    data: { _id: userID },
  } = auth.getInfo();

  // fetch templates for select templates input
  const { data } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  const [
    loadOneTemplate,
    { loading: loadOneTemplateLoading, data: loadOneTemplateData },
  ] = useLazyQuery(GET_TEMPLATES_PROGRESS);

  const [
    loadChartSummary,
    { loading: loadChartSummaryDataLoading, data: loadChartSummaryData },
  ] = useLazyQuery(GET_TEMPLATE_CHART_DATA);

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

  if (data)
    return (
      <Container sx={(theme) => ({
        [theme.fn.smallerThan("sm")]: {
          textAlign: 'center'
        }
      })} fluid>
        {activeTemplate ? (
          <Title>
            <Text color="hot-pink" fw={900} component="span">
              {activeTemplate}
            </Text>{" "}
            Summary
          </Title>
        ) : (
          <Title>Select a template</Title>
        )}
        <SectionMenu
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <Flex wrap="wrap" gap={20} justify={{base: "center", sm: "left"}}>
          <TemplateSelect
            data={data}
            handleQuery={handleQuery}
            activeTemplate={activeTemplate}
            setActiveTemplate={setActiveTemplate}
            getChartData={getChartData}
          />
          <RangeSelect />
        </Flex>
        {activeSection === "Summary" ? (
          <SummaryContainer
            loadChartSummaryData={loadChartSummaryData}
            activeTemplate={activeTemplate}
            loadOneTemplateData={loadOneTemplateData}
            loadChartSummaryDataLoading={loadChartSummaryDataLoading}
            loadOneTemplateLoading={loadOneTemplateLoading}
          />
        ) : (
          <ExerciseContainer
            loadChartSummaryData={loadChartSummaryData}
            loadOneTemplateData={loadOneTemplateData}
            activeTemplate={activeTemplate}
          />
        )}
      </Container>
    );
}

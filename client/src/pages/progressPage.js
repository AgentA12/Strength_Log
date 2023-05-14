import { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  SectionMenu,
  SummaryContainer,
  ExerciseContainer,
  TemplateSelect,
} from "../components/progress_page_components/index";

import {
  GET_TEMPLATES,
  GET_TEMPLATES_PROGRESS,
  GET_TEMPLATE_CHART_DATA,
} from "../utils/graphql/queries";
import { Container } from "@mantine/core";
import auth from "../utils/auth/auth";

export const ProgressPage = () => {
  const [activeTemplate, setActiveTemplate] = useState();
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
      <Container>
        <TemplateSelect
          data={data}
          handleQuery={handleQuery}
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
          getChartData={getChartData}
        />

        <SectionMenu
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

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
};

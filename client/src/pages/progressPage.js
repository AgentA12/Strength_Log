import { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import auth from "../utils/auth/auth";
import Spinner from "../components/miscellaneous/Spinner";
import { SectionMenu } from "../components/progress/SectionMenu";
import { SummaryContainer } from "../components/progress/Summary/SummaryContainer";
import { ExerciseContainer } from "../components/progress/Exercises/ExerciseContainer";
import { TemplateSelect } from "../components/progress/TemplateSelect";
import { Title } from "@mantine/core";

import {
  GET_TEMPLATES,
  GET_TEMPLATES_PROGRESS,
  GET_TEMPLATE_CHART_DATA,
} from "../utils/graphql/queries";

export const ProgressPage = () => {
  const [activeTemplate, setActiveTemplate] = useState();
  const [activeSection, setActiveSection] = useState("Summary");

  const {
    data: { _id: userID },
  } = auth.getInfo();

  // fetch templates for select templates input
  const { loading, error, data } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  const [
    loadOneTemplate,
    {
      loading: loadOneTemplateLoading,
      error: loadOneTemplateError,
      data: loadOneTemplateData,
      refetch,
    },
  ] = useLazyQuery(GET_TEMPLATES_PROGRESS);


  const [
    loadChartSummary,
    {
      loading: loadChartSummaryDataLoading,
      error: loadChartSummaryDataError,
      data: loadChartSummaryData,
      refetch: refetchChartData,
    },
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

  if (loading)
    return (
      <div className="mt-60 flex items-center justify-center">
        <Spinner />
      </div>
    );

  // query doesn't update templates that were saved, cache issue I think
  refetch();
  refetchChartData();

  return (
    <section className="mx-5 my-10 md:ml-52">
      <div className="mb-5">
        <Title color={"grape"} className="font-black mb-5">
          {activeTemplate ? activeTemplate : "Select a template"}
        </Title>

        <TemplateSelect
          data={data}
          handleQuery={handleQuery}
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
          getChartData={getChartData}
        />
      </div>

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
        />
      )}
    </section>
  );
};

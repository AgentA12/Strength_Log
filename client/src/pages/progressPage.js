import { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";

import auth from "../utils/auth/auth";
import Spinner from "../components/miscellaneous/Spinner";
import { TemplateSearchBar } from "../components/progress/TemplateSearchBar";
import { SectionMenu } from "../components/progress/SectionMenu";
import { SummaryContainer } from "../components/progress/SummaryContainer";
import { ExerciseContainer } from "../components/progress/ExerciseContainer";
import { TemplateSelect } from "../components/progress/TemplateSelect";

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
    },
  ] = useLazyQuery(GET_TEMPLATES_PROGRESS);

  const [
    loadChartSummary,
    {
      loading: loadChartSummaryDataLoading,
      error: loadChartSummaryDataError,
      data: loadChartSummaryData,
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

  return (
    <section className="ml-44 mt-5">
      <div className="mb-5">
        <h2 className="text-5xl font-black text-primary mb-5">
          {activeTemplate ? activeTemplate : "Select a template"}
        </h2>

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

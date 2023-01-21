import { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";

import auth from "../utils/auth/auth";
import Spinner from "../components/miscellaneous/Spinner";
import { TemplateSearchBar } from "../components/progress/TemplateSearchBar";
import { SectionMenu } from "../components/progress/SectionMenu";
import { SummaryContainer } from "../components/progress/SummaryContainer";
import { ExerciseContainer } from "../components/progress/ExerciseContainer";
import { TemplateListContainer } from "../components/progress/TemplateListContainer";

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
      loading: loadOneTemplateLoadingState,
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

  async function handleQuery(templateId) {
    await loadOneTemplate({
      variables: {
        templateID: templateId,
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
    <div className="ml-52 mt-20">
      <section>
        <div className="flex-col items-center">
          <h2 className="text-3xl mb-5">
            {activeTemplate ? activeTemplate : "Select a template"}
          </h2>

          <TemplateListContainer
            data={data}
            handleQuery={handleQuery}
            activeTemplate={activeTemplate}
            setActiveTemplate={setActiveTemplate}
            getChartData={getChartData}
          />
        </div>

        <div className="flex justify-between px-20">
          <div className="">
            <SectionMenu
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>
        </div>

        <div className="border-b border-gray-600 mb-10"></div>

        {activeSection === "Summary" ? (
          <SummaryContainer
            loadChartSummaryData={loadChartSummaryData}
            activeTemplate={activeTemplate}
            loadOneTemplateData={loadOneTemplateData}
          />
        ) : (
          <ExerciseContainer
            loadChartSummaryData={loadChartSummaryData}
            loadOneTemplateData={loadOneTemplateData}
          />
        )}
      </section>
    </div>
  );
};

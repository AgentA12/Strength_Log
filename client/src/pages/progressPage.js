import { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";

import auth from "../utils/auth/auth";
import Spinner from "../components/miscellaneous/Spinner";
import { TemplateSearchBar } from "../components/progress/TemplateSearchBar";
import { SectionMenu } from "../components/progress/SectionMenu";
import { SummaryContainer } from "../components/progress/SummaryContainer";
import { ExerciseContainer } from "../components/progress/ExerciseContainer";
import TemplateListItem from "../components/progress/TemplateListItem";

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

  if (loadChartSummaryData) console.log(loadChartSummaryData);

  if (loading)
    return (
      <div className="mt-60 flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="ml-40 flex justify-around mt-12  progress_page">
      <section className="main_progress_section">
        <h3 className="text-primary text-4xl font-extrabold mb-3">Progress</h3>

        <div className="w-fit p-5 border border-gray-600 rounded-md ">
          <TemplateSearchBar />

          <div className="mt-2 h-80 overflow-scroll modal-scroll template_list_Container">
            {data?.getTemplatesForUser.map((template) => (
              <TemplateListItem
                key={template._id}
                template={template}
                handleQuery={handleQuery}
                activeTemplate={activeTemplate}
                setActiveTemplate={setActiveTemplate}
                getChartData={getChartData}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="w-10/12 ml-10 main_progress_display">
        <div className="flex gap-5 items-center">
          <h4 className="text-3xl mb-5">
            {activeTemplate ? activeTemplate : "Select a template"}
          </h4>
        </div>

        <div className="flex justify-between px-20">
          <div className="">
            <SectionMenu
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>
        </div>

        <div className="border-b border-gray-600"></div>

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
            activeTemplate={activeTemplate}
          />
        )}
      </section>
    </div>
  );
};

// onClick on exercises
// get the exercises for the template
// pass the exercises into the chart component and the exercise list component
//

import { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
// import SummaryModal from "../summary/SummaryModal";
import {
  GET_TEMPLATES,
  GET_TEMPLATES_PROGRESS,
  GET_TEMPLATE_CHART_DATA,
} from "../utils/graphql/queries";
import TemplateListItem from "../components/progress/TemplateListItem";
import auth from "../utils/auth/auth";
import Spinner from "../components/miscellaneous/Spinner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TemplateSearchBar } from "../components/progress/TemplateSearchBar";
import { SectionMenu } from "../components/progress/SectionMenu";
import { SummaryContainer } from "../components/progress/SummaryContainer";
import { ExerciseContainer } from "../components/progress/ExerciseContainer";

export const ProgressPage = () => {
  const [activeTemplate, setActiveTemplate] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [activeSection, setActiveSection] = useState("Summary");
  const [chartSummaryData, setChartSummaryData] = useState([]);

  const {
    data: { _id: userID },
  } = auth.getInfo();

  const { loading, error, data } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  useEffect(() => {
    setTemplates(data);
  }, []);

  const [loadOneTemplate, res] = useLazyQuery(GET_TEMPLATES_PROGRESS);
  const [loadChartSummaryData, resData] = useLazyQuery(GET_TEMPLATE_CHART_DATA);

  async function handleQuery(templateId) {
    await loadOneTemplate({
      variables: {
        templateID: templateId,
        userID: userID,
      },
    });
  }

  function handleSummary() {}

  async function getChartData(templateId) {
    await loadChartSummaryData({
      variables: {
        templateId: templateId,
        userId: userID,
      },
    });

    if (resData.data) {
      setChartSummaryData(resData.data.getChartData);
    }
  }

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
                res={res}
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
            chartSummaryData={chartSummaryData}
            activeTemplate={activeTemplate}
            handleSummary={handleSummary}
            res={res}
          />
        ) : (
          <ExerciseContainer
            chartSummaryData={chartSummaryData}
            res={res}
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

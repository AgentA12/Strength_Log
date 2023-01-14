import { useEffect, useState } from "react";
import ProgressCard from "../components//progress/ProgressCard";
import { useQuery, useLazyQuery } from "@apollo/client";
// import SummaryModal from "../summary/SummaryModal";
import {
  GET_TEMPLATES,
  GET_TEMPLATES_PROGRESS,
  GET_TEMPLATE_CHART_DATA,
} from "../utils/graphql/queries";
import TemplateCard from "../components/progress/TemplateCard";
import auth from "../utils/auth/auth";
import Spinner from "../components/miscellaneous/Spinner";
import { FcSearch } from "react-icons/fc";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Chart } from "../components/chart/Chart";

export const ProgressPage = () => {
  const [activeTemplate, setActiveTemplate] = useState("Select A Template");
  const [isOpen, setIsOpen] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [activeSection, setActiveSection] = useState("Summary");
  const [chartData, setChartData] = useState([]);

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
  const [loadChartData, resData] = useLazyQuery(GET_TEMPLATE_CHART_DATA);

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
    await loadChartData({
      variables: {
        templateId: templateId,
        userId: userID,
      },
    });
    if (resData.data) {
      setChartData(resData.data.getChartData);
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="ml-40 flex justify-around mt-12">
      <section className="">
        <h3 className="text-primary text-4xl font-extrabold mb-3">Progress</h3>

        <div className="w-fit p-5 border border-gray-600 rounded-md ">
          <label className="relative inline-block w-64">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <FcSearch size={24} />
            </span>
            <input
              className="placeholder:italic bg-inherit placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-primary focus:ring-0 sm:text-sm"
              placeholder="Search for templates"
              type="text"
              name="search"
            />
          </label>

          <div className="mt-2 h-80 overflow-scroll modal-scroll">
            {data?.getTemplatesForUser.map((template) => (
              <TemplateCard
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

      <section className="w-10/12 ml-10">
        <div className="flex gap-5 items-center">
          <h4 className="text-3xl mb-5">
            {activeTemplate ? activeTemplate : "Select a template"}
          </h4>
        </div>

        <div className="flex justify-between px-20">
          <div className="">
            <ul className="flex gap-10">
              <li>
                <a href="">Summary</a>
              </li>
              <li>
                <a href="">Exercises</a>
              </li>
            </ul>
          </div>
          <p>👋 Hello, Andrew</p>
        </div>

        <div className="border-b border-gray-600"></div>

        <div className="flex">
          <div className="w-6/12">
            <Chart
              chartData={chartData}
              currentTemplates={res?.data?.getProgress}
              activeTemplate={activeTemplate}
            />
          </div>

          <div className="w-6/12 ">
            <h6 className="mt-10">Recents</h6>
            <div className="h-5/6 overflow-y-scroll  modal-scroll card-container flex justify-center mb-10">
              <div className="flex flex-col gap-5 h-custom-2 w-custom ">
                {res.data?.getProgress.length ? (
                  res.data.getProgress.map((progressInfo) => (
                    <ProgressCard
                      handleSummary={handleSummary}
                      progressInfo={progressInfo}
                      key={progressInfo._id}
                    />
                  ))
                ) : (
                  <p className="text-lg">
                    You haven't saved workouts for{" "}
                    <span className="text-primary">'{activeTemplate}'</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

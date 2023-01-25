import { Chart } from "../chart/Chart";
import ProgressCard from "./ProgressCard";
import { useState } from "react";
import ProgressModal from "./ProgressModal";
import { Skeleton } from "@mantine/core";
import { useLazyQuery } from "@apollo/client";
import auth from "../../utils/auth/auth";
import { GET_TEMPLATE_MODAL_PROGRESS } from "../../utils/graphql/queries";

export const SummaryContainer = ({
  loadChartSummaryData,
  activeTemplate,
  loadOneTemplateData,
  handleSummary,
  loadChartSummaryDataLoading,
  loadOneTemplateLoading,
}) => {
  var {
    data: { _id: userID },
  } = auth.getInfo();
  const [isOpen, setIsOpen] = useState(false);
  const [templateModalData, setTemplateModalData] = useState({});

  const [loadModalProgress, { loading, error, data }] = useLazyQuery(
    GET_TEMPLATE_MODAL_PROGRESS
  );

  async function handleSummary(templateId) {
    setIsOpen(true);
    await loadModalProgress({
      variables: {
        templateId: templateId,
        userId: userID,
      },
    });
    setTemplateModalData(templateId);
  }

  if (loadOneTemplateLoading || loadChartSummaryDataLoading)
    return (
      <div className="flex gap-20 mt-5">
        <Skeleton width={1000} height={350} />
        <div className="flex flex-col gap-5">
          <Skeleton width={400} height={150} />
          <Skeleton width={400} height={150} />
          <Skeleton width={400} height={150} />
        </div>
      </div>
    );

  return (
    <div className="flex flex-wrap flex-col xl:flex-row w-full justify-center items-center xl:justify-start xl:items-start gap-4">
      <Chart
        loadChartSummaryData={loadChartSummaryData}
        activeTemplate={activeTemplate}
      />

      {loadChartSummaryData || loadOneTemplateData ? (
        <div className="xl:w-4/12 mt-5 p-5 ">
          <h6 className="">Recently Saved</h6>
          <div className="h-5/6 overflow-y-scroll mb-10 w-fit p-5">
            <div className="flex flex-wrap xl:flex-nowrap xl:flex-col gap-5 exercise-container-scroll-h mt-5 w-fit">
              {loadOneTemplateData?.getProgress.length ? (
                loadOneTemplateData.getProgress.map((progressInfo) => (
                  <ProgressCard
                    handleSummary={handleSummary}
                    progressInfo={progressInfo}
                    key={progressInfo._id}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                ))
              ) : activeTemplate?.length ? (
                <p className="text-lg">
                  You haven't saved workouts for{" "}
                  <span className="text-primary">'{activeTemplate}'</span>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <ProgressModal
        isOpen={isOpen}
        templateModalData={templateModalData}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

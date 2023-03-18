import { Chart } from "../../chart/TemplateChart";
import ProgressCard from "./ProgressCard";
import { useState } from "react";
import ProgressModal from "./ProgressModal";
import { Skeleton } from "@mantine/core";
import { useLazyQuery } from "@apollo/client";
import auth from "../../../utils/auth/auth";
import { GET_SUMMARY } from "../../../utils/graphql/queries";
import { ScrollArea } from "@mantine/core";
import CalendarComponent from "../../calendar/Calendar";

export const SummaryContainer = ({
  loadChartSummaryData,
  activeTemplate,
  loadOneTemplateData,

  loadOneTemplateLoading,
}) => {
  var {
    data: { _id: userID },
  } = auth.getInfo();

  const [isOpen, setIsOpen] = useState(false);

  const [getTemplateSummary, { loading, error, data }] =
    useLazyQuery(GET_SUMMARY);

  async function handleSummary(templateData) {
    setIsOpen(true);
    await getTemplateSummary({
      variables: {
        templateId: templateData.templateId,
        userId: userID,
        progressId: templateData._id,
      },
    });
  }

  if (loadOneTemplateLoading)
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
    <>
      {activeTemplate ? (
        <div className="flex flex-wrap flex-col xl:flex-row w-full justify-center items-center xl:justify-start xl:items-start gap-4">
          <Chart
            loadChartSummaryData={loadChartSummaryData}
            activeTemplate={activeTemplate}
          />
          {loadChartSummaryData || loadOneTemplateData ? (
            <div className="xl:w-4/12">
              <h6 className="text-3xl my-2">Recently Saved</h6>

              <ScrollArea
                style={{ height: 550 }}
                type="always"
                className="flex flex-wrap xl:flex-nowrap xl:flex-col gap-10 mt-5 px-10 border  rounded-sm shadow-md w-fit"
              >
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
              </ScrollArea>
            </div>
          ) : null}

          <ProgressModal
            loading={loading}
            data={data}
            error={error}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      ) : null}
    </>
  );
};

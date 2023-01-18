import { Chart } from "../chart/Chart";
import ProgressCard from "./ProgressCard";

export const SummaryContainer = ({
  chartSummaryData,
  activeTemplate,
  res,
  handleSummary,
}) => {
  return (
    <div className="flex">
      <div className="w-6/12">
        <Chart chartSummaryData={chartSummaryData} activeTemplate={activeTemplate} />
      </div>

      <div className="w-6/12 ">
        <h6 className="mt-10">Recents</h6>
        <div className="h-5/6 overflow-y-scroll  modal-scroll card-container flex justify-center mb-10">
          <div className="flex flex-col gap-5 h-custom-2 w-custom ">
            {res?.data?.getProgress.length ? (
              res?.data?.getProgress.map((progressInfo) => (
                <ProgressCard
                  handleSummary={handleSummary}
                  progressInfo={progressInfo}
                  key={progressInfo._id}
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
    </div>
  );
};

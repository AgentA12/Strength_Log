import { Chart } from "../chart/Chart";

const ExerciseListContainer = ({templates}) => {
  return (
    <div className="">
      {templates.length ? (
        <div>
          {templates[0].exercises.map((exercise) => (
            <div className="cursor-pointer">{exercise.exerciseName}</div>
          ))}
        </div>
      ) : (
        <p>You have not saved any workouts &#128169;</p>
      )}
    </div>
  );
};

export const ExerciseContainer = ({
  loadChartSummaryData,
  activeTemplate,
  loadOneTemplateData
}) => {
  // get an array of labels for the exercises dataset
  // then for each label add a dataset

  // a data set will have to be made for each exercise and the labels will be the weight on the y axis and the save date on the x;

  return (
    <div className="flex">
      <div className="w-6/12">
        <Chart loadChartSummaryData={loadChartSummaryData} />
      </div>

      <div className="">
        <p className="text-primary_faded text-xl mb-2">
          {activeTemplate} Exercises
        </p>
        {loadOneTemplateData?.getProgress ? (
          <ExerciseListContainer templates={loadOneTemplateData.getProgress} />
        ) : null}
      </div>
    </div>
  );
};

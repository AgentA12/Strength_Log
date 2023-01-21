import { Chart } from "../chart/Chart";
import { useQuery } from "@apollo/client";
import { GET_EXERCISE_PROGRESS } from "../../utils/graphql/queries";
import auth from "../../utils/auth/auth";
const ExerciseListContainer = ({ templates }) => {
  return (
    <div className="">
      {templates.length ? (
        <div>
          {templates[0].exercises.map((exercise) => (
            <div key={exercise._id} className="cursor-pointer">
              {exercise.exerciseName}
            </div>
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
  loadOneTemplateData,
}) => {
  const {
    data: { _id: userID },
  } = auth.getInfo();

  const { loading, error, data } = useQuery(GET_EXERCISE_PROGRESS, {
    variables: {
      templateID: loadOneTemplateData?.getProgress[0].templateId,
      userID: userID,
    },
  });

  if (error) console.log(error);
  if (loading) return <div>loading...</div>;
  return (
    <div className="flex">
      <div className="w-6/12">
        <Chart exerciseData={data?.getExerciseProgress} />
      </div>

      <div>
        <p className="text-primary_faded text-xl mb-2">Exercises</p>
        {loadOneTemplateData?.getProgress ? (
          <ExerciseListContainer templates={loadOneTemplateData.getProgress} />
        ) : null}
      </div>
    </div>
  );
};

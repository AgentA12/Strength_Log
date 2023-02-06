import { useQuery } from "@apollo/client";
import { GET_EXERCISE_PROGRESS } from "../../../utils/graphql/queries";
import auth from "../../../utils/auth/auth";
import { ExerciseChart } from "../../chart/ExerciseChart";
import { Skeleton } from "@mantine/core";
import { Title, Text } from "@mantine/core";

const ExerciseListContainer = ({ templates }) => {
  return (
    <div className="p-5">
      {templates.length ? (
        <ul className="list-none">
          {templates[0].exercises.map((exercise) => (
            <li key={exercise._id} className="">
              <Text className="mb-1" tt="capitalize" fz='lg'>{exercise.exerciseName}</Text>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not saved any workouts &#128169;</p>
      )}
    </div>
  );
};

export const ExerciseContainer = ({ loadOneTemplateData }) => {
  const {
    data: { _id: userID },
  } = auth.getInfo();

  const { loading, error, data } = useQuery(GET_EXERCISE_PROGRESS, {
    variables: {
      templateID: loadOneTemplateData?.getProgress[0].templateId,
      userID: userID,
    },
  });

  if (loading)
    return (
      <div className="flex gap-5 mt-5">
        <Skeleton width={900} height={350} />
        <div className="flex flex-col gap-5">
          <Skeleton width={400} height={150} />
          <Skeleton width={400} height={150} />
          <Skeleton width={400} height={150} />
        </div>
      </div>
    );
  return (
    <div className="flex">
      <div className="w-6/12  rounded-3xl h-fit p-5">
        {data?.getExerciseProgress ? (
          <ExerciseChart exerciseData={data.getExerciseProgress} />
        ) : null}
      </div>

      <div>
        {loadOneTemplateData?.getProgress ? (
          <>
            <Title size={40} color="grape" className="my-2">Exercises</Title>
            <ExerciseListContainer
              templates={loadOneTemplateData.getProgress}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

import { useQuery } from "@apollo/client";
import { GET_EXERCISE_PROGRESS } from "../../../utils/graphql/queries";
import auth from "../../../utils/auth/auth";
import { ExerciseChart } from "./ExerciseChart";
import { Skeleton } from "@mantine/core";
import { Title } from "@mantine/core";
import { ExerciseListContainer } from "./ExerciseListContainer";

export default function ExerciseContainer({
  loadOneTemplateData,
  activeTemplate,
}) {
  const {
    data: { _id: userID },
  } = auth.getInfo();

  const { loading, data } = useQuery(GET_EXERCISE_PROGRESS, {
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
    <>
      {activeTemplate ? (
        <div className="flex flex-wrap flex-col xl:flex-row w-full justify-center items-center xl:justify-start xl:items-start gap-4">
          {data?.getExerciseProgress ? (
            <ExerciseChart exerciseData={data.getExerciseProgress} />
          ) : null}

          {loadOneTemplateData?.getProgress ? (
            <div className="xl:w-4/12">
              <Title size={40} className="my-2">
                Exercises
              </Title>
              <ExerciseListContainer
                templates={loadOneTemplateData.getProgress}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

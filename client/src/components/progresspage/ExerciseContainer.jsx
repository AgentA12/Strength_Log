import { useQuery } from "@apollo/client";
import { GET_EXERCISE_PROGRESS } from "../../utils/graphql/queries";
import auth from "../../utils/auth/auth";
import { ExerciseChart } from "./index";
import { Loader, Center, Container } from "@mantine/core";

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
      <Center h={200} mx="auto">
        <Loader size="lg" />
      </Center>
    );

  return (
    <Container fluid>
      {activeTemplate ? (
        <>
          {data?.getExerciseProgress ? (
            <ExerciseChart exerciseData={data.getExerciseProgress} />
          ) : null}
        </>
      ) : null}
    </Container>
  );
}

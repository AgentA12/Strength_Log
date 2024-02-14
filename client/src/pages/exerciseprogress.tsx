import {
  Box,
  Container,
  Group,
  Loader,
  Text,
  Flex,
  Stack,
} from "@mantine/core";
import {
  ExerciseSelect,
  DateRangeSelect,
  MetricSelect,
} from "../components/progresspage/index";
import { useContext, useState } from "react";
import { UserContext, UserInfo } from "../contexts/userInfo";
import ExerciseChart from "../components/progresspage/ExerciseChart";
import { GET_ONE_REP_MAX } from "../utils/graphql/queries";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import ChartWrapper from "../components/progresspage/ChartWrapper";
import RecentExerciseProgress from "./recentExerciseProgress";
import { Range } from "../types/range";

type Metric = "estimated 1rm" | "total volume";

export default function ExerciseProgressPage() {
  const userInfo = useContext<UserInfo>(UserContext);
  const userID = userInfo?.data._id;

  const { state } = useLocation();
  const [range, setRange] = useState<Range>("all time");
  const [metric, setMetric] = useState<Metric>("estimated 1rm");
  const [activeExercise, setActiveExercise] = useState(
    state?.exerciseName ? state.exerciseName : "all exercises"
  );

  const {
    data: oneRepMax,
    loading: ormLoading,
    error: ormError,
  } = useQuery(GET_ONE_REP_MAX, {
    variables: {
      exerciseName: activeExercise,
      userID: userID,
    },
  });

  if (ormLoading) return <Loader />;

  if (ormError) return ormError?.message;
  return (
    <Container fluid>
      <Flex
        mt={20}
        gap={20}
        wrap={{ base: "wrap", lg: "nowrap" }}
        justify="center"
      >
        <Flex direction="column" w={{ base: "100%", lg: "60%", xl: "75%" }}>
          <Group justify="center">
            <ExerciseSelect
              userID={userID as string}
              activeExercise={activeExercise}
              setActiveExercise={setActiveExercise}
            />
            <DateRangeSelect range={range} setRange={setRange} />
            <MetricSelect metric={metric} setMetric={setMetric} />
          </Group>

          <ChartWrapper>
            <ExerciseChart
              userID={userID as string}
              range={range}
              metric={metric}
              activeExercise={activeExercise}
            />
          </ChartWrapper>
        </Flex>

        <Box w={{ base: "100%", lg: "40%", xl: "35%" }}>
          {activeExercise != "all exercises" && (
            <Stack align="center" gap={0}>
              <Text>Estimated Best 1RM</Text>

              <Text size="xxl" fw={900}>
                {oneRepMax?.getOneRepMax &&
                  activeExercise &&
                  oneRepMax.getOneRepMax}{" "}
                Lb
              </Text>
            </Stack>
          )}

          <RecentExerciseProgress activeExercise={activeExercise} />
        </Box>
      </Flex>
    </Container>
  );
}

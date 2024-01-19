import { Box, Container, Divider, Group, Text, Title } from "@mantine/core";
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
import DividerTitle from "../components/DividerTitle";

type Range =
  | "All time"
  | "Last month"
  | "Last 3 months"
  | "Last 6 months"
  | "Last 12 months";

type Metric = "Estimated 1RM" | "Total Volume";

export default function ExerciseProgressPage() {
  const userInfo = useContext<UserInfo>(UserContext);
  const userID = userInfo?.data._id;

  const { state } = useLocation();

  const [range, setRange] = useState<Range>("All time");
  const [metric, setMetric] = useState<Metric>("Estimated 1RM");
  const [activeExercise, setActiveExercise] = useState(
    state ? state.exerciseName : null
  );

  const { data: oneRepMax } = useQuery(GET_ONE_REP_MAX, {
    variables: {
      exerciseName: activeExercise,
      userID: userID,
    },
  });

  return (
    <Container fluid>
      <Box mt={5}>
        <DividerTitle
          name={activeExercise ? activeExercise : "Select an exercise"}
        />
      </Box>
      <Group my="xs">
        <ExerciseSelect
          userID={userID as string}
          activeExercise={activeExercise}
          setActiveExercise={setActiveExercise}
        />

        <Divider orientation="vertical" variant="solid" />

        <Group>
          <DateRangeSelect range={range} setRange={setRange} />
          <MetricSelect metric={metric} setMetric={setMetric} />
        </Group>
      </Group>

      {oneRepMax?.getOneRepMax && activeExercise ? (
        <Text>
          Estimated One Rep Max:{" "}
          <Text size="xl" fw={900} span>
            {oneRepMax.getOneRepMax}
          </Text>
          <Text span> Lbs</Text>
        </Text>
      ) : null}

      <ChartWrapper>
        <ExerciseChart
          userID={userID as string}
          range={range}
          metric={metric}
          activeExercise={activeExercise}
        />
      </ChartWrapper>
    </Container>
  );
}

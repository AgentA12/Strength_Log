import { Container, Divider, Group, Paper, Text, Title } from "@mantine/core";
import {
  ExerciseSelect,
  DateRangeSelect,
  MetricSelect,
} from "../components/progresspage/index";
import { useContext, useState } from "react";
import { UserContext } from "../app";
import ExerciseChart from "./ExerciseChart";
import { GET_ONE_REP_MAX } from "../utils/graphql/queries";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import ChartWrapper from "./ChartWrapper";

export default function ExerciseProgressPage() {
  const {
    data: { _id: userID },
  } = useContext<UserContext>(UserContext);

  const { state } = useLocation();

  const [range, setRange] = useState<string>("All time");
  const [metric, setMetric] = useState<"Estimated 1RM" | "Total Volume">(
    "Estimated 1RM"
  );
  const [activeExercise, setActiveExercise] = useState<string | null>(
    state ? state.exerciseName : "bench press"
  );

  const { data: oneRepMax } = useQuery(GET_ONE_REP_MAX, {
    variables: {
      exerciseName: activeExercise,
      userID: userID,
    },
  });

  return (
    <Container fluid>
      <Divider
        label={
          <Title tt="capitalize" fw={700} mt={10} w={"fit-content"}>
            {activeExercise}
          </Title>
        }
      />
      <Group my="xs">
        <ExerciseSelect
          userID={userID}
          activeExercise={activeExercise}
          setActiveExercise={setActiveExercise}
        />
        <Divider orientation="vertical" variant="solid" />

        <Group>
          <DateRangeSelect range={range} setRange={setRange} />
          <MetricSelect metric={metric} setMetric={setMetric} />
        </Group>
      </Group>

      <Text>
        Estimated One Rep Max:{" "}
        <Text size="xl" fw={900} span>
          {oneRepMax ? oneRepMax.getOneRepMax : null}
        </Text>
        <Text span> Lbs</Text>
      </Text>

      <ChartWrapper>
        <ExerciseChart
          userID={userID}
          range={range}
          metric={metric}
          activeExercise={activeExercise}
        />
      </ChartWrapper>
    </Container>
  );
}

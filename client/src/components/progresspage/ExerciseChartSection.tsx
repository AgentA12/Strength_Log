import classes from "./css/chart.module.css";
import { ExerciseSelect, ExerciseChart } from "./index";
import { Flex, Box } from "@mantine/core";
import { DateRangeSelect, MetricSelect } from "./index";

type Range =
  | "Last month"
  | "Last 3 months"
  | "Last 6 months"
  | "Last 12 months"
  | "All time";

interface Props {
  activeExercise: string;
  setActiveExercise: React.Dispatch<React.SetStateAction<string>>;
  userID: string;
  setRange: React.Dispatch<React.SetStateAction<Range>>;
  range: Range;
  metric: string;
  setMetric: React.Dispatch<React.SetStateAction<"Estimated 1RM" | "Total Volume">>;
  options?: any;
}

export default function ExerciseChartSection({
  activeExercise,
  setActiveExercise,
  userID,
  setRange,
  range,
  metric,
  setMetric,
}: Props) {
  return (
    <>
      <Box style={{ width: "fit-content" }} mt={25}>
        <ExerciseSelect
          userID={userID}
          activeExercise={activeExercise}
          setActiveExercise={setActiveExercise}
        />
      </Box>
      <Flex
        wrap="wrap"
        gap={5}
        justify={{ base: "center", sm: "left" }}
        my={15}
      >
        <DateRangeSelect range={range} setRange={setRange} />
        <MetricSelect setMetric={setMetric} metric={metric} />
      </Flex>
      <Box className={classes.chartContainer}>
        <ExerciseChart
          userID={userID}
          range={range}
          activeExercise={activeExercise}
          metric={metric}
        />
      </Box>
    </>
  );
}

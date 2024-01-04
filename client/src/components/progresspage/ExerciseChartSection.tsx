import classes from "./chart.module.css";
import { ExerciseSelect, ExerciseChart } from "./index";
import { Flex, Box } from "@mantine/core";
import { DateRangeSelect, MetricSelect } from "./index";

export default function ExerciseChartSection({
  activeExercise,
  setActiveExercise,
  userID,
  setRange,
  range,
  options,
  metric,
  setMetric,
}) {
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
        <DateRangeSelect setRange={setRange} />
        <MetricSelect setMetric={setMetric} metric={metric} />
      </Flex>
      <Box className={classes.chartContainer}>
        <ExerciseChart
          userId={userID}
          range={range}
          activeExercise={activeExercise}
          options={options}
          metric={metric}
        />
      </Box>
    </>
  );
}

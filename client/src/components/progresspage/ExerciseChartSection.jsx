import classes from "./chart.module.css"
import { ExerciseSelect, ExerciseChart } from "./index";
import { Title, Flex, Box } from "@mantine/core";
import { DateRangeSelect, MetricSelect } from "./index";

export default function ExerciseChartSection({
  activeExercise,
  setActiveExercise,
  userID,
  setRange,
  activeTemplate,
  range,
  options,
  metric,
  setMetric,
}) {
  return (
    <>
     
      <Flex
        wrap="wrap"
        gap={5}
        justify={{ base: "center", sm: "left" }}
        my={15}
      >
        <ExerciseSelect
          userID={userID}
          activeExercise={activeExercise}
          setActiveExercise={setActiveExercise}
        />
        <DateRangeSelect setRange={setRange} />
        <MetricSelect setMetric={setMetric} metric={metric} />
      </Flex>
      <Box className={classes.chartContainer}>
        <ExerciseChart
          activeTemplate={activeTemplate}
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

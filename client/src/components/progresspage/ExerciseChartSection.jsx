import { ExerciseSelect, ExerciseChart } from "./index";
import { Title, Flex, Box } from "@mantine/core";
import { DateRangeSelect } from "./index";

export default function ExerciseChartSection({
  activeExercise,
  setActiveExercise,
  userID,
  setRange,
  classes,
  activeTemplate,
  range,
  options,
}) {
  return (
    <>
      <Title
        sx={(theme) => ({ color: theme.colors.brand[4] })}
        fw={800}
        component="span"
        tt="capitalize"
      >
        {activeExercise && activeExercise}
      </Title>
      <Flex
        wrap="wrap"
        gap={5}
        justify={{ base: "center", sm: "left" }}
        mb={30}
      >
        <ExerciseSelect
          userID={userID}
          activeExercise={activeExercise}
          setActiveExercise={setActiveExercise}
        />
        <DateRangeSelect setRange={setRange} />
      </Flex>
      <Box className={classes.chartContainer}>
        <ExerciseChart
          activeTemplate={activeTemplate}
          userId={userID}
          range={range}
          activeExercise={activeExercise}
          options={options}
        />
      </Box>
    </>
  );
}

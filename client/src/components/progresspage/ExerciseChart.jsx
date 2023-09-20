import { useQuery } from "@apollo/client";
import { GET_CHART_PROGRESS_BY_TEMPLATE } from "../../utils/graphql/queries";
import { getRangeOfDates, findFirstAndLastRange } from "../../utils/helpers/functions";
import { Line } from "react-chartjs-2";


export default function ExerciseChart({
  userId,
  range,
  metric,
  activeExercise,
  options,
}) {
  const { loading, data, error } = useQuery(GET_CHART_PROGRESS_BY_TEMPLATE, {
    variables: {
      userId: userId,
      templateName: "All templates",
      range: range,
      metric: metric,
      exercise: null,
      shouldSortByTemplate: true,
    },
  });

  if (loading) return "loading";

  if (error) return error.message.toString();

  let filteredData;

  if (activeExercise !== "All Exercises") {
    filteredData = data?.getChartDataForTemplates.filter(
      (data) => data.label.toLowerCase() === activeExercise.toLowerCase()
    );
  } else {
    filteredData = data?.getChartDataForTemplates;
  }

  const labels = getRangeOfDates(range, ...findFirstAndLastRange(filteredData));

  if (data)
    return (
      <Line
        options={options}
        data={{
          labels: labels,
          datasets: filteredData,
        }}
      />
    );
}

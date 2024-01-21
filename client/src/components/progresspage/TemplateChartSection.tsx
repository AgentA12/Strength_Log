import { Box, Flex } from "@mantine/core";
import {
  TemplateSelect,
  TemplateChart,
  DateRangeSelect,
  MetricSelect,
} from "./index";
import { TemplateShape } from "../../types/template";

type Range =
  | "Last month"
  | "Last 3 months"
  | "Last 6 months"
  | "Last 12 months"
  | "All time";


interface Props {
  activeTemplate: string;
  templates: TemplateShape[];
  setActiveTemplate: React.Dispatch<React.SetStateAction<string>>;
  userID: string;
  setRange: React.Dispatch<React.SetStateAction<Range>>;
  range: Range;
  metric: string;
  setMetric: React.Dispatch<
    React.SetStateAction<"Estimated 1RM" | "Total Volume">
  >;
  options?: any;
}

export default function TemplateChartSection({
  activeTemplate,
  templates,
  setActiveTemplate,
  setRange,
  range,
  userID,
  options,
  metric,
  setMetric,
}: Props) {
  return (
    <>
      <Box mt={25} style={{ width: "fit-content" }}>
        <TemplateSelect
          templates={templates ? templates : []}
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
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

      <TemplateChart
        activeTemplate={activeTemplate}
        userID={userID}
        range={range}
        options={options}
        metric={metric}
      />
    </>
  );
}

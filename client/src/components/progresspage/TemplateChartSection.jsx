import { Box, Flex } from "@mantine/core";
import {
  TemplateSelect,
  TemplateChart,
  DateRangeSelect,
  MetricSelect,
} from "./index";

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
}) {
  return (
    <>
      <Flex
        wrap="wrap"
        gap={5}
        justify={{ base: "center", sm: "left" }}
        my={15}
      >
        <TemplateSelect
          templates={templates ? templates : []}
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
        />

        <DateRangeSelect setRange={setRange} />
        <MetricSelect setMetric={setMetric} metric={metric} />
      </Flex>

      <Box >
        <TemplateChart
          activeTemplate={activeTemplate}
          userId={userID}
          range={range}
          options={options}
          metric={metric}
        />
      </Box>
    </>
  );
}

import { Box, Title, Flex } from "@mantine/core";
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
  classes,
  metric,
  setMetric,
}) {
  return (
    <>
      <Title tt="capitalize" my={10} fw={800} >
        {activeTemplate && activeTemplate}
      </Title>

      <Flex
        wrap="wrap"
        gap={5}
        justify={{ base: "center", sm: "left" }}
        mb={30}
      >
        <TemplateSelect
          templates={templates ? templates : []}
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
        />

        <DateRangeSelect setRange={setRange} />
        <MetricSelect setMetric={setMetric} metric={metric} />
      </Flex>

      <Box className={classes.chartContainer}>
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

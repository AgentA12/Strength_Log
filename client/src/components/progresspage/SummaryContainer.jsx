import { TemplateChart } from "./index";
import { Center, Container, Loader } from "@mantine/core";

export default function SummaryContainer({
  loadChartSummaryData,
  activeTemplate,
  loadOneTemplateLoading,
}) {
  if (loadOneTemplateLoading)
    return (
      <Center>
        <Loader size="xl" height={200} />
      </Center>
    );

  return (
    <Container fluid>
      {activeTemplate && (
        <TemplateChart
          loadChartSummaryData={loadChartSummaryData}
          activeTemplate={activeTemplate}
        />
      )}
    </Container>
  );
}

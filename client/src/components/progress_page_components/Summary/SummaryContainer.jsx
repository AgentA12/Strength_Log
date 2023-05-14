import { Chart } from "./TemplateChart";
import ProgressCard from "./ProgressCard";
import { useState } from "react";
import ProgressModal from "./ProgressModal";
import { Center, Container, Loader, Text, Title } from "@mantine/core";
import { useLazyQuery } from "@apollo/client";
import auth from "../../../utils/auth/auth";
import { GET_SUMMARY } from "../../../utils/graphql/queries";
import { ScrollArea } from "@mantine/core";

export default function SummaryContainer({
  loadChartSummaryData,
  activeTemplate,
  loadOneTemplateData,
  loadOneTemplateLoading,
}) {
  var {
    data: { _id: userID },
  } = auth.getInfo();

  const [isOpen, setIsOpen] = useState(false);

  const [getTemplateSummary, { loading, error, data }] =
    useLazyQuery(GET_SUMMARY);

  async function handleSummary(templateData) {
    setIsOpen(true);
    await getTemplateSummary({
      variables: {
        templateId: templateData.templateId,
        userId: userID,
        progressId: templateData._id,
      },
    });
  }

  if (loadOneTemplateLoading)
    return (
      <Center>
        <Loader size="xl" height={200} />
      </Center>
    );

  return (
    <>
      {activeTemplate ? (
        <Container size="xl">
          <Chart
            loadChartSummaryData={loadChartSummaryData}
            activeTemplate={activeTemplate}
          />
          {loadChartSummaryData || loadOneTemplateData ? (
            <>
              <Title>Recently saved</Title>
              <ScrollArea style={{ height: 550 }} type="always">
                {loadOneTemplateData?.getProgress.length ? (
                  loadOneTemplateData.getProgress.map((progressInfo) => (
                    <ProgressCard
                      handleSummary={handleSummary}
                      progressInfo={progressInfo}
                      key={progressInfo._id}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                    />
                  ))
                ) : activeTemplate?.length ? (
                  <Text>You haven't saved workouts for '{activeTemplate}'</Text>
                ) : null}
              </ScrollArea>
            </>
          ) : null}

          <ProgressModal
            loading={loading}
            data={data}
            error={error}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </Container>
      ) : null}
    </>
  );
}

import { Box, Flex, Group, Select, Text } from "@mantine/core";
import {
  TemplateSelect,
  DateRangeSelect,
  MetricSelect,
} from "../components/progresspage/index";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserInfo } from "../contexts/userInfo";
import { TemplateChart } from "../components/progresspage/index";
import { GET_TEMPLATES } from "../utils/graphql/queries";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import ChartWrapper from "../components/progresspage/ChartWrapper";
import RecentProgress from "./recenttemplateprogress";
import { Range } from "../types/range";
type Metric = "estimated 1rm" | "total volume";

export default function TemplateProgress() {
  const userInfo = useContext<UserInfo>(UserContext);

  const userID = userInfo?.data._id;

  const { state } = useLocation();

  const [range, setRange] = useState<Range>("all time");
  const [metric, setMetric] = useState<Metric>("total volume");
  const [activeTemplate, setActiveTemplate] = useState<string>(
    state ? state.templateName : ""
  );

  const {
    data: templates,
    loading: templatesLoading,
    error,
  } = useQuery(GET_TEMPLATES, { variables: { userId: userID } });

  useEffect(() => {
    if (templates)
      setActiveTemplate(
        templates.getTemplates.length
          ? templates.getTemplates[0].templateName
          : "no saved templates"
      );
  }, [templates]);

  if (error)
    return (
      <>
        <Text size={"xl"} c="red.5">
          Oops! Something went wrong, Try refreshing the page
        </Text>
        <Text size={"xl"} c="red.5">
          {error.message}
        </Text>
      </>
    );

  return (
    <Flex
      mt={20}
      gap={20}
      wrap={{ base: "wrap", lg: "nowrap" }}
      justify="center"
    >
      <Flex direction="column" w={{ base: "100%", lg: "60%", xl: "75%" }}>
        <Group justify="center">
          {templatesLoading ? (
            <Select />
          ) : (
            <TemplateSelect
              activeTemplate={activeTemplate}
              setActiveTemplate={setActiveTemplate}
              templates={templates.getTemplates}
            />
          )}
          <DateRangeSelect range={range} setRange={setRange} />
          <MetricSelect metric={metric} setMetric={setMetric} />
        </Group>

        <ChartWrapper>
          <TemplateChart
            metric={metric}
            activeTemplate={activeTemplate}
            range={range}
            userID={userID as string}
          />
        </ChartWrapper>
      </Flex>

      <Box w={{ base: "100%", lg: "40%", xl: "35%" }}>
        <RecentProgress activeTemplate={activeTemplate} />
      </Box>
    </Flex>
  );
}

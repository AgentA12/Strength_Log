import { Container, Divider, Group, Loader } from "@mantine/core";
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
import DividerTitle from "../components/universal/DividerTitle";

type Range =
  | "Last month"
  | "Last 3 months"
  | "Last 6 months"
  | "Last 12 months"
  | "All time";

type Metric = "Estimated 1RM" | "Total Volume";

export default function TemplateProgressPage() {
  const userInfo = useContext<UserInfo>(UserContext);

  const userID = userInfo?.data._id;

  const { state } = useLocation();

  const [range, setRange] = useState<Range>("All time");
  const [metric, setMetric] = useState<Metric>("Total Volume");
  const [activeTemplate, setActiveTemplate] = useState<string>(
    state ? state.templateName : ""
  );

  const {
    data: templates,
    loading,
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

  if (loading) return <Loader m={40} />;
  if (error) return error.message;

  return (
    <Container fluid>
      <Group >
        <TemplateSelect
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
          templates={templates.getTemplates}
        />
        <Divider orientation="vertical" />

        <Group>
          <DateRangeSelect range={range} setRange={setRange} />
          <MetricSelect metric={metric} setMetric={setMetric} />
        </Group>
      </Group>

      <ChartWrapper>
        <TemplateChart
          metric={metric}
          activeTemplate={activeTemplate}
          range={range}
          userID={userID as string}
        />
      </ChartWrapper>
    </Container>
  );
}

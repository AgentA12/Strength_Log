import { Container, Divider, Group, Title } from "@mantine/core";
import {
  TemplateSelect,
  DateRangeSelect,
  MetricSelect,
} from "../components/progresspage/index";
import { useContext, useState } from "react";
import { UserContext } from "../app";
import { TemplateChart } from "../components/progresspage/index";
import { GET_TEMPLATES } from "../utils/graphql/queries";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import ChartWrapper from "./ChartWrapper";

export default function TemplateProgressPage() {
  const {
    data: { _id: userID },
  } = useContext<UserContext>(UserContext);

  const { state } = useLocation();

  const [range, setRange] = useState<string>("All time");
  const [metric, setMetric] = useState<string>("Total Volume");
  const [activeTemplate, setActiveTemplate] = useState<string | null>(
    state ? state.templateName : "(strength) push day"
  );

  const {
    data: templates,
    loading,
    error,
  } = useQuery(GET_TEMPLATES, { variables: { userId: userID } });

  if (loading) return "loading...";
  if (error) return error.message;

  return (
    <Container fluid>
      <Divider
        label={
          <Title tt="capitalize" fw={700} c="teal.6" mt={10} w={"fit-content"}>
            {activeTemplate}
          </Title>
        }
      />
      <Group my="xs">
        <TemplateSelect
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
          templates={templates.getTemplates}
        />
        <Divider orientation="vertical" variant="solid" />

        <Group>
          <DateRangeSelect range={range} setRange={setRange} />
          <MetricSelect metric={metric} setMetric={setMetric} />
        </Group>
      </Group>

      <ChartWrapper>
        <TemplateChart
          userId={userID}
          metric={metric}
          activeTemplate={activeTemplate}
          range={range}
        />
      </ChartWrapper>
    </Container>
  );
}

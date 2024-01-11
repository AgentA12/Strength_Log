import { Container, Divider, Group, Loader, Title } from "@mantine/core";
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

export default function TemplateProgressPage() {
  const userInfo = useContext<UserInfo>(UserContext);

  const userID = userInfo?.data._id;

  const { state } = useLocation();

  const [range, setRange] = useState<string>("All time");
  const [metric, setMetric] = useState<string>("Total Volume");
  const [activeTemplate, setActiveTemplate] = useState<string | null>(
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
      <Divider
        label={
          <Title tt="capitalize" fw={700} mt={10} w={"fit-content"}>
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
        <Divider orientation="vertical" />

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

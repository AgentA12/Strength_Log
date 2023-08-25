import { Box, Flex, Title, createStyles } from "@mantine/core";
import { UserContext } from "../../App";
import { useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import {
  TemplateSelect,
  TypeSelect,
  TemplateChart,
  DateRangeSelect,
} from "./index";
import {
  // GET_CHART_PROGRESS_BY_TEMPLATE,
  GET_TEMPLATES,
} from "../../utils/graphql/queries";

const useStyles = createStyles((theme) => ({
  chartContainer: {
    height: "700px",
  },
}));

export default function ByTemplatesContainer({
  activeTemplate,
  setActiveTemplate,
  // templateId
}) {
  const [metric, setMetric] = useState("Total weight");
  const [range, setRange] = useState("All time");

  const {
    data: { _id: userID },
  } = useContext(UserContext);

  const { data, error } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: userID,
    },
  });

  const { classes } = useStyles();

  if (error) return <Title color="red">{error.message}</Title>;

  return (
    <>
      <Title
        sx={(theme) => ({ color: theme.colors.brand[4] })}
        fw={800}
        component="span"
      >
        {activeTemplate && activeTemplate}
      </Title>
      <Flex
        wrap="wrap"
        gap={5}
        justify={{ base: "center", sm: "left" }}
        mb={30}
      >
        <TemplateSelect
          templates={data ? data.getTemplates : []}
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
        />

        <TypeSelect metric={metric} setMetric={setMetric} />
        <DateRangeSelect setRange={setRange} />
      </Flex>
      <Box className={classes.chartContainer}>
        <TemplateChart
          activeTemplate={activeTemplate}
          userId={userID}
          range={range}
          metric={metric}
        />
      </Box>
    </>
  );
}

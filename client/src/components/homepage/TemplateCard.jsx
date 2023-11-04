import { useState } from "react";
import { capitalizeFirstLetter } from "../../utils/helpers/functions";
import TemplateMenu from "./TemplateMenu";
import TemplateModal from "./TemplateModal";
import { Text, Card, Flex, Title, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    width: 300,
    height: 100,
    overflow: "visible",
    "&:hover": {
      cursor: "pointer",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
    [theme.fn.smallerThan("sm")]: {
      width: 250,
    },
  },

  exercises: {
    color: theme.colors.dimmed,
  },
}));

export default function TemplateCard({ template, handleTemplateDelete }) {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Card
        shadow="sm"
        radius="md"
        p="xs"
        withBorder
        className={classes.card}
        onClick={() => setOpened(!opened)}
      >
        <Flex justify="space-between" align="center" mb={10}>
          <Title lineClamp={1} order={3} span fw={600} tt="capitalize">
            {template.templateName}
          </Title>
          <TemplateMenu
            template={template}
            handleTemplateDelete={handleTemplateDelete}
          />
        </Flex>
        <Text c="dimmed" lineClamp={1}>
          {template.exercises.map((exercise, i) => (
            <Text tt="capitalize" component="span" key={exercise.exercise._id}>
              {template.exercises.length - 1 === i
                ? capitalizeFirstLetter(exercise.exercise.exerciseName)
                : capitalizeFirstLetter(exercise.exercise.exerciseName) + ", "}
            </Text>
          ))}
        </Text>
      </Card>

      <TemplateModal
        template={template}
        opened={opened}
        setOpened={setOpened}
      />
    </>
  );
}

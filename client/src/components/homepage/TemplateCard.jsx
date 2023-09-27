import { useState } from "react";
import { capitalizeFirstLetter } from "../../utils/helpers/functions";
import TemplateMenu from "./TemplateMenu";
import TemplateModal from "./TemplateModal";
import { Text, Card, Flex, Title, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    width: 300,
    overflow: "visible",
    "&:hover": { cursor: "pointer" },
    [theme.fn.smallerThan("sm")]: {
      width: 240,
    },
  },
  exercises: {
    color: theme.colors.brand[4],
  },
}));

export default function TemplateCard({ template, handleTemplateDelete }) {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  return (
    <>
      <div onClick={() => setOpened(!opened)}>
        <Card
          shadow="lg"
          radius="md"
          p="sm"
          withBorder
          className={classes.card}
        >
          <Flex justify="space-between" align="center" mb={10}>
            <Title
              variant="gradient"
              gradient={{ from: "#662D8C", to: " #ED1E79", deg: 90 }}
              order={3}
              span
              fw={600}
              tt="capitalize"
            >
              {template.templateName}
            </Title>
            <TemplateMenu
              template={template}
              handleTemplateDelete={handleTemplateDelete}
            />
          </Flex>
          <Text lineClamp={1} className={classes.exercises}>
            {template.exercises.map((exercise, i) => (
              <Text
                tt="capitalize"
                component="span"
                key={exercise.exercise._id}
              >
                {template.exercises.length - 1 === i
                  ? capitalizeFirstLetter(exercise.exercise.exerciseName)
                  : capitalizeFirstLetter(exercise.exercise.exerciseName) +
                    ", "}
              </Text>
            ))}
          </Text>
        </Card>
      </div>

      <TemplateModal
        template={template}
        opened={opened}
        setOpened={setOpened}
      />
    </>
  );
}

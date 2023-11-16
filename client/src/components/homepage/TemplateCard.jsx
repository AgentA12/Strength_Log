import { useState } from "react";
import { capitalizeFirstLetter } from "../../utils/helpers/functions";
import TemplateMenu from "./TemplateMenu";
import TemplateModal from "./TemplateModal";
import { Text, Card, Flex } from "@mantine/core";
import classes from "./homepage.module.css";

export default function TemplateCard({ template, handleTemplateDelete }) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Card
        className={classes.card}
        withBorder
        padding="md"
        onClick={() => setOpened(!opened)}
      >
        <Flex justify="space-between" align="center" mb={10}>
          <Text lineClamp={1} size="xl" fw={800}  tt="capitalize">
            {template.templateName}
          </Text>
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

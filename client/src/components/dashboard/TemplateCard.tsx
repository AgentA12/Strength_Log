import { useState } from "react";
import { capitalizeFirstLetter } from "../../utils/helpers/functions";
import TemplateMenu from "./TemplateMenu";
import { Text, Card, Flex, Modal, Button, Stack } from "@mantine/core";
import classes from "./homepage.module.css";
import { TemplateDrawer } from "./index";

export default function TemplateCard({ template, handleTemplateDelete }) {
  const [opened, setOpened] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Card
        className={classes.card}
        withBorder
        padding="md"
        onClick={() => setOpened(!opened)}
      >
        <Flex justify="space-between" align="center" mb={10}>
          <Text lineClamp={1} size="xl" fw={800} tt="capitalize">
            {template.templateName}
          </Text>
          <TemplateMenu template={template} setModalOpen={setModalOpen} />
        </Flex>
        <Text c="dimmed" lineClamp={1}>
          {template.exercises.map((exercise, i) => (
            <Text tt="capitalize" span key={exercise.exercise._id}>
              {template.exercises.length - 1 === i
                ? capitalizeFirstLetter(exercise.exercise.exerciseName)
                : capitalizeFirstLetter(exercise.exercise.exerciseName) + ", "}
            </Text>
          ))}
        </Text>
      </Card>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(!modalOpen)}
        title="Delete Template"
      >
        <Stack>
          {" "}
          <Text>
            Are you sure you want to delete{" "}
            <Text span fw={600} size="md">
              {template.templateName}
            </Text>
            ?
          </Text>
          <Button
            onClick={() => handleTemplateDelete(template._id)}
            color="red.5"
          >
            Yes delete it
          </Button>
        </Stack>
      </Modal>

      <TemplateDrawer
        template={template}
        opened={opened}
        setOpened={setOpened}
      />
    </>
  );
}

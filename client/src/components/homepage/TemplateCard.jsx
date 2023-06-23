import { useState } from "react";
import { motion } from "framer-motion";
import { capitalizeFirstLetter } from "../../utils/helpers/functions";
import TemplateMenu from "./TemplateMenu";
import TemplateModal from "./TemplateModal";
import { Text, Card, Flex, Title, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  exercise: {
    color: theme.colors["hot-pink"][5],
  },
}));

export default function TemplateCard({ template, handleTemplateDelete }) {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  return (
    <>
      <motion.div
        layout
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        onClick={() => setOpened(!opened)}
      >
        <Card
          shadow="sm"
          radius="md"
          p="sm"
          withBorder
          sx={{
            width: 300,
            overflow: "visible",
            "&:hover": { cursor: "pointer" },
          }}
        >
          <Flex justify="space-between" align="center" mb={10}>
            <Title order={3} span fw={600}>
              {template.templateName.toLocaleUpperCase()}
            </Title>
            <TemplateMenu
              template={template}
              handleTemplateDelete={handleTemplateDelete}
            />
          </Flex>
          <Text lineClamp={1} className={classes.exercise}>
            {template.exercises.map((exercise, i) => (
              <Text component="span" key={exercise.exerciseName}>
                {template.exercises.length - 1 === i
                  ? capitalizeFirstLetter(exercise.exerciseName)
                  : capitalizeFirstLetter(exercise.exerciseName) + ", "}
              </Text>
            ))}
          </Text>
        </Card>
      </motion.div>

      <TemplateModal
        template={template}
        opened={opened}
        setOpened={setOpened}
      />
    </>
  );
}

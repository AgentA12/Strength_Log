import { useState } from "react";
import { motion } from "framer-motion";
import { capitalizeFirstLetter } from "../../utils/helpers/functions";
import TemplateMenu from "./TemplateMenu";
import TemplateModal from "./TemplateModal";
import { Text, Card } from "@mantine/core";

export default function TemplateCard({ template, handleTemplateDelete }) {
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
        <Card shadow="sm" radius="md" withBorder>
          {template.templateName.toLocaleUpperCase()}

          <TemplateMenu
            template={template}
            handleTemplateDelete={handleTemplateDelete}
          />

          <Text lineClamp={1} >
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

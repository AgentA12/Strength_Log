import { useState } from "react";
import { motion } from "framer-motion";
import { capitalizeFirstLetter } from "../../utils/helpers/functions";
import TemplateMenu from "../template_page_components/TemplateMenu";
import TemplateModal from "../template_page_components/TemplateModal";
import { Text, Card, Flex, Title } from "@mantine/core";

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
          <Text lineClamp={1} color="blue">
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

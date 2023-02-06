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
        className="w-96"
        onClick={() => setOpened(!opened)}
      >
        <Card shadow="sm" radius="md" withBorder className="cursor-pointer overflow-visible">
          <div className="flex items-start justify-between">
            <h4 className="font-bold text-xl m-0">
              {template.templateName.toLocaleUpperCase()}
            </h4>
            <TemplateMenu
              template={template}
              handleTemplateDelete={handleTemplateDelete}
            />
          </div>

          <div className="mt-5 mr-2">
            <Text lineClamp={1} color={"grape"} className="font-semiboldz-10">
              {template.exercises.map((exercise, i) => (
                <span key={exercise.exerciseName}>
                  {template.exercises.length - 1 === i
                    ? capitalizeFirstLetter(exercise.exerciseName)
                    : capitalizeFirstLetter(exercise.exerciseName) + ", "}
                </span>
              ))}
            </Text>
          </div>
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

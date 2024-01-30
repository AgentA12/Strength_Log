import { UseForm } from "@mantine/form/lib/types";
import { motion } from "framer-motion";
import { Box, Stack, Fieldset, Textarea, TextInput } from "@mantine/core";

interface Props {
  form: ReturnType<UseForm>;
}

export default function TemplateInfoForm({ form }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      exit={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Fieldset>
        <Stack justify="center">
          <Box>
            <TextInput
            autoFocus
              withAsterisk
              label="Template Name"
              name="templateName"
              {...form.getInputProps("templateName")}
            />
          </Box>
          <Box>
            <Textarea
              label="Template Notes"
              minRows={5}
              name="templateNotes"
              {...form.getInputProps("templateNotes")}
            />
          </Box>
        </Stack>
      </Fieldset>
    </motion.div>
  );
}

import {
  Accordion,
  Text,
  Container,
  NumberInput,
  Button,
  Group,
  Box,
} from "@mantine/core";
import { getOneRepMax } from "../../utils/helpers/functions";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { OneRepMaxTable } from "./index";

export default function UtilitiesContainer() {
  const [oneRepMax, setOneRepMax] = useState(null);

  const form = useForm({
    initialValues: {
      weight: undefined,
      reps: undefined,
    },
    validate: {
      weight: (value) => (value <= 0 ? "Enter a number greater than 0" : null),
      reps: (value) => (value <= 0 ? "Enter a number greater than 0" : null),
    },
  });

  function handleSubmit() {
    form.validate();
    setOneRepMax(
      getOneRepMax(
        form.getInputProps("weight").value,
        form.getInputProps("reps").value
      )
    );
  }

  let title = "oneRepMaxCalc";

  return (
    <Container maw={1000} ml={0}>
      <Accordion defaultValue="oneRepMaxCalc">
        <Accordion.Item key={title} value={title}>
          <Accordion.Control>
            <Text tt="capitalize" size={30} fw={500} fs="oblique">
              One Rep Max Calculator
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Box>
              <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Group mb={10} align="flex-start" justify="flex-start" gap="xs">
                  <NumberInput
                    size="sm"
                    label="Lift Weight"
                    suffix="lbs"
                    step={5}
                    {...form.getInputProps("weight")}
                  />
                  <NumberInput
                    size="sm"
                    label="Number of repetitions"
                    {...form.getInputProps("reps")}
                    suffix="rep"
                  />
                </Group>
                <Button size="sm" type="submit">
                  Calculate One Rep Max
                </Button>
              </form>
              {oneRepMax && (
                <Box>
                  <Text size="xl" mt={10}>
                    Estimated 1RM:
                  </Text>
                  <Text component="span" fw="bold" size={30}>
                    {oneRepMax} Lbs
                  </Text>
                  <OneRepMaxTable oneRepMax={oneRepMax} />
                </Box>
              )}
            </Box>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

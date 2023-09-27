import {
  Accordion,
  Table,
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
      weight: 0,
      reps: 0,
    },
    validate: {
      weight: (value) =>
        checkIsValidNum(value)
          ? "Please enter a valid number reater than 0"
          : null,
      reps: (value) =>
        checkIsValidNum(value)
          ? "Please enter a valid number greater than 0"
          : null,
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
      <Accordion >
        <Accordion.Item key={title} value={title}>
          <Accordion.Control>
            <Text
              tt="capitalize"
              size={30}
              fw={500}
              fs="oblique"
              sx={(theme) => ({ color: theme.colors.brand[5] })}
            >
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
                  <Text
                    component="span"
                    sx={(theme) => ({ color: theme.colors.brand[5] })}
                    fw="bold"
                    size={30}
                  >
                    {oneRepMax}
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

function checkIsValidNum(num) {
  if (num <= 0) return false;

  if (typeof num === "number") return false;

  return true;
}

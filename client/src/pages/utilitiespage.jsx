import "@mantine/core/styles.css";

import { useForm } from "@mantine/form";
import { useState } from "react";
import {
  Accordion,
  Text,
  NumberInput,
  Button,
  Group,
  Box,
  Stack,
  Container,
} from "@mantine/core";
import { getOneRepMax } from "../utils/helpers/functions";
import { useViewportSize } from "@mantine/hooks";
import { OneRepMaxTable } from "../components/progresspage/index";

export default function UtilitiesPage() {
  const [oneRepMax, setOneRepMax] = useState(null);
  const { width } = useViewportSize();

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

  const items = [{ title: "oneRepMaxCalc", label: "One Rep Max Calculator" }];

  const accordionItems = items.map((item) => (
    <Accordion.Item value={item.title}>
      <Accordion.Control style={{ height: "100px" }}>
        <Text
          tt="capitalize"
          size={width >= 500 ? 30 : 15}
          fw={500}
          fs="oblique"
        >
          {item.label}
        </Text>
      </Accordion.Control>
      <Accordion.Panel>
        <Box>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Group mb={10} align="flex-start" justify="flex-start" gap="xs">
              <NumberInput
                size="sm"
                label="Lift Weight"
                suffix=" lbs"
                step={5}
                {...form.getInputProps("weight")}
                placeholder="Weight"
              />
              <NumberInput
                size="sm"
                label="Number of repetitions"
                {...form.getInputProps("reps")}
                suffix=" reps"
                placeholder="Reps"
              />
            </Group>
            <Button size="sm" type="submit">
              Calculate One Rep Max
            </Button>
          </form>
        </Box>
        {oneRepMax && (
          <>
            <Text fs={50} fw={500} size="lg" mt={20}>
              Estimated One Rep Max:
            </Text>
            <Text fs={50} fw={800} size="xl">
              {oneRepMax} Lbs
            </Text>
            <OneRepMaxTable oneRepMax={oneRepMax} />
          </>
        )}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Container fluid>
      <Accordion defaultValue="oneRepMaxCalc">
        {...accordionItems}
       
      </Accordion>
    </Container>
  );
}

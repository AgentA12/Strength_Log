import "@mantine/core/styles.css";

import { useForm } from "@mantine/form";
import { useState } from "react";
import {
  Text,
  NumberInput,
  Button,
  Group,
  Box,
  Container,
  Title,
} from "@mantine/core";
import { getOneRepMax } from "../utils/helpers/functions";
import { OneRepMaxTable } from "../components/progresspage/index";

export default function UtilitiesPage() {
  const [oneRepMax, setOneRepMax] = useState(null);

  const form = useForm({
    initialValues: {
      weight: null,
      reps: null,
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

  return (
    <Container fluid>
      <Title tt="capitalize" fw={700} fs="oblique">
        One Rep Max Calculator
      </Title>

      <Box>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Group mb={10} align="flex-start" justify="flex-start" gap="xs">
            <NumberInput
              size="sm"
              label="Lift"
              suffix=" lbs"
              step={5}
              {...form.getInputProps("weight")}
              min={5}
              max={1000}
            />
            <NumberInput
              size="sm"
              label="Repetitions"
              {...form.getInputProps("reps")}
              suffix=" rep"
              min={1}
            />
          </Group>
          <Button mt={5} size="sm" type="submit">
            Calculate One Rep Max
          </Button>
        </form>
      </Box>
      {typeof oneRepMax === 'number' && (
        <>
          <Text mt={20}>Your Estimated One Rep Max is </Text>
          <Text fw={800} c={"primaryColor"} style={{ fontSize: "35px" }}>
            {oneRepMax} Lbs
          </Text>
          <OneRepMaxTable oneRepMax={oneRepMax} />
        </>
      )}
    </Container>
  );
}

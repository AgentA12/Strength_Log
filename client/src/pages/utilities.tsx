import { useForm } from "@mantine/form";
import { useState } from "react";
import {
  Text,
  NumberInput,
  Button,
  Group,
  Box,
  Container,
} from "@mantine/core";
import { getOneRepMax } from "../utils/helpers/functions";
import { OneRepMaxTable } from "../components/progresspage/index";
import DividerTitle from "../components/universal/DividerTitle";

export default function UtilitiesPage() {
  const [oneRepMax, setOneRepMax] = useState<null | number>(null);

  const form = useForm({
    initialValues: {
      weight: 0,
      reps: 0,
    },
    validate: {
      weight: (value) => (value <= 0 ? "Enter a number greater than 0" : null),
      reps: (value) => (value <= 0 ? "Enter a number greater than 0" : null),
    },
  });

  function handleSubmit() {
    form.validate();
    const reps = form.getInputProps("reps").value;
    const weight = form.getInputProps("weight").value;
    const oneRepMax = getOneRepMax(weight, reps);
    setOneRepMax(oneRepMax);
  }

  return (
    <Container fluid>

      <DividerTitle fs="oblique" name="One Rep Max Calculator" />
      <Box>
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
              suffix=" reps"
              min={1}
            />
          </Group>
          <Button mt={5} size="sm" type="submit">
            Calculate One Rep Max
          </Button>
        </form>
      </Box>
      {typeof oneRepMax === "number" && (
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

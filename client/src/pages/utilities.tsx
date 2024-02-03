import { useForm } from "@mantine/form";
import { useState } from "react";
import {
  Text,
  NumberInput,
  Button,
  Group,
  Container,
  Flex,
} from "@mantine/core";
import { getOneRepMax } from "../utils/helpers/functions";
import { OneRepMaxTable } from "../components/progresspage/index";
import DividerTitle from "../components/universal/DividerTitle";
import { useMediaQuery } from "@mantine/hooks";

export default function UtilitiesPage() {
  const [oneRepMax, setOneRepMax] = useState<null | number>(null);
  const isMobile = useMediaQuery(`(max-width: 767px)`);

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
      <DividerTitle name="Utilities" />
      <Flex direction="column" align={isMobile ? "center" : "start"}>
        <Text fw={700} size="xxl" tt="capitalize">
          one rep max calculator
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Flex
            mb={10}
            align={{ base: "center", md: "start" }}
            justify={{ base: "center", md: "start" }}
            gap="xs"
          >
            <NumberInput
              style={{ textAlign: isMobile ? "center" : "start" }}
              size="sm"
              label="Lift"
              step={5}
              {...form.getInputProps("weight")}
              min={5}
              max={1000}
            />
            <NumberInput
              style={{ textAlign: isMobile ? "center" : "start" }}
              size="sm"
              label="Repetitions"
              {...form.getInputProps("reps")}
              min={1}
            />
          </Flex>
          <Flex
            align={{ base: "center", md: "start" }}
            justify={{ base: "center", md: "start" }}
          >
            <Button mt={5} size="lg" type="submit">
              Calculate One Rep Max
            </Button>
          </Flex>
        </form>

        {typeof oneRepMax === "number" && (
          <>
            <Text mt={20}>Your Estimated One Rep Max is </Text>
            <Text fw={800} c={"primaryColor"} style={{ fontSize: "35px" }}>
              {oneRepMax} Lbs
            </Text>
            <OneRepMaxTable oneRepMax={oneRepMax} />
          </>
        )}
      </Flex>
    </Container>
  );
}

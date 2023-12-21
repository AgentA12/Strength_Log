import {
  Box,
  Container,
  Group,
  Text,
  Title,
  Table,
  Flex,
  Accordion,
  Select,
} from "@mantine/core";
import React from "react";
import { MdChangeHistory } from "react-icons/md";

export default function ProgressPageTwo() {
  return (
    <Container fluid>
      <Title mb={12}>Upperbody</Title>
      <Select
        description="Select a template"
        style={{ width: 300 }}
        data={["upperbody", "lowerbody"]}
      />
      <Accordion mb={20}>
        <Accordion.Item value={originalTemplate.date}>
          <Accordion.Control>Original Template</Accordion.Control>
          <Accordion.Panel>
            <Text>{originalTemplate.date}</Text>
            <Group>
              <Box>
                <Text>Total Volume</Text>
                <Text>{originalTemplate.totalVolume} lbs</Text>
              </Box>
              <Box>
                <Text>Total Sets</Text>
                <Text>{originalTemplate.totalSets}</Text>
              </Box>
              <Box>
                <Text>Total Reps</Text>
                <Text>{originalTemplate.totalReps}</Text>
              </Box>
            </Group>

            {originalTemplate.exercises.map((exercise) => (
              <ProgressTable key={exercise.exerciseName} exercise={exercise} />
            ))}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      {data.map((d) => (
        <React.Fragment key={d.date}>
          <Text>{d.date}</Text>
          <Group>
            <Box>
              <Text>Total Volume</Text>
              <Text>
                {d.totalVolume} {formatNumberDifference(d.totalVolumeChange)}
              </Text>
            </Box>
            <Box>
              <Text>Total Sets</Text>
              <Text>
                {d.totalSets} {formatNumberDifference(d.totalSetChange)}
              </Text>
            </Box>
            <Box>
              <Text>Total Reps</Text>
              <Text>
                {d.totalReps} {formatNumberDifference(d.totalRepChange)}
              </Text>
            </Box>
          </Group>
          {d.exercises.map((exercise) => (
            <ProgressTable key={exercise.exerciseName} exercise={exercise} />
          ))}
        </React.Fragment>
      ))}
    </Container>
  );
}

function ProgressTable({ exercise }) {
  const rows = exercise.sets.map((set, i) => (
    <Table.Tr key={i}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>{set.reps}</Table.Td>
      <Table.Td>{set.weight}</Table.Td>
      <Table.Td>{set.change}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Container fluid>
      <Text>{exercise.exerciseName}</Text>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Set</Table.Th>
            <Table.Th>Reps</Table.Th>
            <Table.Th>Weight</Table.Th>
            <Table.Th>
              <Flex align="center" gap={12}>
                <MdChangeHistory size={32} />
                <Select
                  defaultValue={"Previously Saved"}
                  label="Compare to"
                  data={["Previously Saved", "Original"]}
                  size="xs"
                />
              </Flex>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Container>
  );
}

function formatNumberDifference(number) {
  const num = parseInt(number);

  if (num > 0) return `+${String(num)}`;
  if (num < 0) return String(num);
}

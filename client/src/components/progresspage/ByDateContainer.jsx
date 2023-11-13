import {
  Center,
  Box,
  Container,
  Select,
  Loader,
  Stack,
  Table,
  Text,
  Group,
} from "@mantine/core";

import { useQuery } from "@apollo/client";
import { GET_TEMPLATE_PROGRESS } from "../../utils/graphql/queries";
import { UserContext } from "../../app";
import { useContext } from "react";
import {
  getTotalReps,
  getTotalSets,
  getTotalVolume,
} from "../../utils/helpers/functions";
import { gql } from "@apollo/client";
import { useState } from "react";

export const GET_TEMPLATES = gql`
  query ($userId: ID!) {
    getTemplates(userId: $userId) {
      _id
      templateName
      templateNotes
    }
  }
`;

export default function ByDateContainer() {
  const {
    data: { _id },
  } = useContext(UserContext);

  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

  const {
    data: workoutData,
    error: workoutError,
    loading: workoutLoading,
  } = useQuery(GET_TEMPLATE_PROGRESS, {
    variables: { userID: _id, templateID: "64e85dc2744ce77a5668bd27" },
  });

  const {
    data: templateData,
    loading: templatesLoading,
    error: templatesError,
  } = useQuery(GET_TEMPLATES, {
    variables: {
      userId: _id,
    },
  });

  if (workoutLoading || templatesLoading)
    return (
      <Center mt={50}>
        <Stack align="center">
          <Loader />
          loading...
        </Stack>
      </Center>
    );

  if (workoutError || templatesError)
    return workoutError.message || templatesError.message;

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let workouts = workoutData.getTemplateProgress;
  let templates = templateData.getTemplates;

  return (
    <Container fluid>
      <Group>
        <Select
          onChange={(value) => setCurrentTemplate(value)}
          placeholder="Template"
          data={[{ label: "All Templates", value: "all templates" }].concat(
            templates.map((template) => {
              {
                return { label: template.templateName, value: template._id };
              }
            })
          )}
        />
        <Select
          onChange={(value) => setCurrentDate(value)}
          placeholder="Date"
          disabled={!currentTemplate}
          data={[{ label: "All Dates", value: "all dates" }].concat(
            workouts.map((workout) => {
              return {
                value: workout.createdAt,
                label: new Date(parseInt(workout.createdAt)).toLocaleDateString(
                  "en-us",
                  options
                ),
              };
            })
          )}
        />
      </Group>
      <Stack mt={20}>
        <Box>
          <Text>
            Squats {" -> "}
            <Text component="span">
              4x8 <Text span>225lbs</Text>{" "}
            </Text>
          </Text>
        </Box>{" "}
        <Box>
          <Text>
            Hip Thusts {" -> "}{" "}
            <Text component="span">
              3x10 <Text span>225lbs</Text>{" "}
            </Text>
          </Text>
        </Box>{" "}
        <Box>
          <Text>
            DeadLifts {" -> "}{" "}
            <Text component="span">
              5x5 <Text span>225lbs</Text>{" "}
            </Text>
          </Text>
        </Box>
      </Stack>
      {/* <Text fw={900} size={30} span tt="capitalize">
        {workout.template.templateName}
      </Text>

      <Box>
        <Text className={classes.date} fz={28} component="span">
          {new Date(parseInt(workout.createdAt)).toLocaleDateString(
            "en-us",
            options
          )}
        </Text>
      </Box>

      <Box>
        <Badge>Total Volume {getTotalVolume(workout.exercises)} Lbs</Badge>{" "}
        <Badge>Total Sets {getTotalSets(workout.exercises)}</Badge>{" "}
        <Badge>Total Reps {getTotalReps(workout.exercises)}</Badge>
        {workout.exercises.map((exercise) => (
          <TableSection key={uuidv4()} exercise={exercise} />
        ))}
      </Box> */}
    </Container>
  );
}

function TableSection({ exercise }) {
  const rows = exercise.sets.map((set, index) => (
    <tr key={set.weight + index}>
      <td>{index + 1}</td>
      <td>{set.reps}</td>
      <td>{set.weight}</td>
    </tr>
  ));

  return (
    <>
      <Text mt={5} fz={20}>
        {exercise.exercise.exerciseName}
      </Text>

      <Table>
        <thead>
          <tr>
            <th>Set</th>
            <th>Reps</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}

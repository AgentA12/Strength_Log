import { useQuery } from "@apollo/client";
import {
  Box,
  Center,
  Flex,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useUserInfo } from "../../contexts/userInfo";
import { GET_PROGRESS_BY_DATE } from "../../utils/graphql/queries";
import { Workout } from "../../types/workout";
import { DateLink } from "../progresspage/DateLink";
import { Sparkline } from "@mantine/charts";
import {
  getTotalSets,
  getTotalReps,
  getTotalVolume,
} from "../../utils/helpers/functions";

export default function RecentlyCompleted() {
  const userInfo = useUserInfo();
  const { primaryColor } = useMantineTheme();

  const { data, loading, error } = useQuery(GET_PROGRESS_BY_DATE, {
    variables: { userID: userInfo?.data._id },
  });

  if (loading)
    return (
      <Center>
        <Loader />
      </Center>
    );

  if (error)
    return (
      <Stack gap={0} align="center" c="red.5">
        <Text>Oops, something went wrong!</Text>
        <Text>Try refreshing the page</Text>
      </Stack>
    );

  return (
    <Stack gap={5} visibleFrom="sm">
      {data.getProgressByDate
        .map((workout: Workout) => (
          <Paper px={20} p={10} mah={200} withBorder key={workout._id}>
            <Flex
              gap={0}
              h="100%"
              align="center"
              justify="space-around"
              direction="column"
            >
              <Text tt="capitalize" size="md">
                <DateLink
                  size="lg"
                  workoutID={workout._id}
                  createdAt={workout.createdAt.toString()}
                />
              </Text>

              <Group
                align="space-around"
                justify="center"
                wrap="nowrap"
                gap={12}
              >
                <Text fw={600} tt="capitalize">
                  {workout.template.templateName}
                </Text>

                <Sparkline
                  h={30}
                  w={60}
                  color={`${primaryColor}.8`}
                  data={new Array(12)
                    .fill(null)
                    .map(() => Math.floor(Math.random() * 40))}
                  curveType="linear"
                  fillOpacity={0.6}
                  strokeWidth={1}
                />
              </Group>

              <Group>
                <Text fw={500} size="sm">
                  Sets {getTotalSets(workout.exercises)}
                </Text>
                <Text fw={500} size="sm">
                  Reps {getTotalReps(workout.exercises)}
                </Text>
                <Text fw={500} size="sm">
                  Volume: {getTotalVolume(workout.exercises)} Lb
                </Text>
              </Group>
            </Flex>
          </Paper>
        ))
        .slice(0, 3)}
    </Stack>
  );
}

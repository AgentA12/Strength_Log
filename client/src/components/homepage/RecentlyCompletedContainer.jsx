import { Carousel } from "@mantine/carousel";
import {
  Text,
  Flex,
  Card,
  Group,
  Badge,
  Box,
  ThemeIcon,
  Divider,
} from "@mantine/core";
import { getExerciseIcon } from "../../utils/helpers/functions";

// const useStyles = createStyles({});

export function RecentlyCompletedCard({
  templateName,
  dateCompleted,
  totalVolume,
  totalReps,
  totalSets,
  timeToComplete,
  exercises,
}) {
  //   const { classes } = useStyles();

  return (
    <Card w={500} h={350} withBorder p="xl">
      <Card.Section>
        <Group>
          <Text
            variant="gradient"
            gradient={{ from: "#662D8C", to: " #ED1E79", deg: 90 }}
            fw={600}
            tt="capitalize"
            size={32}
          >
            {templateName}
          </Text>

          <Text span c="dimmed" size={"md"}>
            {dateCompleted}
          </Text>
          {timeToComplete ? (
            <Text c="dimmed" size={"md"}>
              Took: {timeToComplete}
            </Text>
          ) : null}
        </Group>
      </Card.Section>

      <Card.Section>
        <Group>
          <Badge>Volume {totalVolume} lbs</Badge>
          <Badge>Reps {totalReps}</Badge>
          <Badge>Sets {totalSets}</Badge>
        </Group>
      </Card.Section>

      <Card.Section p={20}>
        <Flex>
          {exercises.map((exercise) => (
            <>
              <Group>
                <Flex gap={5} align="center">
                  <Text sx={(theme) => ({ color: theme.colors.brand[4] })}>
                    {exercise.exerciseName}
                  </Text>
                  <ThemeIcon size={20} radius="xl">
                    {getExerciseIcon(exercise.equipment)}
                  </ThemeIcon>
                </Flex>
                <Box>
                  {exercise.sets.length}x{exercise.sets.every(
                    (set) => exercise.sets[0].weight === set.weight
                  )
                    ? `${exercise.sets[0].weight}lbs`
                    : exercise.sets.map((set, i) => (
                        <Text span>
                          {`${i === 0 ? "" : "/"}${set.weight} ${
                            i === exercise.sets.length - 1 ? "lbs" : ""
                          }`}
                        </Text>
                      ))}
                </Box>
              </Group>
            
            </>
          ))}
        </Flex>
      </Card.Section>
    </Card>
  );
}

const data = [
  {
    templateName: "Upper Body",
    dateCompleted: "Oct 13, Tuesday",
    totalVolume: 5500,
    totalReps: 85,
    totalSets: 25,
    timeToComplete: "1 Hour, 49 minutes",
    _id: "dfgl;n3e49t6034hgtjdrgdf",
    exercises: [
      {
        exerciseName: "Bench press",
        equipment: "barbell",
        sets: [{ weight: 135, reps: 12 }],
      },
      {
        exerciseName: "Overhead press",
        equipment: "barbell",
        sets: [
          { weight: 105, reps: 5 },
          { weight: 95, reps: 5 },
          { weight: 90, reps: 5 },
        ],
      },
      {
        exerciseName: "Barbell rows",
        equipment: "barbell",
        sets: [
          { weight: 95, reps: 5 },
          { weight: 95, reps: 5 },
          { weight: 95, reps: 5 },
        ],
      },
    ],
  },
  {
    templateName: "Lower Body",
    dateCompleted: "Oct 14, wednesday",
    totalVolume: 5500,
    totalReps: 85,
    totalSets: 25,
    timeToComplete: "2 Hours, 10 minutes",
    _id: "dfgl;nsdfsdfsd54",
    exercises: [
      {
        exerciseName: "Squat",
        equipment: "barbell",
        sets: [
          { weight: 205, reps: 12 },
          { weight: 205, reps: 12 },
          { weight: 205, reps: 12 },
        ],
      },
      {
        exerciseName: "Hip thrust",
        equipment: "barbell",
        sets: [
          { weight: 315, reps: 5 },
          { weight: 375, reps: 5 },
          { weight: 375, reps: 5 },
        ],
      },
      {
        exerciseName: "DeadLift",
        equipment: "barbell",
        sets: [
          { weight: 405, reps: 5 },
          { weight: 405, reps: 5 },
          { weight: 405, reps: 5 },
        ],
      },
    ],
  },
];

export function CardsCarousel() {
  const slides = data.map((item) => (
    <Carousel.Slide key={item._id}>
      <RecentlyCompletedCard {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      maw={1300}
      slideSize="35%"
      slideGap="xl"
      align="start"
      controlSize={40}
    >
      {slides}
    </Carousel>
  );
}

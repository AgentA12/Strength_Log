import { Carousel } from "@mantine/carousel";
import { StatsCard } from "./index";
import { GET_RECENTLY_COMPLETED_CAROUSEL_DATA } from "../../utils/graphql/queries";
import { useQuery } from "@apollo/client";
import { Center, Loader, Text } from "@mantine/core";
import { UserContext } from "../../App";
import { useContext } from "react";

let testData = [
  {
    title: "Upper Body",
    date: "March 27 2023",
    totalVolume: "5,500",
    diff: -60,
    prs: [
      { exerciseName: "Bench press", sets: 4, reps: 8, weight: 225 },
      { exerciseName: "Shoulder Press", sets: 3, reps: 5, weight: 135 },
    ],
  },
  {
    title: "Lower Body",
    date: "March 23 2023",
    totalVolume: "5,500",
    diff: 50,
    prs: [],
  },
];

export default function RecentCarousel() {
  const {
    data: { _id: userID },
  } = useContext(UserContext);

  const { loading, error } = useQuery(GET_RECENTLY_COMPLETED_CAROUSEL_DATA, {
    variables: { userID: userID },
  });

  if (loading)
    return (
      <Center h={270}>
        <Loader />
      </Center>
    );

  if (error)
    return (
      <Text color="red" fw={600} size="lg">
        {error.message}
      </Text>
    );

  return (
    <Carousel
      slideSize="57%"
      maw={550}
      h={270}
      controlSize={35}
      align="center"
      skipSnaps
    >
      {testData.map((data, i) => (
        <Carousel.Slide key={i}>
          <StatsCard stat={data} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

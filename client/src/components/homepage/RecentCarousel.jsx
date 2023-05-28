import { Carousel } from "@mantine/carousel";
import { StatsCard } from "./index";

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
  {
    title: "Arms",
    date: "March 24 2023",
    totalVolume: "1,500",
    diff: 0,
    prs: [],
  },
  {
    title: "Upper Body",
    date: "March 19 2023",
    totalVolume: "2,500",
    diff: 25,
    prs: [],
  },
  {
    title: "Upper Body",
    date: "March 27 2023",
    totalVolume: "5,500",
    diff: -60,
    prs: [],
  },
  {
    title: "Lower Body",
    date: "March 23 2023",
    totalVolume: "5,500",
    diff: 50,
    prs: [],
  },
  {
    title: "Arms",
    date: "March 24 2023",
    totalVolume: "1,500",
    diff: 0,
    prs: [],
  },
  {
    title: "Upper Body",
    date: "March 19 2023",
    totalVolume: "2,500",
    diff: 25,
    prs: [],
  },
  {
    title: "Upper Body",
    date: "March 27 2023",
    totalVolume: "5,500",
    diff: -60,
    prs: [],
  },
  {
    title: "Lower Body",
    date: "March 23 2023",
    totalVolume: "5,500",
    diff: 50,
    prs: [],
  },
  {
    title: "Arms",
    date: "March 24 2023",
    totalVolume: "1,500",

    diff: 0,
    prs: [],
  },
  {
    title: "Upper Body",
    date: "March 19 2023",
    totalVolume: "2,500",
    diff: 25,
    prs: [],
  },
];

export default function RecentCarousel() {
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

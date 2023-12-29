import classes from "./dashboard.module.css";
import {
  Box,
  Flex,
  Text,
  Divider,
  Title,
  Skeleton,
  Container,
  Center,
  Stack,
} from "@mantine/core";
import { Calendar, TemplateSection } from "../components/dashboard/index";
import { TbWeight } from "react-icons/tb";
import { GiWeightLiftingUp } from "react-icons/gi";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { UserContext } from "../app";
import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_STAT_SUMMARY } from "../utils/graphql/queries";

function DataDisplay({ label, stat, icon }) {
  return (
    <Flex direction="column" justify="center">
      <Flex justify={{ base: "center", lg: "flex-start" }} align="center">
        {icon()}
        <Text ml={5}>{Intl.NumberFormat("en-US").format(stat)}</Text>
      </Flex>
      <Text ta="center" fw={400} c="dimmed" tt="capitalize">
        {label}
      </Text>
    </Flex>
  );
}

function DataOverView() {
  const {
    data: { _id: userID },
  } = useContext(UserContext);

  const { data, loading, error } = useQuery(GET_STAT_SUMMARY, {
    variables: {
      userID,
    },
  });

  if (loading)
    return (
      <Flex
        justify={{ base: "center", lg: "flex-start" }}
        wrap="wrap"
        gap={{ base: "25px", xs: "60px" }}
      >
        {Array.from({ length: 4 }, (_, index) => (
          <Flex key={index} direction="column" justify="center">
            <Flex align="center" mb={5}>
              <Skeleton h={15} w={15} radius="md" />
              <Skeleton ml={5} height={10} w={35} />
            </Flex>
            <Skeleton height={10} w={75} />
          </Flex>
        ))}
      </Flex>
    );

  if (error) return <Text>{error.message.toString()}</Text>;

  const stats = data.getDataSummary.map((summaryData) => ({
    ...summaryData,
    icon: () => {
      switch (summaryData.label) {
        case "total weight lifted":
          return <TbWeight />;
        case "workouts":
          return <IoCheckmarkDoneOutline />;
        default:
          return <GiWeightLiftingUp />;
      }
    },
  }));

  return (
    <Flex
      justify={{ base: "center", lg: "flex-start" }}
      wrap="wrap"
      gap={{ base: "25px", xs: "60px" }}
    >
      {stats.map((theData, i) => (
        <DataDisplay key={i} {...theData} />
      ))}
    </Flex>
  );
}

export default function DashBoardPage() {
  return (
    <Container fluid>
      <Divider
        label={<Title className={classes.dividerTitle}>Dashboard</Title>}
        mb={10}
      />
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify={{ base: "center", lg: "space-between" }}
        gap="xl"
        grow="true"
      >
        <Stack style={{ flexGrow: 2, order: 2 }}>
          <DataOverView />
          <TemplateSection />
        </Stack>
        <Box className={classes.calenderContainer}>
          <Center>
            <Calendar />
          </Center>
        </Box>
      </Flex>
    </Container>
  );
}

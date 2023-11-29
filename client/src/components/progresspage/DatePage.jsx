import { Box, Container, Flex, Text, Title } from "@mantine/core";
import { BiLineChart, BiLineChartDown } from "react-icons/bi";
export default function DatePage() {
  return (
    <Container fluid p={50}>
      <Title>Lower body</Title>
      <Flex gap={120}>
        <Box>
          <Text>
            10-08-2023
            <Text span ml={12}>
              1 hour 42 minutes
            </Text>
          </Text>
          <Text>
            <Text mr={10} size="xl" span fw="bold">
              Squat
            </Text>
            4 sets {"=>"} 145/145/145/145
          </Text>
          <Text>
            <Text mr={10} span fw="bold">
              Previous
            </Text>
            4 sets {"=>"} 135/135/135/135
          </Text>{" "}
          <Text>
            <Text mr={10} span fw="bold">
              Original
            </Text>
            3 sets {"=>"} 135/135/135/135
          </Text>
        </Box>
        <Box>
          <Text>total volume</Text>
          <Text span>
            Previous {"=>"} 1244 Lbs/+25 lbs <BiLineChart />
          </Text>
          <Text>
            <Text span>
              Original {"=>"} 1000 lbs + 55 Lbs <BiLineChartDown />
            </Text>
          </Text>
        </Box>
      </Flex>
    </Container>
  );
}

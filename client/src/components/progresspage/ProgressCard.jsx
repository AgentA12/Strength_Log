import { FaWeightHanging } from "react-icons/fa";
import { Text, Card, Flex } from "@mantine/core";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function ProgressCard({ progressInfo, handleSummary }) {
  return (
    <div
      whileHover={{ translateY: -5, cursor: "pointer" }}
      onClick={() => handleSummary(progressInfo)}
    >
      <Card shadow="lg" withBorder p="sm" radius="md" sx={{ width: 275, marginBottom: 5 }}>
        <Flex direction="column" gap={5}>
          <Text fw={700} size={27}>
            {progressInfo.dateCompleted}
          </Text>
          <Flex gap={5} align="center">
            <FaWeightHanging />{" "}
            <Text>Total Weight: {progressInfo.totalWeight} (lbs)</Text>
          </Flex>

          <Flex gap={5} align="center">
            <Text>View Summary </Text>
            <AiOutlineArrowRight />
          </Flex>
        </Flex>
      </Card>
    </div>
  );
}

import { Flex, Title, Text } from "@mantine/core";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Flex
      mih={50}
      gap="xs"
      justify="center"
      align="center"
      direction="column"
      wrap="nowrap"
      mt={75}
    >
      <Title
        order={1}
        size={50}
        sx={(theme) => ({
          color: theme.colors.red[6],
        })}
      >
        404 Error!
      </Title>
      <Text size={25}>¯\_(ツ)_/¯</Text>
      <Text>The page your looking for does not exist.</Text>
      <Link to="/templates">
        <Text td="underline" sx={(theme) => ({color: theme.colors.blue[6]})}>Go back home</Text>
      </Link>
    </Flex>
  );
}

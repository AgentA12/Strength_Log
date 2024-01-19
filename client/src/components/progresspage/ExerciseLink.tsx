import { Text, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";

interface Props {
  exerciseName: string;
  size: "xs" | "sm" | "md" | "lg" | "xl"
}

export default function ExerciseLink(props: Props) {
  const { exerciseName, size = "md" } = props;

  const { primaryColor } = useMantineTheme();

  const style = {
    textDecoration: "underline",
    width: "fit-content",
  };

  return (
    <Text
    size={size}
      style={style}
      c={primaryColor}
      tt="capitalize"
      fw={700}
      component={Link}
      state={{
        activeTab: "exercises",
        exerciseName: exerciseName,
      }}
      to={`/Progress`}
    >
      {exerciseName}
    </Text>
  );
}

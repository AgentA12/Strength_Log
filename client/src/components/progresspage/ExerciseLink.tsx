import { Text, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";

interface Props {
  exerciseName: string;
}

export const ExerciseLink: React.FC<Props> = (props) => {
  const { exerciseName } = props;

  const { primaryColor } = useMantineTheme();

  const style = {
    textDecoration: "underline",
    width: "fit-content",
  };

  return (
    <Text
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
};

import { Text, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";

interface Props {
  createdAt: string;

  workoutID: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const DateLink: React.FC<Props> = (props) => {
  const { workoutID, createdAt, size } = props;

  const { primaryColor } = useMantineTheme();

  const styles = {
    textDecoration: "underline",
    cursor: "pointer",
    width: "fitContent",
    fontSize: "25px",
  };

  return (
    <Text
      state={{ activeTab: "compare"}}
      component={Link}
      style={styles}
      to={"/progress"}
      c={primaryColor}
      size={size ? size : "md"}
    >
      {new Date(parseInt(createdAt)).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })}
    </Text>
  );
};

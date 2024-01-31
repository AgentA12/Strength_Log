import { Text, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";

const styles = {
  textDecoration: "underline",
  cursor: "pointer",
  width: "fitContent",
  fontSize: "25px",
};

interface Props {
  templateName: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}
export default function TemplateProgressLink({ templateName, size }: Props) {
  const { primaryColor } = useMantineTheme();

  return (
    <Text
      component={Link}
      tt="capitalize"
      to={`/progress`}
      style={styles}
      c={`${primaryColor}.6`}
      size={size ? size : "xs"}
      state={{
        activeTab: "templates",
        templateName: templateName,
      }}
    >
      {templateName}
    </Text>
  );
}

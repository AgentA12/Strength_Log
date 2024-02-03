import { Group, Paper, Text, ThemeIcon, Box } from "@mantine/core";
import {
  IconArrowUpRight,
  IconArrowDownRight,
  IconEqual,
} from "@tabler/icons-react";
import classes from "./css/totalStatDisplay.module.css";

interface Props {
  title: string;
  value: number;
  previousValue: number;
  diff: number;
  unit?: string;
}

export default function TotalStatDisplay({
  title,
  value,
  previousValue,
  diff,
  unit,
}: Props) {
  const DiffIcon =
    diff > 0 ? IconArrowUpRight : diff === 0 ? IconEqual : IconArrowDownRight;

  function getProgressColor(value: number) {
    console.log(value);
    if (value > 0) return "green.6";
    if (value < 0) return "red.6";
    return "gray";
  }
  return (
    <Paper withBorder p="md"  miw={300} mah={120} key={title}>
      <Group justify="space-between">
        <Box>
          <Text c="dimmed" tt="uppercase" fw={600} className={classes.label}>
            {title}
          </Text>
          <Text fw={700} fz="xl">
            {value}
          </Text>
        </Box>

        <ThemeIcon
          style={{ justifySelf: "flex-start", alignSelf: "flex-start" }}
          variant="outline"
          color={getProgressColor(diff)}
          size={30}
        >
          <DiffIcon size="1.2rem" stroke={1.5} />
        </ThemeIcon>
      </Group>
      <Text span c="dimmed" fz="sm">
        {diff === 0 ? (
          <Text size="sm">No Change</Text>
        ) : (
          <>
            <Text component="span" c={getProgressColor(diff)} fw={700}>
              {diff > 0 ? "+" : null} {diff}
            </Text>{" "}
            {unit ? unit : null} compared to{" "}
            <Text fw={800} span>
              {previousValue} {unit || diff ? unit : null}
            </Text>{" "}
          </>
        )}
      </Text>
    </Paper>
  );
}

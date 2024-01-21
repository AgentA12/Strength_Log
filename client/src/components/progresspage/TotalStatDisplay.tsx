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
  unit: string;
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
    if (value > 0) return "green";
    if (value < 0) return "red";
    return "gray";
  }
  return (
    <Paper withBorder p="md" radius="md" key={title}>
      <Group justify="apart">
        <Box>
          <Text
            c="dimmed"
            tt="uppercase"
            fw={700}
            fz="xs"
            className={classes.label}
          >
            {title}
          </Text>
          <Text fw={700} fz="xl">
            {value}
          </Text>
        </Box>
        <ThemeIcon
          color="gray"
          variant="light"
          style={{
            color:
              diff > 0
                ? "var(--mantine-color-green-6)"
                : diff < 0
                ? "var(--mantine-color-red-6)"
                : "var(mantine-color-gray-6)",
          }}
          size={38}
          radius="md"
        >
          <DiffIcon size="1.2rem" stroke={1.5} />
        </ThemeIcon>
      </Group>
      <Text span c="dimmed" fz="sm">
        {diff === 0 ? (
          <Text>No Change</Text>
        ) : (
          <>
            <Text component="span" c={getProgressColor(diff)} fw={700}>
              {diff > 0 ? "+" : null} {diff}
            </Text>{" "}
            {unit ? unit : null} compared to{" "}
            <Text fw={800} span>
              {previousValue}
            </Text>{" "}
          </>
        )}
        {unit ? unit : null}
      </Text>
    </Paper>
  );
}

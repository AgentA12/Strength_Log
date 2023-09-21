import {
  createStyles,
  Paper,
  Text,
  Divider,
  rem,
  Flex,
  ScrollArea,
} from "@mantine/core";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
    width: 280,
    height: 225,
  },

  value: {
    fontSize: rem(24),
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

export default function StatsCard({ stat }) {
  const { classes } = useStyles();
  return (
    <Paper
      withBorder
      p="sm"
      shadow="lg"
      radius="md"
      key={stat.title}
      className={classes.root}
    >
      <Flex justify="space-between" align="center">
        <Text size="lg" className={classes.title}>
          {stat.title}
        </Text>
        <Text size="sm" color="dimmed">
          {stat.date}
        </Text>
      </Flex>
      <Divider />
      <Flex p={5} justify="space-between">
        <Flex direction="column" align="center">
          <Text>Total Volume</Text>
          <Divider w="90%" />
          <Text>{stat.totalVolume} Lbs</Text>
          <Text
            color={stat.diff > 0 ? "teal" : stat.diff === 0 ? "grey" : "red"}
            fz="sm"
            fw={500}
            className={classes.diff}
          >
            <Flex align="center" justify="flex-start">
              {stat.diff > 0 ? "+" : null}

              {stat.diff > 0 ? (
                <>
                  {stat.diff} lbs <BiTrendingUp size={18} />
                </>
              ) : stat.diff === 0 ? null : (
                <>
                  {stat.diff} Lbs <BiTrendingDown size={18} />
                </>
              )}
            </Flex>
          </Text>
        </Flex>
        <Flex direction="column" align="center">
          <Text>Personal Records</Text>
          <Divider w="90%" />
          <ScrollArea h={125} offsetScrollbars type="auto" scrollbarSize={8}>
            {stat.prs.length ? (
              stat.prs.map((prObj, i) => (
                <Flex
                  key={i}
                  direction="column"
                  justify="center"
                  align="center"
                >
                  <Text mb={-5}  fw={700}>
                    {prObj.exerciseName}
                  </Text>
                  <Text color="dimmed">
                    {prObj.sets} x {prObj.reps} {prObj.weight} lbs
                  </Text>
                </Flex>
              ))
            ) : (
              <Text color="dimmed" size="lg">
                Na
              </Text>
            )}
          </ScrollArea>
        </Flex>
      </Flex>
    </Paper>
  );
}

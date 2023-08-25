import {
  List,
  Modal,
  Select,
  Text,
  ThemeIcon,
  createStyles,
} from "@mantine/core";
import { TbBarbell } from "react-icons/tb";
import { MdCable, MdOutlineAirlineSeatFlatAngled } from "react-icons/md";
import { LiaDumbbellSolid } from "react-icons/lia";
import { GiBodyBalance } from "react-icons/gi";

const useStyles = createStyles((theme) => ({
  list: {
    borderRadius: 5,
    margin: 2,
    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
      cursor: "pointer"
    },
  },
}));

function getExerciseIcon(str) {
  switch (str) {
    case "barbell":
      return <TbBarbell />;
    case "dumbbell":
      return <LiaDumbbellSolid />;
    case "cable":
      return <MdCable />;
    case "machine":
      return <MdOutlineAirlineSeatFlatAngled />;
    case "bodyweight":
      return <GiBodyBalance />;
  }
}

export default function SelectExerciseModal({
  opened,
  close,
  addExercise,
  exercises,
}) {
  const { classes } = useStyles();

  return (
    <Modal title={<Text>Select Exercise</Text>} opened={opened} onClose={close}>
      <Select
        data={exercises}
        searchable
        onChange={(value) => addExercise(value)}
        placeholder="Select an exercise"
      />
      <List withPadding mt={10}>
        {exercises.map((e) => (
          <List.Item
            className={classes.list}
            onClick={() => addExercise(e.value)}
            p={5}
            icon={
              <ThemeIcon size={24} radius="xl">
                {getExerciseIcon(e.equipment)}
              </ThemeIcon>
            }
            key={e.id}
          >
            <Text fz={15} fw="bold">
              {" "}
              {e.label}
            </Text>
          </List.Item>
        ))}
      </List>
    </Modal>
  );
}

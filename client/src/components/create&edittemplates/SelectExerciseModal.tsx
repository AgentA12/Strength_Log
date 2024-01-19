import { List, Modal, Select, Text, ThemeIcon } from "@mantine/core";
import { TbBarbell } from "react-icons/tb";
import { MdCable, MdOutlineAirlineSeatFlatAngled } from "react-icons/md";
import { LiaDumbbellSolid } from "react-icons/lia";
import { GiBodyBalance } from "react-icons/gi";
import classes from "./templatedashboard.module.css";

function getExerciseIcon(str: string) {
  switch (str.toLowerCase()) {
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
    default:
      <TbBarbell />;
  }
}

interface Exerciseform {
  value: string;
  label: string;
  _id: string;
  equipment: string;
}

interface Exercise {
  exerciseName: String;
  _id: String;
  equipment: String;
}

interface Props {
  opened: boolean;
  close: () => void;
  addExercise: (value: string) => void;
  exercises: [Exercise];
}

export default function SelectExerciseModal({
  opened,
  close,
  addExercise,
  exercises,
}: Props) {
  return (
    <Modal
      title={<Text>Select an Exercise</Text>}
      opened={opened}
      onClose={close}
      size="md"
    >
      <Select
        mt={10}
        data={exercises.map((exercise: any) => exercise.value)}
        searchable
        onChange={(value) => {
          addExercise(value as string);
        }}
        placeholder="Search..."
      />

      <List withPadding mt={10}>
        {exercises.map((e: any) => (
          <List.Item
            onClick={() => addExercise(e.value)}
            p={5}
            icon={
              <ThemeIcon size={24} radius="xl">
                {getExerciseIcon(e.equipment)}
              </ThemeIcon>
            }
            className={classes.listStyles}
            key={e._id}
          >
            <Text fz={15} fw="bold">
              {e.label}
            </Text>
          </List.Item>
        ))}
      </List>
    </Modal>
  );
}

import {
  Highlight,
  List,
  Modal,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { TbBarbell } from "react-icons/tb";
import { MdCable, MdOutlineAirlineSeatFlatAngled } from "react-icons/md";
import { LiaDumbbellSolid } from "react-icons/lia";
import { GiBodyBalance } from "react-icons/gi";
import classes from "./css/templatedashboard.module.css";
import { useState } from "react";

interface Props {
  opened: boolean;
  close: () => void;
  addExercise: (value: string) => void;
  exercises: [Exercise];
}

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

interface Exercise {
  _id: string;
  equipment: string;
  value: string;
  label: string;
}

export default function SelectExerciseModal({
  opened,
  close,
  addExercise,
  exercises,
}: Props) {
  const [exercisesState, setExercises] = useState<Exercise[] | [Exercise]>(
    exercises ? exercises : []
  );
  const [searchState, setSearchState] = useState<string>("");

  function sortList(target: EventTarget) {
    if (target instanceof HTMLInputElement) {
      const result = exercises.filter((exercise: Exercise) =>
        exercise.value.includes(target.value.toString().toLowerCase().trim())
      );
      setSearchState(target.value);
      setExercises(result);
    }
  }
  return (
    <Modal
      title={<Text>Select an Exercise</Text>}
      opened={opened}
      onClose={() => {
        setExercises(exercises);
        close();
        setSearchState("");
      }}
      size="md"
      onChange={({ target }) => sortList(target)}
    >
      <TextInput
        data-autofocus
        value={searchState}
        mt={10}
        placeholder="Search..."
      />

      <List withPadding mt={10}>
        {exercisesState.map((e: any) => (
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
            <Highlight highlight={searchState} fz={15} fw="bold">
              {e.label}
            </Highlight>
          </List.Item>
        ))}
      </List>
    </Modal>
  );
}

import { Text, Accordion, Loader, Box } from "@mantine/core";
import { Exercise } from "../types/workoutState";
import { ExerciseTable } from "../components/progresspage";
import { v4 as uuidv4 } from "uuid";
import { TemplateShape } from "../types/template";
import TemplateProgressLink from "../components/universal/TemplateProgressLink";

interface ExerciseCompleted extends Exercise {
  savedOn: string;
  belongsTo: TemplateShape;
}

interface Props {
  activePage: number;
  exercises: ExerciseCompleted[][];
  openAll: boolean;
  isOpen: string[] | null;
  setIsOpen: React.Dispatch<React.SetStateAction<string[] | null>>;
}
export default function ExerciseList({
  exercises,
  activePage,
  openAll,
  isOpen,
  setIsOpen,
}: Props) {
  if (!exercises) return <Loader />;

  {
    return (
      <Accordion
        onChange={setIsOpen}
        variant="contained"
        multiple
        value={
          openAll && exercises.length
            ? exercises[activePage - 1].map((exercise) => exercise.savedOn)
            : isOpen
            ? isOpen
            : []
        }
      >
        {exercises.length ? (
          exercises[activePage - 1].map((exercise: ExerciseCompleted) => (
            <Accordion.Item key={exercise._id} value={exercise.savedOn}>
              <Accordion.Control>
                <Text tt="capitalize" fw={600} size="sm">
                  {new Date(parseInt(exercise.savedOn)).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    }
                  )}
                </Text>
                <TemplateProgressLink
                  size="sm"
                  templateName={exercise.belongsTo.templateName}
                />
              </Accordion.Control>
              <Accordion.Panel>
                <ExerciseSection exercise={exercise} />
              </Accordion.Panel>
            </Accordion.Item>
          ))
        ) : (
          <Text ta="center" size="xl" fw={500}>
            You have not saved any exercises yet
          </Text>
        )}
      </Accordion>
    );
  }
}

function ExerciseSection({ exercise }: any) {
  return (
    <Box key={uuidv4()} style={{ maxWidth: "800px" }}>
      <ExerciseTable exercise={exercise} />
    </Box>
  );
}

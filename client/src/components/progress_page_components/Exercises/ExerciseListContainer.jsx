import { Text } from "@mantine/core";

export const ExerciseListContainer = ({ templates }) => {
  return (
    <div className="p-5">
      {templates.length ? (
        <ul className="list-none">
          {templates[0].exercises.map((exercise) => (
            <li key={exercise._id} className="">
              <Text className="mb-1" tt="capitalize" fz="lg">
                {exercise.exerciseName}
              </Text>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not saved any workouts &#128169;</p>
      )}
    </div>
  );
};

import { ExerciseShape } from "./template";

export interface Exercise extends ExerciseShape {
  completed: boolean;

}

export interface WorkoutState {
  exercises: Exercise[];
  timeToComplete: null | number;
  templateId: string;
  templateName: string;
  workoutFinished: boolean;
}
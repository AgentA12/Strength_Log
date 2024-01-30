import { TemplateShape } from "./template";

export interface CompareWorkout {
    originalTemplate: TemplateShape;
    hasLatterWorkout: boolean;
    latterWorkout: Workout;
    formerWorkout: Workout;
  }
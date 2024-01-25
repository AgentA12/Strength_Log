import { TemplateShape } from "./template";
import { Workout } from "./workout";

export interface CompareWorkout {
    originalTemplate: TemplateShape;
    hasLatterWorkout: boolean;
    latterWorkout: Workout;
    formerWorkout: Workout;
  }
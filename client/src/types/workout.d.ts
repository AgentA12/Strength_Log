import { TemplateShape } from "./template";
import { ExerciseShape } from "./template";

export interface Workout {
    createdAt: string;
    _id: string;
    exercises: ExerciseShape[];
    template: TemplateShape;
  }
  
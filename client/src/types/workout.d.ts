import { TemplateShape } from "./template";
import { ExerciseShape } from "./template";

export interface Workout {
    createdAt: number;
    _id: string;
    exercises: ExerciseShape[];
    template: TemplateShape;
  }
  
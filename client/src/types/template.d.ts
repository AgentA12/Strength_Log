interface ExerciseDetailsShape {
  exerciseName: string;
  equipment: string;
  isUserCreated: boolean;
  _id: string;
}

interface SetShape {
  weight: number;
  reps: number;
}

interface ExerciseShape   {
  restTime: number;
  sets: SetShape[];
  exercise: ExerciseDetailsShape
}

export interface TemplateShape {
  exercises: ExerciseShape[];
  templateName: string;
  templateNotes: string;
  _id: string;
}

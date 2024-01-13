interface ExerciseDetailsShape {
  exerciseName: string;
  equipment: string;
  _id: string;
}

interface SetShape {
  weight: number;
  reps: number;
}

interface ExerciseShape {
  exercise: ExerciseDetailsShape;
  restTime: number;
  sets: [SetShape];
}

export interface TemplateShape {
  exercises: [ExerciseShape];
  templateName: string;
  templateNotes: string;
  _id: string;
}

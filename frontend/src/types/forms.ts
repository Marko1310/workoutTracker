import { z } from 'zod';

export const AddNewProgramSchema = z.object({
  title: z.string().min(1, 'Please provide a valid Program title'),
  days: z.number().min(1, 'Please provide a valid number of days for Program'),
});
export type AddNewProgramDto = z.infer<typeof AddNewProgramSchema>;

const ExerciseSchema = z.object({
  title: z.string().min(1, 'Please provide a valid Exercise title'),
  goalSets: z.number().min(1, 'Please provide a valid Sets number'),
  goalReps: z.number().min(1, 'Please provide a valid Reps number '),
});
const ExerciseArraySchema = z.array(ExerciseSchema);
export const AddNewWorkoutSchema = z.object({
  title: z.string().min(1, 'Please provide a valid Workout title'),
  exercises: ExerciseArraySchema,
});
export type AddNewWorkoutDto = z.infer<typeof AddNewWorkoutSchema>;

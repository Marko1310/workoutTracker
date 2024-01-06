import { z } from 'zod';

const SetSchema = z.object({
  previousWeight: z.number().nullable(),
  previousReps: z.number().nullable(),
  weight: z.number().nullable(),
  reps: z.number().nullable(),
});
export type setDto = z.infer<typeof SetSchema>;

const SetArraySchema = z.array(SetSchema);
export type setArrayDto = z.infer<typeof SetArraySchema>;

const AddNewSessionSchema = z.object({
  exerciseId: z.number(),
  exercise_name: z.string(),
  sets: SetArraySchema,
});
export type addNewSessionDto = z.infer<typeof AddNewSessionSchema>;

const AddNewSessionArraySchema = z.object({
  exercisesData: z.array(AddNewSessionSchema),
});
export type addNewSessionArrayDto = z.infer<typeof AddNewSessionArraySchema>;

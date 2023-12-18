import { z } from 'zod';

const ProgramSchema = z.object({
  days: z.number(),
  id: z.number(),
  workout_split_name: z.string(),
});

export type ProgramDto = z.infer<typeof ProgramSchema>;

const WorkoutSchema = z.object({
  id: z.number(),
  workout_name: z.string(),
});

export type WorkoutDto = z.infer<typeof WorkoutSchema>;

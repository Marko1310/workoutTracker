import { z } from 'zod';

const ProgramSchema = z.object({
  days: z.number(),
  programs_id: z.number(),
  programs_name: z.string(),
});
export type ProgramDto = z.infer<typeof ProgramSchema>;

const WorkoutSchema = z.object({
  workouts_id: z.number(),
  workout_name: z.string(),
});
export type WorkoutDto = z.infer<typeof WorkoutSchema>;

const sessionSchema = z.object({
  sessions_id: z.number(),
  set: z.number(),
  weight: z.number(),
  reps: z.number(),
  week: z.number(),
});
const sessionsDataSchema = z.array(sessionSchema);
const exerciseDetailsSchema = z.object({
  exercises_id: z.number(),
  exercise_name: z.string(),
  goal_sets: z.number(),
  goal_reps: z.number(),
  sessions: sessionsDataSchema,
});
const exercisesArraySchema = z.array(exerciseDetailsSchema);
export type exercisesArrayDto = z.infer<typeof exercisesArraySchema>;

const previousWorkoutSchema = z.object({
  workouts: WorkoutSchema,
  week: z.number(),
});
export type previousWorkoutDto = z.infer<typeof previousWorkoutSchema>;

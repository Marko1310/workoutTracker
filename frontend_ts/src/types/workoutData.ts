import { z } from 'zod';

const WorkoutSchema = z.object({
  workouts_id: z.number(),
  workout_name: z.string(),
});
export type WorkoutDto = z.infer<typeof WorkoutSchema>;

const ProgramSchema = z.object({
  days: z.number(),
  programs_id: z.number(),
  programs_name: z.string(),
  workouts: z.array(WorkoutSchema),
});
export type ProgramDto = z.infer<typeof ProgramSchema>;

const AllProgramSchema = z.array(ProgramSchema);
export type AllProgramsDto = z.infer<typeof AllProgramSchema>;

const sessionSchema = z.object({
  sessions_id: z.number(),
  set: z.number(),
  weight: z.number(),
  reps: z.number(),
  week: z.number(),
});
const SessionsDataSchema = z.array(sessionSchema);
export type sessionDataDto = z.infer<typeof SessionsDataSchema>;

const exerciseDetailsSchema = z.object({
  exercises_id: z.number(),
  exercise_name: z.string(),
  goal_sets: z.number(),
  goal_reps: z.number(),
  sessions: SessionsDataSchema.optional(),
});
export type exerciseDetailDto = z.infer<typeof exerciseDetailsSchema>;
const exercisesArraySchema = z.array(exerciseDetailsSchema);
export type exercisesArrayDto = z.infer<typeof exercisesArraySchema>;

const NewSetSchema = z.array(
  z.object({
    reps: z.number(),
    set: z.number(),
    weight: z.number(),
  }),
);
export type newSetSDto = z.infer<typeof NewSetSchema>;

export type ExerciseSets = z.infer<
  typeof SessionsDataSchema | typeof NewSetSchema
>;

const previousWorkoutSchema = z.object({
  workouts: WorkoutSchema,
  week: z.number(),
});
export type previousWorkoutDto = z.infer<typeof previousWorkoutSchema>;

const workoutLogSchema = z.object({
  createDateTime: z.string(),
  lastChangedDateTime: z.string(),
  week: z.number(),
  workouts_log_id: z.number(),
});
const workoutLogArraySchema = z.array(workoutLogSchema);
export type workoutLogDto = z.infer<typeof workoutLogArraySchema>;

const previousWorkoutDetailsSchema = z.object({
  workout_name: z.string(),
  workouts_id: z.number(),
  week: z.number().optional(),
  exercises: exercisesArraySchema,
});
export type previousWorkoutDetailsDto = z.infer<
  typeof previousWorkoutDetailsSchema
>;

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
type sessionDto = z.infer<typeof sessionSchema>;
const SessionsArraySchema = z.array(sessionSchema);
export type sessionArrayDto = z.infer<typeof SessionsArraySchema>;

const exerciseDetailsSchema = z.object({
  exercises_id: z.number(),
  exercise_name: z.string(),
  goal_sets: z.number(),
  goal_reps: z.number(),
  sessions: SessionsArraySchema.optional(),
});
export type exerciseDetailDto = z.infer<typeof exerciseDetailsSchema>;
const exercisesArraySchema = z.array(exerciseDetailsSchema);
export type exercisesArrayDto = z.infer<typeof exercisesArraySchema>;

const NewSetSchema = z.object({
  reps: z.number(),
  set: z.number(),
  weight: z.number(),
});
type newSetDto = z.infer<typeof NewSetSchema>;
const newSetArraySchema = z.array(NewSetSchema);
export type newSetArryDto = z.infer<typeof newSetArraySchema>;

export type ExerciseSetsDto = sessionDto | newSetDto;
export type ExerciseSetsArrayDto = sessionArrayDto | newSetArryDto;

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

const WorkoutLogsByWeekSchema = z.object({
  date: z.string(),
  count: z.number(),
});
const workoutLogByWeekArraySchema = z.array(WorkoutLogsByWeekSchema);
export type workoutLogsByWeekDto = z.infer<typeof workoutLogByWeekArraySchema>;

const previousWorkoutDetailsSchema = z.object({
  workout_name: z.string(),
  workouts_id: z.number(),
  week: z.number().optional(),
  exercises: exercisesArraySchema,
});
export type previousWorkoutDetailsDto = z.infer<
  typeof previousWorkoutDetailsSchema
>;

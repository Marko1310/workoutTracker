import { z } from 'zod';

export const AddNewProgramSchema = z.object({
  title: z.string().min(1, 'Please provide a valid Program title'),
  days: z.number().min(1, 'Please provide a valid number of days for Program'),
});
export type AddNewProgramDto = z.infer<typeof AddNewProgramSchema>;

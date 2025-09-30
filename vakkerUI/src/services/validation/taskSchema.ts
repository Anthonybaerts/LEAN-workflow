import { z } from 'zod';
import { nlMessages } from './messages';

function isTime(value: string): boolean {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
}

export const taskSchema = z
  .object({
    clientId: z.string().min(1, nlMessages.required),
    date: z.string().min(1, nlMessages.required),
    startAt: z
      .string()
      .min(1, nlMessages.required)
      .refine((v) => isTime(v), nlMessages.time),
    endAt: z
      .string()
      .min(1, nlMessages.required)
      .refine((v) => isTime(v), nlMessages.time),
    type: z.string().min(1, nlMessages.required),
    description: z.string().optional().or(z.literal('')),
  })
  .refine(
    ({ startAt, endAt }) => {
      // Compare HH:mm lexicographically works for 24h format
      return startAt < endAt;
    },
    { message: nlMessages.endAfterStart, path: ['endAt'] }
  );

export type TaskSchema = z.infer<typeof taskSchema>;



import { z } from 'zod';
import { nlMessages } from './messages';

export const clientSchema = z.object({
  type: z.enum(['Zakelijk', 'Particulier']),
  name: z.string().min(1, nlMessages.required),
  email: z.string().email(nlMessages.email).optional().or(z.literal('')),
  phone: z.string().min(10, nlMessages.minLength(10)).optional().or(z.literal('')),
  addressLine: z.string().min(1, nlMessages.required),
  postalCode: z.string().optional().or(z.literal('')),
  city: z.string().optional().or(z.literal('')),
  notes: z.string().optional().or(z.literal('')),
});

export type ClientSchema = z.infer<typeof clientSchema>;



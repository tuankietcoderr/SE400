import {z} from 'zod';

export const loginValidator = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginValidatorType = z.infer<typeof loginValidator>;

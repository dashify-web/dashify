import { z } from 'zod';

export enum LoginType {
  SIGNIN = 'SIGNIN',
  SIGNUP = 'SIGNUP',
}

export const LoginFormSchema = z
  .object({
    type: z.enum([LoginType.SIGNIN, LoginType.SIGNUP]),
    username: z.string().min(1),
    password: z.string().min(8),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) =>
      data.type !== LoginType.SIGNUP || data.confirmPassword === data.password,
    { message: 'Passwords must match', path: ['confirmPassword'] }
  );

export type LoginFormType = z.infer<typeof LoginFormSchema>;

import { z } from 'zod'

export const loginSchema = z.strictObject({
  email: z.email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters long'),
})

export type LoginFormData = z.infer<typeof loginSchema>

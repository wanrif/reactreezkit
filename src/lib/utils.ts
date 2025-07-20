import type { AnyFieldApi } from '@tanstack/react-form'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validationErrors = (field: AnyFieldApi) => {
  const result =
    field.state.meta.isTouched &&
    !field.state.meta.isValid &&
    field.state.meta.errors[0].message

  return result
}

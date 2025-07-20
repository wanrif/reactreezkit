import type { InputHTMLAttributes } from 'react'

import { Input } from './Input'

interface FieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'name' | 'value' | 'onChange' | 'onBlur'
  > {
  name: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
  label?: string
  description?: string
}

export function Field({
  name,
  value,
  onChange,
  onBlur,
  error,
  label,
  description,
  ...props
}: FieldProps) {
  return (
    <Input
      id={name}
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={(e) => onChange(e.target.value)}
      error={error}
      label={label}
      description={description}
      {...props}
    />
  )
}

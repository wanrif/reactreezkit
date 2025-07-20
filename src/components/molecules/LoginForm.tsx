import { useState } from 'react'

import { Button, Field } from '@components/atoms'
import { validationErrors } from '@lib/utils'
import { type LoginFormData, loginSchema } from '@lib/validations'
import { useForm } from '@tanstack/react-form'
import { Link } from '@tanstack/react-router'

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as LoginFormData,
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const validatedData = loginSchema.parse(value)
        console.log('Login attempt:', validatedData)
        await new Promise((resolve) => setTimeout(resolve, 1500))
      } catch (error) {
        console.error('Validation error:', error)
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="flex flex-col gap-y-4"
    >
      <form.Field
        name="email"
        children={(field) => {
          return (
            <Field
              name={field.name}
              value={field.state.value}
              onChange={field.handleChange}
              error={validationErrors(field)}
              label="Email address"
              type="email"
              placeholder="Enter your email"
              required
            />
          )
        }}
      />

      <div className="flex flex-col gap-y-2">
        <form.Field
          name="password"
          children={(field) => {
            return (
              <Field
                name={field.name}
                value={field.state.value}
                onChange={field.handleChange}
                error={validationErrors(field)}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                required
              />
            )
          }}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex cursor-pointer items-center space-x-2">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-indigo-600"
            />
            <span className="text-gray-600 dark:text-gray-400">
              Show password
            </span>
          </label>

          <Link
            to="."
            className="font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <form.Subscribe
        selector={(state) => [
          state.canSubmit,
          state.isSubmitting,
          state.isDirty,
        ]}
        children={([canSubmit, isSubmitting, isDirty]) => (
          <Button
            type="submit"
            className="w-full"
            size="md"
            loading={isSubmitting}
            disabled={!canSubmit || !isDirty}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        )}
      />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" type="button">
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </Button>

        <Button variant="outline" type="button">
          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </Button>
      </div>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?{' '}
        <a
          href="#"
          className="font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Sign up for free
        </a>
      </p>
    </form>
  )
}

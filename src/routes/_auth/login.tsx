import { LoginForm } from '@components/molecules'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="mb-8 text-center">
        <Link
          to="/"
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <span className="text-lg font-bold text-white">R</span>
        </Link>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Reactreezkit
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back! Please sign in to continue
        </p>
      </div>
      <LoginForm />
    </>
  )
}

import { MainLayout } from '@components/layouts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app')({
  component: () => <MainLayout />,
})

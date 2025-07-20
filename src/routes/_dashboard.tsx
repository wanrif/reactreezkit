import { DashboardLayout } from '@components/layouts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DashboardLayout />
}

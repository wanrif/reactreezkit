import clientApi from '@services/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/')({
  component: Index,
})

function Index() {
  const { isPending, error } = useQuery({
    queryKey: ['ping'],
    queryFn: async () => await clientApi.ping(),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error?.message

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}

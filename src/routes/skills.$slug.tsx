import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/skills/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/skills/$slug"!</div>
}

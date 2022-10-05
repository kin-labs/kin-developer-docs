import { DocsNavCard } from './DocsNavCard'

export const DocsKineticManager: React.FC = () => {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <DocsNavCard
        title="Configure Kinetic"
        subtitle="Use Kinetic Manager to configure your self-hosted Kinetic instance"
        svgFile="screwdriver-wrench-solid"
        link={{ url: '/docs/developers/kinetic-manager', label: 'Time to tinker...' }}
      />
    </div>
  )
}

import { FC } from 'react'
import { DocsNavCard } from './DocsNavCard'

export const DocsKineticManager: FC = () => {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <DocsNavCard
        title="Kinetic Manager"
        subtitle="Use Kinetic Manager to configure your Kinetic instance, view logs and transactions, etc"
        svgFile="screwdriver-wrench-solid"
        link={{ url: '/docs/kinetic/kinetic-configuration#kinetic-manager', label: 'Time to tinker...' }}
      />
    </div>
  )
}

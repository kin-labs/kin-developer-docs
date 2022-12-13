import { FC } from 'react'
import { DocsNavCard } from './DocsNavCard'

export const DocsUseCases: FC = ({}) => {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <DocsNavCard
        title="Use Cases"
        subtitle="See some of the common ways Kin is used in our partner apps."
        svgFile="diagram-project-solid"
        link={{ url: '/docs/use-cases', label: 'Learn more' }}
      />
    </div>
  )
}

import { DocsNavCard } from './DocsNavCard'

export const DocsBestPractices: React.FC = () => {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <DocsNavCard
        title="Best Practices"
        subtitle="Some key information you'll want to keep in mind as you develop your App"
        svgFile="rainbow-solid"
        link={{ url: '/docs/essentials/best-practices', label: 'Check them out' }}
      />
    </div>
  )
}

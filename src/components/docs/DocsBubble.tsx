import { DocsNavCard } from './DocsNavCard'

export const DocsBubble: React.FC = () => {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <DocsNavCard
        title="Bubble"
        subtitle="Bubble is a No-Code development platform, that lets non-developers build feature-rich applications.+"
        pngFile="bubble"
        link={{ url: 'https://bubble.io', label: 'Start Bubbling...' }}
      />
    </div>
  )
}

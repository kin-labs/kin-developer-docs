import { DocsNavCard } from './DocsNavCard'

export const DocsAgora: React.FC = () => {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <DocsNavCard
        title="Agora"
        subtitle="Prior to the release of Kinetic, our Kin SDKs were powered by a now-deprecated technology called Agora. Check out our old docs site if you want to see more."
        icon="github"
        link={{ url: 'https://github.com/kin-labs/kin-developer-docs-agora', label: 'See the Agora Docs' }}
      />
    </div>
  )
}

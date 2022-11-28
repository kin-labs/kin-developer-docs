import { FC } from 'react'
import { DocsNavCard } from './DocsNavCard'

export const DocsAgora: FC<{ migrate?: boolean }> = ({ migrate = false }) => {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      {migrate ? (
        <DocsNavCard
          title="Upgrading to Kinetic"
          subtitle="Here's some extra info that will help you complete your upgrade."
          svgFile="kin"
          link={{ url: '/docs/developers/kinetic-migration', label: 'Check it out' }}
        />
      ) : null}
      <DocsNavCard
        title="Agora"
        subtitle="Prior to the release of Kinetic, our Kin SDKs were powered by a now-deprecated technology called Agora. Check out our old docs site if you want to see more."
        icon="github"
        link={{ url: 'https://github.com/kin-labs/kin-developer-docs-agora', label: 'See the Agora Docs' }}
      />
    </div>
  )
}

import { DocsNavCard } from './DocsNavCard'

export const DocsHelp: React.FC<{ discord?: boolean }> = ({ discord = false }) => {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      {!discord ? (
        <DocsNavCard
          title="Getting Help"
          subtitle="Stuck? No problem, we have an amazing community waiting to help out."
          svgFile="circle-question-regular"
          link={{ url: '/docs/essentials/getting-help', label: 'Get help!' }}
        />
      ) : null}
      <DocsNavCard
        title="Developer Discord"
        subtitle="Join our fantastic developer community."
        icon="discord"
        link={{ url: 'https://discord.com/invite/kdRyUNmHDn', label: 'Join now' }}
      />
    </div>
  )
}

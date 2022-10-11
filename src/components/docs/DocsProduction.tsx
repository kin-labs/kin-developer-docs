import { DocsNavCard } from './DocsNavCard'

export const DocsProduction: React.FC = () => {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <DocsNavCard
        title="Production"
        subtitle="Get your app ready and running on the Solana Mainnet so you can earn Kin via the KRE"
        svgFile="coins-solid"
        link={{ url: '/docs/developers/kinetic-in-production', label: 'See more' }}
      />
    </div>
  )
}

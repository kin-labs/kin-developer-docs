import { DocsNavCard } from './DocsNavCard'

export const DocsKRE: React.FC<{ catalyst?: boolean }> = ({ catalyst = false }) => {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <DocsNavCard
        title="Kin Rewards Engine"
        subtitle="Earn Kin by using it in your App"
        svgFile="money-bill-trend-up-solid"
        link={{ url: '/docs/essentials/kin-rewards-engine', label: 'See more' }}
      />
      {catalyst ? (
        <DocsNavCard
          title="Kin Catalyst Fund"
          subtitle="Grants! Kin offers a range of grants to help great ideas become reality."
          svgFile="sack-dollar-solid"
          link={{ url: 'https://kin.org/catalyst-fund/', label: 'Apply here' }}
        />
      ) : null}
    </div>
  )
}

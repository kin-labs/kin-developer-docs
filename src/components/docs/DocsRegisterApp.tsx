import { DocsNavCard } from './DocsNavCard'

export const DocsRegisterApp: React.FC = () => {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <DocsNavCard
        title="Register Your App"
        subtitle="Register your App on the Kin Developer Portal"
        svgFile="address-card-solid"
        link={{ url: '/docs/essentials/kre-app-registration', label: 'See how' }}
      />
    </div>
  )
}

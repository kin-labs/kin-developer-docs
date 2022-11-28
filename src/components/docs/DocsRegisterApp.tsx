import { FC } from 'react'
import { DocsNavCard } from './DocsNavCard'

export const DocsRegisterApp: FC = () => {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <DocsNavCard
        title="Register Your App"
        subtitle="Learn how to register your app on the Kin Developer Portal"
        svgFile="address-card-solid"
        link={{ url: '/docs/essentials/kre-app-registration', label: 'See how' }}
      />
      <DocsNavCard
        title="Kin Dev Portal"
        subtitle="Go straight to the Kin Developer Portal and get started"
        svgFile="kin"
        link={{ url: 'https://portal.kin.org', label: 'Go now!' }}
      />
    </div>
  )
}

import { FC, useState } from 'react'
import { DocsNavCard as NavCard } from '../docs/DocsNavCard'
import { Heading } from '../landing-page/Heading'
import { Paragraph } from '../landing-page/Paragraph'

const content = {
  heading: 'Kinetic Demo',
  image: '/images/logos/kin-circle-white.svg',
}

export const KinDemo: FC = () => {
  const [start, setStart] = useState(false)
  return (
    <div className="mb-12 w-full space-y-12 px-2 pt-8 md:space-y-20 md:pt-16 lg:px-0 lg:pt-20">
      <div className="my-10 mx-auto mb-0 flex max-w-5xl flex-col space-y-12 px-3">
        <div className="mx-auto flex w-auto">
          <img style={{ height: 'auto', width: '20%' }} className="mx-auto" src={content.image} />
        </div>
        <div className="mx-auto w-auto">
          <Heading level={1}>{content.heading}</Heading>
        </div>
      </div>
      <div className="my-10 mx-auto mb-0 max-w-5xl space-y-12 px-3">
        <NavCard
          hero
          useCase
          title="Kin Essentials"
          subtitle="Earn via the Kin Rewards Engine. Build with best in class No-Code and SDK tools."
          svgFile="kin-circle-white"
        />
        <NavCard
          hero
          title="Use Cases"
          subtitle="See how our top earning apps use Kin to their advantage."
          svgFile="kin-circle-white"
          link={{ url: '/docs/use-cases', label: 'See more' }}
        />
        <div className=" mx-auto my-0 grid w-full max-w-5xl gap-6 md:grid-cols-2">
          <NavCard
            hero
            title="Love Coding? Use our SDKs"
            subtitle="Harness the power of Kin with our range of SDKs."
            svgFile="kin-circle-white"
            link={{ url: '/docs/developers', label: 'See more' }}
          />
          <NavCard
            hero
            title="Not a Dev? No Problem."
            subtitle="Build powerful Apps with no coding experience."
            svgFile="kin-circle-white"
            link={{ url: '/docs/non-developers', label: 'See more' }}
          />
        </div>
        <NavCard
          hero
          title="Integrations"
          subtitle="Easily power-up your App with these amazing integrations."
          svgFile="kin-circle-white"
          link={{ url: '/docs/integrations', label: 'See more' }}
        />
      </div>
    </div>
  )
}

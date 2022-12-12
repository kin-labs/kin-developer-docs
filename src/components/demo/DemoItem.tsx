import { KineticSdk } from '@kin-kinetic/sdk'
import { Keypair } from '@kin-kinetic/keypair'
import { FC } from 'react'
import { DocsNavCard } from '../docs/DocsNavCard'

export const DemoItem: FC<{
  title: string
  subtitle: string
  current: boolean
  moveOn?: () => void
  kineticClient?: KineticSdk
  setKineticClient?: (kineticClient: KineticSdk) => void
  keypair?: Keypair
  setKeypair?: (keypair: Keypair) => void
  Component: FC<{
    current: boolean
    moveOn?: () => void
    kineticClient?: KineticSdk
    setKineticClient?: (kineticClient: KineticSdk) => void
    keypair?: Keypair
    setKeypair?: (keypair: Keypair) => void
  }>
}> = ({ title, subtitle, current, moveOn, kineticClient, setKineticClient, keypair, setKeypair, Component }) => {
  return (
    <div className="solid m-0 mb-1 w-full space-y-12 px-2 pt-0 md:space-y-20 lg:px-0" id={title}>
      <div className="my-0 mx-auto mb-0 flex max-w-5xl flex-col space-y-12 px-3">
        <div className="my-auto flex flex-grow flex-col">
          <DocsNavCard title={title} svgFile="kin" largeIcon subtitle={subtitle} fullWidth>
            <Component
              current={current}
              moveOn={moveOn}
              kineticClient={kineticClient}
              setKineticClient={setKineticClient}
              keypair={keypair}
              setKeypair={setKeypair}
            />
          </DocsNavCard>
        </div>
      </div>
    </div>
  )
}

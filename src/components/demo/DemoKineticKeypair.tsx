import { FC, useState, useEffect } from 'react'
import { KineticSdk } from '@kin-kinetic/sdk'

import { Button } from '../common/Button'
import { setupKineticClient } from './kinetic'

export const DemoKineticKeypair: FC<{ moveOn: () => void; current: boolean }> = ({ moveOn, current }) => {
  const [error, setError] = useState(false)
  const [kineticClient, setKineticClient] = useState<KineticSdk | null>(null)
  console.log('🚀 ~ kineticClient', kineticClient)

  useEffect(() => {
    if (current) {
      setupKineticClient(setKineticClient, setError)
    }
  }, [current])

  const onSuccess = (kineticClient: KineticSdk) => {
    if (moveOn) {
      moveOn()
    }
    setKineticClient(kineticClient)
  }

  return (
    <>
      <div className="m-0 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0 ">
        <Button label="Connect" action={() => setupKineticClient(onSuccess, setError)} />
        {error ? <div>Something went wrong. Please try again.</div> : null}
      </div>
      {kineticClient?.config ? (
        <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`Great! You are connected to Kinetic on ${kineticClient.sdkConfig.environment}.`}</p>
      ) : null}
    </>
  )
}

import { FC, useState } from 'react'
import { KineticSdk } from '@kin-kinetic/sdk'

import { Button } from '../common/Button'
import { setupKineticClient } from './kinetic'

export const DemoKineticConnect: FC<{
  moveOn: () => void
  kineticClient: KineticSdk
  setKineticClient: (kineticClient: KineticSdk) => void
}> = ({ moveOn, kineticClient, setKineticClient }) => {
  const [error, setError] = useState(false)

  const onSuccess = (kineticClient: KineticSdk) => {
    setKineticClient(kineticClient)
    if (moveOn) {
      moveOn()
    }
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

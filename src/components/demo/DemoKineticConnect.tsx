import { FC, useState } from 'react'
import { KineticSdk } from '@kin-kinetic/sdk'

import { Button } from '../common/Button'
import { setupKineticClient } from './kinetic'

export const DemoKineticConnect: FC<{
  moveOn: () => void
  current: boolean
  kineticClient: KineticSdk
  setKineticClient: (kineticClient: KineticSdk) => void
}> = ({ moveOn, current, kineticClient, setKineticClient }) => {
  const [error, setError] = useState(false)

  const onFailure = () => {
    setError(true)
  }

  const onSuccess = (kineticClient: KineticSdk) => {
    setKineticClient(kineticClient)
    if (moveOn) {
      moveOn()
    }
  }

  return (
    <>
      <div className="m-0 w-full px-2 pt-0 pb-3  lg:px-0 ">
        {!kineticClient && current ? (
          <Button label="Connect" action={() => setupKineticClient(onSuccess, onFailure)} />
        ) : null}
        {error ? <div>Something went wrong. Please try again.</div> : null}
      </div>
      {kineticClient?.config ? (
        <div className="m-0 w-full px-2 pt-0 pb-3  lg:px-0 ">{`Great! You are connected to Kinetic on ${kineticClient.sdkConfig.environment}.`}</div>
      ) : null}
    </>
  )
}

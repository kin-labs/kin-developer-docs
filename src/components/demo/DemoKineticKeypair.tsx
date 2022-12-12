import { FC, useState } from 'react'
import { KineticSdk } from '@kin-kinetic/sdk'
import { Keypair } from '@kin-kinetic/keypair'

import { Button } from '../common/Button'
import { createKeypair } from './kinetic'

export const DemoKineticKeypair: FC<{
  moveOn: () => void
  current: boolean
  kineticClient: KineticSdk
  keypair: Keypair
  setKeypair: (keypair: Keypair) => void
}> = ({ moveOn, current, kineticClient, keypair, setKeypair }) => {
  const [error, setError] = useState(false)

  const onFailure = () => {
    setError(true)
  }

  const onSuccess = (keypair: Keypair) => {
    setError(false)
    setKeypair(keypair)
    if (moveOn) {
      moveOn()
    }
  }

  return (
    <>
      <div className="m-0 w-full px-2 pt-0 pb-3  lg:px-0 ">
        {kineticClient && !keypair && current ? (
          <Button label="Create" action={() => createKeypair(onSuccess, onFailure)} />
        ) : null}
      </div>
      {error ? (
        <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`Something went wrong. Please try again.`}</p>
      ) : null}
      {!kineticClient && current ? (
        <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`You aren't connected to Kinetic`}</p>
      ) : null}
      {keypair ? (
        <>
          <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`Great! You've created your Keypair:`}</p>
          <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`Public Key: ${keypair.publicKey}`}</p>
          <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`Mnemonic: ${keypair.mnemonic}`}</p>
        </>
      ) : null}
    </>
  )
}

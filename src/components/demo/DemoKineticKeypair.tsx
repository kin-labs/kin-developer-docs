import { FC, useState } from 'react'
import { KineticSdk } from '@kin-kinetic/sdk'
import { Keypair } from '@kin-kinetic/keypair'

import { Button } from '../common/Button'
import { createKeypair, openExplorer } from './kinetic'

export const DemoKineticKeypair: FC<{
  moveOn: () => void
  current: boolean
  kineticClient: KineticSdk
  keypair: Keypair
  setKeypair: (keypair: Keypair) => void
  mnemonic?: string
}> = ({ moveOn, current, kineticClient, keypair, setKeypair, mnemonic }) => {
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
      <div className="m-0 w-full pt-0 pb-3">
        {kineticClient && !keypair && current ? (
          <Button label="Set Up" action={() => createKeypair(onSuccess, onFailure, mnemonic)} />
        ) : null}
      </div>
      {error ? (
        <p className="m-0 mt-1 w-full space-y-12 pt-0 pb-3 md:space-y-20">{`Something went wrong. Please try again.`}</p>
      ) : null}
      {!kineticClient && current ? (
        <p className="m-0 mt-1 w-full space-y-12 pt-0 pb-3 md:space-y-20">{`You aren't connected to Kinetic`}</p>
      ) : null}
      {keypair ? (
        <>
          <p className="m-0 mt-1 w-full space-y-12  pt-0 pb-3 md:space-y-20">{`Great! You've created your Keypair:`}</p>
          <p className="m-0 mt-1 w-full space-y-12 break-all pt-0 pb-3 md:space-y-20">{`Public Key: ${keypair.publicKey}`}</p>
          <p className="m-0 mt-1 w-full space-y-12  pt-0 pb-3 md:space-y-20">{`Mnemonic: ${keypair.mnemonic}`}</p>
        </>
      ) : null}

      {keypair && mnemonic ? (
        <div className="flex w-full">
          <span className="mr-2">
            <Button label="See the account" action={() => openExplorer({ accountBalance: keypair.publicKey })} />
          </span>
        </div>
      ) : null}
    </>
  )
}

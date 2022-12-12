import { FC, useState, useEffect } from 'react'
import { KineticSdk } from '@kin-kinetic/sdk'
import { Keypair } from '@kin-kinetic/keypair'

import { Button } from '../common/Button'
import { createAccount, openExplorer } from './kinetic'

export const DemoKineticCreateAccount: FC<{
  moveOn: () => void
  current: boolean
  kineticClient: KineticSdk
  keypair: Keypair
}> = ({ moveOn, current, kineticClient, keypair }) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const onSuccess = () => {
    setError(false)
    setLoading(false)
    setSuccess(true)
    if (moveOn) {
      moveOn()
    }
  }
  const onClick = () => {
    setLoading(true)
    createAccount(onSuccess, setError, keypair)
  }

  return (
    <>
      <div className="m-0 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0 ">
        {kineticClient && keypair ? <Button disabled={success} label="Create" action={onClick} /> : null}
      </div>
      {loading ? (
        <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`Loading...`}</p>
      ) : null}
      {error ? (
        <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`Something went wrong. Please try again.`}</p>
      ) : null}

      {keypair && success ? (
        <>
          <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`Great! your account has been created on the Solana blockchain.`}</p>
          <Button label="See it Here" action={() => openExplorer({ account: keypair.publicKey })} />
        </>
      ) : null}

      {(() => {
        if (!kineticClient && current) {
          return (
            <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`You aren't connected to Kinetic`}</p>
          )
        }
        if (!keypair && current) {
          return (
            <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`You don't have a keypair`}</p>
          )
        }

        return null
      })()}
    </>
  )
}

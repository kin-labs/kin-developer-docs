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
  const [signature, setSignature] = useState('')
  const [exists, setExists] = useState(false)

  const onSuccess = (signature?: string, alreadyExists?: boolean) => {
    setError(false)
    setLoading(false)

    if (signature) {
      setSignature(signature)
    }

    if (alreadyExists) {
      setExists(true)
    }

    if (moveOn) {
      moveOn()
    }
  }

  const onFailure = () => {
    setSignature('')
    setError(true)
    setLoading(false)
  }

  const onClick = () => {
    setError(false)
    setLoading(true)
    createAccount(onSuccess, onFailure, keypair)
  }

  return (
    <>
      <div className="m-0 w-full px-2 pt-0 pb-3  lg:px-0 ">
        {kineticClient && keypair && !signature && !exists ? (
          <Button disabled={!!signature} label="Create" action={onClick} />
        ) : null}
      </div>
      {loading ? (
        <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`Loading...`}</p>
      ) : null}
      {error ? (
        <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`Something went wrong. Please try again.`}</p>
      ) : null}

      {keypair && (signature || exists) ? (
        <div className="m-0 w-full px-2 pt-0 pb-3  lg:px-0 ">
          <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`It worked! Your account has been created on the Solana blockchain.${
            signature ? ` The transaction signature is ${signature}.` : ''
          }`}</p>
          <div className="flex w-full">
            <span className="mr-2">
              <Button label="See your account" action={() => openExplorer({ account: keypair.publicKey })} />
            </span>
            {signature ? (
              <span className="mr-2">
                <Button label="See your transaction" action={() => openExplorer({ transaction: signature })} />
              </span>
            ) : null}
          </div>
        </div>
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

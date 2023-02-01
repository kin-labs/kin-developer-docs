import { FC, useState } from 'react'
import { KineticSdk } from '@kin-kinetic/sdk'
import { Keypair } from '@kin-kinetic/keypair'
import { ThreeDots } from 'react-loader-spinner'

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
      <div className="m-0 w-full pt-0 pb-3">
        {kineticClient && keypair && !signature && !exists && current ? (
          <Button disabled={!!signature} label="Create" action={onClick} />
        ) : null}
      </div>
      {loading ? (
        <>
          <p className="m-0 mt-1 w-full space-y-12 pt-0 pb-3 md:space-y-2">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="rgba(76, 29, 149, 1)"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />{' '}
            {`Transacting on the blockchain...`}
          </p>
        </>
      ) : null}
      {error ? (
        <p className="m-0 mt-1 w-full space-y-12 pt-0 pb-3 md:space-y-2">{`Something went wrong. Please try again.`}</p>
      ) : null}

      {keypair && (signature || exists) ? (
        <div className="m-0 w-full pt-0 pb-3 ">
          <p className="m-0 mt-1 w-full space-y-12 break-words pt-0 pb-3 md:space-y-2">
            It worked! Your account has been created on the Solana blockchain.
            {signature ? (
              <span>
                <span>
                  {` `}The transaction signagure is {` `}
                </span>
                <span className="break-all">{signature}</span>
              </span>
            ) : (
              ''
            )}
          </p>
          <div className="flex w-full flex-col lg:flex-row">
            <span className="mb-2 lg:mr-2 lg:mb-0">
              <Button label="See your account" action={() => openExplorer({ account: keypair.publicKey })} />
            </span>
            {signature ? (
              <span className="mb-2 lg:mr-2 lg:mb-0">
                <Button label="See your transaction" action={() => openExplorer({ transaction: signature })} />
              </span>
            ) : null}
          </div>
        </div>
      ) : null}

      {(() => {
        if (!kineticClient && current) {
          return (
            <p className="m-0 mt-1 w-full space-y-12 pt-0 pb-3 md:space-y-2">{`You aren't connected to Kinetic`}</p>
          )
        }
        if (!keypair && current) {
          return <p className="m-0 mt-1 w-full space-y-12 pt-0 pb-3 md:space-y-2">{`You don't have a keypair`}</p>
        }

        return null
      })()}
    </>
  )
}

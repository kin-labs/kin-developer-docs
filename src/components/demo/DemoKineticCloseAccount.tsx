import { FC, useState } from 'react'
import { KineticSdk } from '@kin-kinetic/sdk'
import { Keypair } from '@kin-kinetic/keypair'
import { ThreeDots } from 'react-loader-spinner'

import { Button } from '../common/Button'
import { closeAccount, openExplorer } from './kinetic'

export const DemoKineticCloseAccount: FC<{
  moveOn: () => void
  current: boolean
  kineticClient: KineticSdk
  keypair: Keypair
}> = ({ moveOn, current, kineticClient, keypair }) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const onFailure = () => {
    setError(true)
    setLoading(false)
  }

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
    closeAccount(onSuccess, onFailure, keypair.publicKey)
  }

  return (
    <>
      <div className="m-0 w-full px-2 pt-0 pb-3 lg:px-0 ">
        {kineticClient && keypair && !success && current ? <Button label="Close Account" action={onClick} /> : null}
      </div>
      {loading ? (
        <>
          <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">
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
        <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`Something went wrong. Please try again.`}</p>
      ) : null}

      {keypair && success ? (
        <div className="m-0 w-full px-2 pt-0 pb-3  lg:px-0 ">
          <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`That's it! Your account has been closed.`}</p>
          <Button label="Check your account" action={() => openExplorer({ accountBalance: keypair.publicKey })} />
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

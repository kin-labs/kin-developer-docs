import { FC, useState, useEffect } from 'react'
import { BalanceResponse, KineticSdk } from '@kin-kinetic/sdk'
import { Keypair } from '@kin-kinetic/keypair'
import { ThreeDots } from 'react-loader-spinner'

import { Button } from '../common/Button'
import { getBalance, openExplorer } from './kinetic'

export const DemoKineticGetBalance: FC<{
  moveOn: () => void
  current: boolean
  kineticClient: KineticSdk
  keypair: Keypair
}> = ({ moveOn, current, kineticClient, keypair }) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState('')

  const onFailure = () => {
    setError(true)
    setLoading(false)
  }

  const onSuccess = (balance: BalanceResponse) => {
    setError(false)
    setLoading(false)
    setBalance(balance.balance)
    if (moveOn) {
      moveOn()
    }
  }

  const onClick = () => {
    setLoading(true)
    getBalance(onSuccess, onFailure, keypair.publicKey)
  }

  return (
    <>
      <div className="m-0 w-full pt-0 pb-3">
        {kineticClient && keypair && current ? <Button label="Check" action={onClick} /> : null}
      </div>
      {loading ? (
        <>
          <p className="m-0 mt-1 w-full space-y-12 pt-0 pb-3 md:space-y-20">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="rgba(76, 29, 149, 1)"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
            {`Getting data from the blockchain...`}
          </p>
        </>
      ) : null}
      {error ? (
        <p className="m-0 mt-1 w-full space-y-12 pt-0 pb-3 md:space-y-20">{`Something went wrong. Please try again.`}</p>
      ) : null}

      {keypair && balance ? (
        <div className="m-0 w-full pt-0 pb-3  ">
          <p className="m-0 mt-1 w-full space-y-12 pt-0 pb-3 md:space-y-20">{`Great! We got it, your balance is ${balance} KIN.`}</p>
          <Button label="See your balance" action={() => openExplorer({ accountBalance: keypair.publicKey })} />
        </div>
      ) : null}

      {(() => {
        if (!kineticClient && current) {
          return (
            <p className="m-0 mt-1 w-full space-y-12 pt-0 pb-3 md:space-y-20">{`You aren't connected to Kinetic`}</p>
          )
        }
        if (!keypair && current) {
          return <p className="m-0 mt-1 w-full space-y-12 pt-0 pb-3 md:space-y-20">{`You don't have a keypair`}</p>
        }

        return null
      })()}
    </>
  )
}

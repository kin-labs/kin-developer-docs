import { FC, useState, useEffect } from 'react'
import { BalanceResponse, KineticSdk } from '@kin-kinetic/sdk'
import { Keypair } from '@kin-kinetic/keypair'

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
      <div className="m-0 w-full px-2 pt-0 pb-3  lg:px-0 ">
        {kineticClient && keypair ? <Button label="Check" action={onClick} /> : null}
      </div>
      {loading ? (
        <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`Loading...`}</p>
      ) : null}
      {error ? (
        <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`Something went wrong. Please try again.`}</p>
      ) : null}

      {keypair && balance ? (
        <div className="m-0 w-full px-2 pt-0 pb-3  lg:px-0 ">
          <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`Great! We got it, your balance is ${balance} KIN.`}</p>
          <Button label="See your balance" action={() => openExplorer({ accountBalance: keypair.publicKey })} />
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

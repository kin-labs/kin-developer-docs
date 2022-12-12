import { FC, useState } from 'react'
import { BalanceResponse, KineticSdk } from '@kin-kinetic/sdk'
import { Keypair } from '@kin-kinetic/keypair'

import { Button } from '../common/Button'
import { makeTransfer, openExplorer } from './kinetic'

export const DemoKineticMakeTransfer: FC<{
  moveOn: () => void
  current: boolean
  kineticClient: KineticSdk
  keypair: Keypair
}> = ({ moveOn, current, kineticClient, keypair }) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState('')
  const [signature, setSignature] = useState('')

  const onFailure = () => {
    setError(true)
    setLoading(false)
  }

  const onSuccess = (balance: BalanceResponse, signature: string) => {
    setError(false)
    setLoading(false)
    setBalance(balance.balance)
    setSignature(signature)
    if (moveOn) {
      moveOn()
    }
  }

  const onClick = () => {
    setLoading(true)
    makeTransfer(onSuccess, onFailure, keypair)
  }

  return (
    <>
      <div className="m-0 w-full px-2 pt-0 pb-3  lg:px-0 ">
        {kineticClient && keypair && balance !== '0' ? <Button label="Make Transfer" action={onClick} /> : null}
      </div>
      {loading ? (
        <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`Loading...`}</p>
      ) : null}
      {error ? (
        <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`Something went wrong. Please try again.`}</p>
      ) : null}

      {keypair && balance && signature ? (
        <div className="m-0 w-full px-2 pt-0 pb-3  lg:px-0 ">
          <p className="m-0 mt-1 w-full space-y-12 px-2 pt-0 pb-3 md:space-y-20 lg:px-0">{`We did it! Your balance is now ${balance} KIN. The signature of your transaction is ${signature}.`}</p>
          <div className="flex w-full">
            <span className="mr-2">
              <Button label="See your transaction" action={() => openExplorer({ transaction: signature })} />
            </span>
            <span className="mr-2">
              <Button
                label="See your balance"
                action={() => openExplorer({ accountBalance: '3AQwygEJCSpNZc9fomYx7U2XZhE9QSKwa3B1CKzagJLb' })}
              />
            </span>
            <span className="mr-2">
              <Button
                label="See the recipient's activity"
                action={() => openExplorer({ account: keypair.publicKey })}
              />
            </span>
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

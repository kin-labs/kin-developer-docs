import { FC, useState } from 'react'
import { BalanceResponse, KineticSdk } from '@kin-kinetic/sdk'
import { Keypair } from '@kin-kinetic/keypair'
import { ThreeDots } from 'react-loader-spinner'

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
      <div className="m-0 w-full pt-0 pb-3">
        {kineticClient && keypair && balance !== '0' && current ? (
          <Button label="Make Transfer" action={onClick} />
        ) : null}
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
            {`Transacting on the blockchain...`}
          </p>
        </>
      ) : null}
      {error ? (
        <p className="m-0 mt-1 w-full space-y-12 pt-0 pb-3 md:space-y-20">{`Something went wrong. Please try again.`}</p>
      ) : null}

      {keypair && balance && signature ? (
        <div className="m-0 w-full pt-0 pb-3">
          <p className="m-0 mt-1 w-full space-y-12 break-words pt-0 pb-3 md:space-y-20">
            We did it! Your balance is now ${balance} KIN.
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
              <Button label="See your transaction" action={() => openExplorer({ transaction: signature })} />
            </span>
            <span className="mb-2 lg:mr-2 lg:mb-0">
              <Button label="See your balance" action={() => openExplorer({ accountBalance: keypair.publicKey })} />
            </span>
            <span className="mb-2 lg:mr-2 lg:mb-0">
              <Button
                label="See the recipient's activity"
                action={() => openExplorer({ account: '3AQwygEJCSpNZc9fomYx7U2XZhE9QSKwa3B1CKzagJLb' })}
              />
            </span>
          </div>
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

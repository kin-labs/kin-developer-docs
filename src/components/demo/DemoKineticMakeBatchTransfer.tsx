import { FC, useState } from 'react'
import { BalanceResponse, KineticSdk } from '@kin-kinetic/sdk'
import { Keypair } from '@kin-kinetic/keypair'
import { ThreeDots } from 'react-loader-spinner'

import { Button } from '../common/Button'
import { makeBatchTransfer, openExplorer, defaultBatch } from './kinetic'

export const DemoKineticMakeBatchTransfer: FC<{
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
    makeBatchTransfer(onSuccess, onFailure, keypair, defaultBatch)
  }

  return (
    <>
      <div className="m-0 w-full pt-0 pb-3  lg:px-0 ">
        {kineticClient && keypair && balance !== '0' && current ? (
          <Button label="Make Transfer" action={onClick} />
        ) : null}
      </div>
      {loading ? (
        <>
          <p className="m-0 mt-1 w-full space-y-12 pt-0 pb-3 md:space-y-20 lg:px-0">
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
        <p className="m-0 mt-1 w-full space-y-12 pt-0 pb-3 md:space-y-20 lg:px-0">{`Something went wrong. Please try again.`}</p>
      ) : null}

      {keypair && balance && signature ? (
        <>
          <div className="m-0 w-full pt-0 pb-3  lg:px-0 ">
            <p className="m-0 mt-1 w-full space-y-12 break-words pt-0 pb-3 md:space-y-20 lg:px-0">{`We did it! Your balance is now ${balance} KIN. The signature of your transaction is ${signature}.`}</p>
            <div className="flex w-full">
              <span className="mr-2">
                <Button label="See your transaction" action={() => openExplorer({ transaction: signature })} />
              </span>
              <span className="mr-2">
                <Button label="See your balance" action={() => openExplorer({ accountBalance: keypair.publicKey })} />
              </span>
            </div>
          </div>

          <div className="m-0 w-full pt-0 pb-3  lg:px-0 ">
            <p className="m-0 mt-1 w-full space-y-12 pt-0 pb-3 md:space-y-20 lg:px-0">{`See the updated balances of the batch recipients below:`}</p>
            {defaultBatch.map((earn) => {
              return (
                <div key={earn.destination} className="m-0 w-full pt-0 pb-3  lg:px-0 ">
                  <Button label={earn.destination} action={() => openExplorer({ accountBalance: earn.destination })} />
                </div>
              )
            })}
          </div>
        </>
      ) : null}

      {(() => {
        if (!kineticClient && current) {
          return (
            <p className="m-0 mt-1 w-full space-y-12 pt-0 pb-3 md:space-y-20 lg:px-0">{`You aren't connected to Kinetic`}</p>
          )
        }
        if (!keypair && current) {
          return (
            <p className="m-0 mt-1 w-full space-y-12 pt-0 pb-3 md:space-y-20 lg:px-0">{`You don't have a keypair`}</p>
          )
        }

        return null
      })()}
    </>
  )
}

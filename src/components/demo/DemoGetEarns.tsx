import { FC, useState } from 'react'
import { Keypair } from '@kin-kinetic/keypair'
import { ThreeDots } from 'react-loader-spinner'

import { Button } from '../common/Button'
import { defaultBatch, openExplorer } from './kinetic'

export const DemoGetEarns: FC<{
  moveOn: () => void
  current: boolean
  keypair: Keypair
}> = ({ moveOn, current }) => {
  const [loading, setLoading] = useState(false)
  const [earns, setEarns] = useState<{ destination: string; amount: string }[]>()

  const getEarns = async () => {
    setTimeout(() => {
      setLoading(false)
      setEarns(defaultBatch)
      moveOn()
    }, 1000)
  }

  const onClick = () => {
    setLoading(true)
    getEarns()
  }

  return (
    <>
      <div className="m-0 w-full px-2 pt-0 pb-3  lg:px-0 ">
        {current ? <Button label="Create" action={onClick} /> : null}
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
            />{' '}
            {`Getting data from database...`}
          </p>
        </>
      ) : null}

      {earns ? (
        <>
          {earns.map((earn) => {
            return (
              <div key={earn.destination} className="m-0 w-full pt-0 pb-3 lg:px-0 ">
                <p className="m-0 mt-1 w-full space-y-12 break-words pt-0 pb-3 md:space-y-20 lg:px-0">{`Send ${earn.amount} KIN to ${earn.destination}`}</p>
                <Button label="See balance" action={() => openExplorer({ accountBalance: earn.destination })} />
              </div>
            )
          })}
        </>
      ) : null}
    </>
  )
}

import { FC } from 'react'

const content = {
  image: '/images/logos/kin-circle-white.svg',
}

export const DemoLogo: FC = () => {
  return (
    <div className="m-0 w-full space-y-12 px-2 pt-0 md:space-y-20 lg:px-0 ">
      <div className="my-0 mx-auto mb-0 flex max-w-5xl flex-col space-y-12 px-3">
        <div className="mx-auto flex w-auto">
          <img style={{ height: 'auto', width: '10%' }} className="mx-0 my-0" src={content.image} />
        </div>
      </div>
    </div>
  )
}

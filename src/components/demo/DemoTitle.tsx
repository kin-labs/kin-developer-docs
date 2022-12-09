import { FC } from 'react'
import { DocsNavCard } from '../docs/DocsNavCard'

export const DemoTitle: FC<{ title: string; subtitle: string; setSelected: () => void; Component: FC }> = ({
  title,
  subtitle,
  setSelected,
  Component,
}) => {
  return (
    <div className="solid m-0 mb-1 w-full space-y-12 px-2 pt-0 md:space-y-20 lg:px-0" onClick={setSelected}>
      <div className="my-0 mx-auto mb-0 flex max-w-5xl flex-col space-y-12 px-3">
        <div className="my-auto flex flex-grow flex-col">
          <DocsNavCard title={title} svgFile="kin" largeIcon subtitle={subtitle} fullWidth>
            <Component />
          </DocsNavCard>
        </div>
      </div>
    </div>
  )
}

import { KineticSdk } from '@kin-kinetic/sdk'
import { Keypair } from '@kin-kinetic/keypair'
import Image from 'next/image'
import { FC, useState } from 'react'
import { DemoItem } from './DemoItem'

interface Stage {
  title: string
  subtitle: string
  link: { url: string; label: string }
  component: FC
}

export const DemoContainer: FC<{ stages: Stage[] }> = ({ stages }) => {
  const [selected, setSelected] = useState(0)
  const [kineticClient, setKineticClient] = useState<KineticSdk | undefined>(undefined)
  const [keypair, setKeypair] = useState<Keypair | undefined>(undefined)

  return (
    <div className="solid m-0 w-full px-2 pt-0">
      <div className="my-0 mx-auto flex max-w-5xl flex-col px-3">
        {stages.map((stage, i) => {
          const reached = i <= selected
          const isSelected = i === selected
          let imageSrc = ``
          let imageClass = ``
          if (reached) {
            imageSrc = `/images/logos/circle-arrow-right-solid.svg`
            imageClass = `svgFile svgFile-circle-arrow-right-solid completed`
          }
          if (isSelected) {
            imageClass = `svgFile svgFile-circle-arrow-right-solid`
          }
          return (
            <div className=" flex flex-row" key={stage.title}>
              <div
                className={`${reached ? 'fade-in-top bg-[#4c1d95]' : 'fade-out'} ${
                  i === 0 ? 'demoItem' : ''
                }  h-100% mr-8 ml-0 w-1`}
              >
                {reached && (
                  <div
                    className={`fade-in NavCard-AllowOverflow relative w-full rounded-full bg-white dark:bg-gray-950`}
                  >
                    <div
                      className={`absolute top-[97px] -right-6 h-12 w-12 scale-110 rounded-full border-violet-200 bg-violet-100 p-2.5 text-violet-600 dark:border-violet-900 dark:bg-violet-900/50 dark:text-violet-500`}
                    >
                      <Image height="300px" width="300px" className={imageClass} src={imageSrc} />
                    </div>
                  </div>
                )}
              </div>
              <DemoItem
                title={stage.title}
                subtitle={stage.subtitle}
                link={stage.link}
                current={isSelected}
                moveOn={() => {
                  setTimeout(() => {
                    const nextElement = document.getElementById(stages[i]?.title)?.offsetTop
                    if (nextElement) {
                      window.scrollTo({ top: nextElement - 55, behavior: 'smooth' })
                    }
                  }, 500)
                  setTimeout(() => {
                    setSelected(i + 1)
                  }, 1000)
                }}
                kineticClient={kineticClient}
                setKineticClient={setKineticClient}
                keypair={keypair}
                setKeypair={setKeypair}
                Component={stage.component}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

import Image from 'next/image'
import { FC, useState } from 'react'
import { DemoTitle } from './DemoTitle'

interface Stage {
  title: string
  subtitle: string
  component: FC
}

export const DemoContainer: FC<{ stages: Stage[] }> = ({ stages }) => {
  const [selected, setSelected] = useState(0)
  console.log('🚀 ~ selected', selected)

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
          console.log('🚀 ~ reached', reached)
          return (
            <div className=" flex flex-row" key={i}>
              <div
                className={`${reached ? 'fade-in-top bg-[#4c1d95]' : ''} ${
                  i === 0 ? 'demoItem' : ''
                }  h-100% mr-8 ml-0 w-1`}
              >
                {reached && (
                  <div
                    className={`fade-in NavCard-AllowOverflow relative w-full rounded-full bg-white dark:bg-gray-950`}
                  >
                    <div
                      className={`scale-120 absolute top-20 -right-6 h-12 w-12 rounded-full border-violet-200 bg-violet-100 p-2.5 text-violet-600 dark:border-violet-900 dark:bg-violet-900/50 dark:text-violet-500`}
                    >
                      <Image height="300px" width="300px" className={imageClass} src={imageSrc} />
                    </div>
                  </div>
                )}
              </div>
              <DemoTitle
                title={stage.title}
                subtitle={stage.subtitle}
                setSelected={() => setSelected(i)}
                Component={stage.component}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

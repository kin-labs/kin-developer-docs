import Image from 'next/image'
import { FC, PropsWithChildren } from 'react'
import { ChevronLink } from '../common/ChevronLink'
import { Icon, IconName } from '../common/Icon'
import { Label } from '../common/Label'

export const DocsNavCard: FC<
  PropsWithChildren<{
    hero?: boolean
    useCase?: boolean
    title: string
    icon?: IconName | null
    svgFile?: string | null
    pngFile?: string | null
    jpgFile?: string | null
    label?: string | null
    subtitle?: string | null
    link?: { url: string; label: string }
  }>
> = ({ hero, useCase, title, icon, svgFile, pngFile, jpgFile, label, subtitle, children, link }) => {
  let imageClass = ''
  let imageSrc = ''
  if (svgFile) {
    imageClass = `svgFile svgFile-${svgFile}`
    imageSrc = `/images/logos/${svgFile}.svg`
  }
  if (pngFile) {
    imageClass = `pngFile pngFile-${pngFile}`
    imageSrc = `/images/logos/${pngFile}.png`
  }
  if (jpgFile) {
    imageClass = `jpgFile jpgFile-${jpgFile}`
    imageSrc = `/images/logos/${jpgFile}.jpg`
  }

  return (
    <div className={`flex flex-col ${hero ? 'mb-4' : ''}`}>
      <div
        className={`grow border border-gray-100 bg-gray-50 p-6 py-4 dark:border-gray-800 dark:bg-gray-900 
        ${link ? 'rounded-t-2xl border-b-0' : 'rounded-2xl'} ${
          icon || svgFile || pngFile || jpgFile ? 'mt-6' : 'mt-0'
        }`}
      >
        {imageSrc && (
          <div
            className={`${
              useCase ? 'relative w-full' : '-mt-10 mb-4 block w-12'
            } rounded-full bg-white dark:bg-gray-950 ${svgFile || pngFile || jpgFile ? 'NavCard-AllowOverflow' : ''}`}
          >
            <div
              className={`${useCase ? 'absolute -top-8 right-2 scale-150' : ''} mb-4
            h-12 w-12 rounded-full border border-violet-200 bg-violet-100 p-2.5 text-violet-600 dark:border-violet-900 dark:bg-violet-900/50 dark:text-violet-500`}
            >
              <Image
                height="300px"
                width="300px"
                alt={`${svgFile || pngFile || jpgFile}`}
                className={imageClass}
                src={imageSrc}
              />
            </div>
          </div>
        )}

        {icon && (
          <div className="-mt-10 mb-4 block w-12 rounded-full bg-white dark:bg-gray-950">
            <div className="h-12 w-12 rounded-full border border-violet-200 bg-violet-100 p-2.5 text-violet-600 dark:border-violet-900 dark:bg-violet-900/50 dark:text-violet-500">
              <Icon name={icon} />
            </div>
          </div>
        )}
        <h3 className={`mt-0 ${hero ? 'text-3xl' : ''}`}>{title}</h3>
        {label && <Label text={label} />}
        {subtitle && (
          <div className={`text-sm text-slate-500 dark:text-slate-400 ${hero ? 'text-lg' : ''}`}>
            <p>{subtitle}</p>
          </div>
        )}
        {children ? <div className="text-sm">{children}</div> : null}
      </div>
      {link && (
        <div className="rounded-b-2xl border border-violet-100 bg-violet-50 p-6 py-4 dark:border-violet-900/50 dark:bg-violet-900/20">
          <ChevronLink {...link} />
        </div>
      )}
    </div>
  )
}
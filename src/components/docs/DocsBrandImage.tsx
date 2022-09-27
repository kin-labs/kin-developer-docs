import Image from 'next/image'

export const DocsBrandImage: React.FC<
  React.PropsWithChildren<{ name: string; svg: boolean; png: boolean; light: boolean; dark: boolean }>
> = ({ name, svg = false, png = false, light = false, dark = false, children }) => {
  let fileName = `${name}.${svg ? 'svg' : 'png'}`
  let src = `/branding/${fileName}`

  return (
    <div className={`BrandImage flex flex-col`}>
      <div
        className={`flex grow flex-col justify-between rounded-md border border-gray-100 bg-gray-50 ${
          light ? 'bg-gray-600' : ''
        } p-2 dark:border-gray-800 dark:bg-gray-900 ${dark ? 'dark:bg-gray-200' : ''}`}
        title={name}
      >
        {children ? children : <Image height="169" width="169" alt={`${fileName}`} src={src} />}

        <span
          className={`mx-auto mb-1 pt-3 text-slate-600 dark:text-slate-900 ${light ? 'text-slate-50' : ''} ${
            dark ? 'dark:text-slate-100' : ''
          }`}
        >
          {svg ? (
            <a
              className={`text-slate-600 dark:text-slate-900 ${light ? 'text-slate-50' : ''} ${
                dark ? 'dark:text-slate-900' : ''
              }`}
              download={`${name}.svg`}
              href={`/branding/${name}.svg`}
              title={name}
            >
              SVG
            </a>
          ) : null}
          {svg && png ? <span className="mx-2"> </span> : null}
          {png ? (
            <a
              className={`text-slate-600 dark:text-slate-900 ${light ? 'text-slate-50' : ''} ${
                dark ? 'dark:text-slate-900' : ''
              }`}
              download={`${name}.png`}
              href={`/branding/${name}.png`}
              title={name}
            >
              PNG
            </a>
          ) : null}
        </span>
      </div>
    </div>
  )
}

export interface DocsBrandImageProps {
  name: string
  width?: number
}

export function DocsBrandImage({ name, width }: DocsBrandImageProps) {
  const slug = name.toLowerCase().replace(/ /g, '-')
  let fileNamePng = `${slug}.png`
  let fileNameSvg = `${slug}.svg`
  let srcPng = `/branding/${fileNamePng}`
  let srcSvg = `/branding/${fileNameSvg}`

  return (
    <div
      className="rounded-md border border-gray-100 bg-gray-50 px-5 py-2 dark:border-gray-800 dark:bg-gray-900 "
      title={name}
    >
      <div className="py-4 text-lg font-semibold">{name}</div>
      <div className="flex flex-col space-y-4 p-4 sm:flex-row sm:justify-around sm:space-y-0">
        <DocsBrandImageImage label={'Download PNG'} src={srcPng} width={width} />
        <DocsBrandImageImage label={'Download SVG'} src={srcSvg} width={width} />
      </div>
    </div>
  )
}

function DocsBrandImageImage({ src, label, width }: { src: string; label: string; width?: number }) {
  return (
    <div className={'flex flex-col items-center space-y-2'}>
      <img alt={label} src={src} className={`h-[100px]`} width={width} />
      <DocsBrandImageLink href={src} label={label} />
    </div>
  )
}
function DocsBrandImageLink({ href, label }: { href: string; label: string }) {
  return (
    <a rel="noreferrer" target="_blank" href={href} title={label} className="text-violet-600 dark:text-violet-400">
      {label}
    </a>
  )
}

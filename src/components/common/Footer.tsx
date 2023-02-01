import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Icon } from './Icon'

const isExternalUrl = (link: string): boolean => {
  return !link.startsWith('/')
}

const kinWebsiteLink = 'https://www.kin.org/'
const contentlayerLink = 'https://github.com/contentlayerdev/contentlayer'
const content = {
  note: (
    <>
      <p>
        A project by{' '}
        <Link href={kinWebsiteLink}>
          <a
            className="inline-flex items-center space-x-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            target={isExternalUrl(kinWebsiteLink) ? '_blank' : undefined}
          >
            <span>{`The Kin Ecosystem`}</span>
            {isExternalUrl(kinWebsiteLink) && (
              <span className="inline-block w-4">
                <Icon name="external-link" />
              </span>
            )}
          </a>
        </Link>
      </p>
      <br />
      <p>
        Website built with{' '}
        <Link href={contentlayerLink}>
          <a
            className="inline-flex items-center space-x-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            target={isExternalUrl(contentlayerLink) ? '_blank' : undefined}
          >
            <span>{`Contentlayer`}</span>
            {isExternalUrl(contentlayerLink) && (
              <span className="inline-block w-4">
                <Icon name="external-link" />
              </span>
            )}
          </a>
        </Link>
      </p>
    </>
  ),
  menus: [
    {
      title: 'Quick Links',
      elements: [
        { label: 'Kin Website', url: 'https://kin.org' },
        { label: 'Kin News', url: 'https://kin.org/news' },
        { label: 'Privacy Policy', url: 'https://kin.org/privacy-policy/' },
        { label: 'Cookie Policy', url: 'https://kin.org/cookie-policy/' },
        { label: 'Terms & Conditions', url: 'https://kin.org/terms-of-use-agreement/' },
        { label: 'Developer Terms', url: 'https://kin.org/kin-developer-terms/' },
      ],
    },
    {
      title: 'Social',
      elements: [
        {
          label: 'Twitter',
          url: 'https://twitter.com/Kin_Ecosystem',
        },
        {
          label: 'Reddit',
          url: 'https://www.reddit.com/r/kin/',
        },
        {
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/company/kin-ecosystem/',
        },
        {
          label: 'Instagram',
          url: 'https://www.instagram.com/kin_ecosystem/?hl=en',
        },
        {
          label: 'Facebook',
          url: 'https://www.facebook.com/KinEcosystem/',
        },
        {
          label: 'Youtube',
          url: 'https://www.youtube.com/c/KinEcosystem',
        },
      ],
    },
    {
      title: 'Connect',
      elements: [
        { label: 'Kin Developer Portal', url: 'https://portal.kin.org/' },
        { label: 'Discord', url: 'https://www.kin.org/developerdiscord' },
      ],
    },
  ],
}

export const Footer: FC = () => {
  return (
    <div className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
      <div className="mx-auto w-full max-w-screen-2xl space-y-8 px-4 py-8 md:p-8 md:pb-12 lg:flex lg:justify-between lg:space-y-0 lg:p-16 lg:pb-20">
        <div>
          <Link href="/">
            <a className="flex items-center space-x-2.5 font-bold text-slate-800 no-underline dark:text-white">
              <Image height="40px" width="70px" alt={`Kin Foundation`} src={`/images/logos/kin-logo-violet.svg`} />{' '}
            </a>
          </Link>
          <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">{content.note}</div>
        </div>
        <div className="space-y-8 md:flex md:space-y-0 md:space-x-16">
          {content.menus.map(({ title, elements }, index) => (
            <div key={index}>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-200">
                {title}
              </h4>
              <ul className="mx-0 mt-4 list-none space-y-2 text-sm">
                {elements.map(({ label, url }, index) => (
                  <li key={index}>
                    <Link href={url}>
                      <a
                        className="inline-flex items-center space-x-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                        target={isExternalUrl(url) ? '_blank' : undefined}
                      >
                        <span>{label}</span>
                        {isExternalUrl(url) && (
                          <span className="inline-block w-4">
                            <Icon name="external-link" />
                          </span>
                        )}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

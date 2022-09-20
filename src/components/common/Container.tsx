import { FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { SearchProvider } from '../SearchContext'
import { MainNavigation } from './MainNavigation'
import { Footer } from './Footer'

export const Container: FC<any> = ({ children, ...customMeta }) => {
  const router = useRouter()

  const baseUrl = `https://https://developer.kin.org/`

  const meta = {
    title: "Kin - Integrate cryptocurrency into your App's experience",
    description:
      'Simply put, Kin is money for the digital world and it provides a way for developers (like you) to monetize their apps and websites in a fundamentally new way.',
    url: customMeta.urlPath ? `${baseUrl}${customMeta.urlPath}` : baseUrl,
    name: 'Kin Developer Docs',
    image: customMeta.imagePath ? `${baseUrl}${customMeta.imagePath}` : `${baseUrl}/images/beta-launch-post-meta.png`,
    type: 'website',
    ...customMeta,
  }
  const jsonLd = {
    '@context': 'http://www.schema.org',
    '@type': 'WebSite',
    name: meta.name,
    url: meta.url,
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`${meta.url}${router.asPath}`} />
        <link rel="canonical" href={`${meta.url}${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={meta.name} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <SearchProvider>
        <MainNavigation />
        <div className="flex min-h-screen flex-col justify-between">
          <main className="relative pt-16" style={{ scrollPaddingTop: '150px' }}>
            {children}
          </main>
          <Footer />
        </div>
      </SearchProvider>
    </>
  )
}

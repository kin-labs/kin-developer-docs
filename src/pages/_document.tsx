import Document, { Html, Head, Main, NextScript } from 'next/document'

const AnalyticsScripts = () => {
  if (process.env.NODE_ENV !== 'production') return null
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WTZFRN7')`,
      }}
    />
  )
}

const AnalyticsPopup = () => {
  if (process.env.NODE_ENV !== 'production') return null
  return (
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-WTZFRN7"
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      ></iframe>
    </noscript>
  )
}

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-padding">
        <Head>
          <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/favicon/favicon.png" />
          <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/favicon/favicon.png" />
          <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/favicon/favicon.png" />
          <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/favicon/favicon.png" />
          <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/favicon/favicon.png" />
          <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/favicon/favicon.png" />
          <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/favicon/favicon.png" />
          <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/favicon/favicon.png" />
          <link rel="icon" type="image/png" href="/favicon/favicon.png" sizes="196x196" />
          <link rel="icon" type="image/png" href="/favicon/favicon.png" sizes="96x96" />
          <link rel="icon" type="image/png" href="/favicon/favicon.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/favicon/favicon.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/favicon/favicon.png" sizes="128x128" />
          <meta name="application-name" content="&nbsp;" />
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta name="msapplication-TileImage" content="/favicon/favicon.png" />
          <meta name="msapplication-square70x70logo" content="/favicon/favicon.png" />
          <meta name="msapplication-square150x150logo" content="/favicon/favicon.png" />
          <meta name="msapplication-wide310x150logo" content="/favicon/favicon.png" />
          <meta name="msapplication-square310x310logo" content="/favicon.png" />
          <link
            rel="preload"
            href="/fonts/NeueHaasDisplayRoman.ttf"
            as="font"
            type="font/truetype"
            crossOrigin="anonymous"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: /* js */ `
                const savedTheme = localStorage.getItem('theme') ?? 'dark'

                if (savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
          `,
            }}
          />
          <AnalyticsScripts />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <AnalyticsPopup />
      </Html>
    )
  }
}

export default MyDocument

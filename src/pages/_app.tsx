import type { AppProps } from 'next/app'
import { ColorSchemeProvider } from '../components/ColorSchemeContext'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ColorSchemeProvider>
      <Component {...pageProps} />
    </ColorSchemeProvider>
  )
}
export default MyApp

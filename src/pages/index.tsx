import { FC, useEffect, useState } from 'react'
import { useColorScheme } from '../components/ColorSchemeContext'
import { Container } from '../components/common/Container'
import { Hero } from '../components/landing-page/Hero'

const Page: FC = () => {
  const preferredColorScheme = useColorScheme()
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (preferredColorScheme === 'system') {
      setColorScheme(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    } else {
      setColorScheme(preferredColorScheme)
    }
  }, [preferredColorScheme])

  return (
    <Container>
      <Hero />
    </Container>
  )
}

export default Page

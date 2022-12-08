import React, { FC, useEffect, useState } from 'react'
import type { InferGetStaticPropsType } from 'next'

import { buildDocsTree } from 'src/utils/build-docs-tree'
import { buildToolsTree } from 'src/utils/build-tools-tree'
import { buildExamplesTree } from '../utils/build-examples-tree'

import { useColorScheme } from '../components/ColorSchemeContext'
import { Container } from '../components/common/Container'
import { Hero } from '../components/landing-page/Hero'
import { allDocs, allExamples, allTools } from 'contentlayer/generated'
import { defineStaticProps } from 'src/utils/next'

export const getStaticProps = defineStaticProps(async (_context) => {
  console.time('getStaticProps /')
  const docs = buildDocsTree(allDocs)
  const tools = buildToolsTree(allTools)
  const examples = buildExamplesTree(allExamples)

  console.timeEnd('getStaticProps /')

  return { props: { docs, examples, tools } }
})

const Page: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = () => {
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

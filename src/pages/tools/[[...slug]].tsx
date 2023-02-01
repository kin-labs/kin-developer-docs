import { allTools } from 'contentlayer/generated'
import type { InferGetStaticPropsType } from 'next'
// TODO remove eslint-disable when fixed https://github.com/import-js/eslint-plugin-import/issues/1810
// eslint-disable-next-line import/no-unresolved
import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { H2, H3, H4 } from 'src/components/common/Headings'
import { Link } from 'src/components/common/Link'
// import { PageNavigation } from 'src/components/common/PageNavigation'
import { DocsCard as Card } from 'src/components/docs/DocsCard'
import { DocsNavigation } from 'src/components/docs/DocsNavigation'
import { OptionDescription, OptionsTable, OptionTitle } from 'src/components/docs/OptionsTable'
import { buildToolsTree } from 'src/utils/build-tools-tree'
import { Callout } from '../../components/common/Callout'
import { Card as ChildCard } from '../../components/common/Card'
import { ChevronLink } from '../../components/common/ChevronLink'
import { Container } from '../../components/common/Container'
import { Label } from '../../components/common/Label'
import { DocsAgora as Agora } from '../../components/docs/DocsAgora'
import { DocsBestPractices as BestPractices } from '../../components/docs/DocsBestPractices'
import { DocsBrandImage as BrandImage } from '../../components/docs/DocsBrandImage'
import { DocsBubble as Bubble } from '../../components/docs/DocsBubble'
import { DocsFooter } from '../../components/docs/DocsFooter'
import { DocsHeader } from '../../components/docs/DocsHeader'
import { DocsHelp as Help } from '../../components/docs/DocsHelp'
import { DocsKineticManager as KineticManager } from '../../components/docs/DocsKineticManager'
import { DocsKRE as KRE } from '../../components/docs/DocsKRE'
import { DocsUseCases as UseCases } from '../../components/docs/DocsUseCases'
import { DocsNavCard as NavCard } from '../../components/docs/DocsNavCard'
import { DocsProduction as Production } from '../../components/docs/DocsProduction'
import { DocsRegisterApp as RegisterApp } from '../../components/docs/DocsRegisterApp'
import { defineStaticProps, toParams } from '../../utils/next'
import { DemoItem } from '../../components/demo/DemoItem'
import { DemoContainer } from '../../components/demo/DemoContainer'
import { DemoKineticConnect } from '../../components/demo/DemoKineticConnect'
import { DemoKineticKeypair } from '../../components/demo/DemoKineticKeypair'
import { DemoKineticCreateAccount } from '../../components/demo/DemoKineticCreateAccount'
import { DemoKineticGetBalance } from '../../components/demo/DemoKineticGetBalance'
import { DemoKineticAirdrop } from '../../components/demo/DemoKineticAirdrop'
import { DemoKineticMakeTransfer } from '../../components/demo/DemoKineticMakeTransfer'
import { DemoKineticCloseAccount } from '../../components/demo/DemoKineticCloseAccount'
import { DemoGetEarns } from '../../components/demo/DemoGetEarns'
import { DemoKineticMakeBatchTransfer } from '../../components/demo/DemoKineticMakeBatchTransfer'

export const getStaticPaths = async () => {
  const paths = allTools
    .map((_) =>
      _.pathSegments
        .map((_: PathSegment) => _.pathName)
        .slice(1)
        .join('/'),
    )
    .map(toParams)
  return { paths, fallback: false }
}

export const getStaticProps = defineStaticProps(async (context) => {
  const params = context.params as any
  const pagePath = params.slug ? ['tools', ...params.slug].join('/') : 'tools'
  const tool = allTools.find((_) => _.pathSegments.map((_: PathSegment) => _.pathName).join('/') === pagePath)!
  let slugs = params.slug ? ['', ...params.slug] : []
  let path = ''
  let breadcrumbs: any = []
  for (const slug of slugs) {
    path += slug ? '/' + slug : 'tools'
    const navTitle = allTools.find(
      (_) => _.pathSegments.map((_: PathSegment) => _.pathName).join('/') === path,
    )?.nav_title
    const title = allTools.find((_) => _.pathSegments.map((_: PathSegment) => _.pathName).join('/') === path)?.title
    breadcrumbs.push({ path: '/' + path, slug, title: navTitle || title })
  }
  const tree = buildToolsTree(allTools)
  const childrenTree = buildToolsTree(
    allTools,
    tool.pathSegments.map((_: PathSegment) => _.pathName),
  )

  return { props: { tool, tree, breadcrumbs, childrenTree } }
})

const mdxComponents = {
  Callout,
  Card,
  NavCard,
  Image,
  Link,
  ChevronLink,
  Label,
  h2: H2,
  h3: H3,
  h4: H4,
  a: Link,
  OptionsTable,
  OptionTitle,
  OptionDescription,
  Help,
  BestPractices,
  KRE,
  Production,
  RegisterApp,
  KineticManager,
  Agora,
  UseCases,
  Bubble,
  BrandImage,
  DemoItem,
  DemoContainer,
  DemoKineticConnect,
  DemoKineticKeypair,
  DemoKineticCreateAccount,
  DemoKineticGetBalance,
  DemoKineticAirdrop,
  DemoKineticMakeTransfer,
  DemoKineticCloseAccount,
  DemoGetEarns,
  DemoKineticMakeBatchTransfer,
}

const Page: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ tool, tree, breadcrumbs, childrenTree }) => {
  const router = useRouter()
  useLiveReload()
  const MDXContent = useMDXComponent(tool.body.code || '')

  return (
    <Container title={tool.title + ' – Kin Developer Docs'} description={tool.excerpt}>
      <div className="relative mx-auto w-full max-w-screen-2xl lg:flex lg:items-start">
        <div
          style={{ height: 'calc(100vh - 64px)' }}
          className="sticky top-16 hidden shrink-0 border-r border-gray-200 dark:border-gray-800 lg:block"
        >
          <div className="-ml-3 h-full overflow-y-scroll p-8 pl-16">
            <DocsNavigation tree={tree} />
          </div>
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
        </div>

        <div className="relative w-full grow">
          <DocsHeader tree={tree} breadcrumbs={breadcrumbs} title={tool.title} />
          <div className="docs prose prose-slate prose-violet mx-auto mb-4 w-full max-w-3xl shrink p-4 pb-8 prose-headings:font-semibold prose-a:font-normal prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-hr:border-gray-200 dark:prose-invert dark:prose-a:text-violet-400 dark:prose-hr:border-gray-800 md:mb-8 md:px-8 lg:mx-0 lg:max-w-full lg:px-16">
            {MDXContent && <MDXContent components={mdxComponents} />}
            {tool.show_child_cards && (
              <>
                <hr />
                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {childrenTree.map((card, index) => (
                    <div key={index} onClick={() => router.push(card.urlPath)} className="cursor-pointer">
                      <ChildCard className="h-full p-6 py-4 hover:border-violet-100 hover:bg-violet-50 dark:hover:border-violet-900/50 dark:hover:bg-violet-900/20">
                        <h3 className="mt-0 no-underline">{card.title}</h3>
                        {card.label && <Label text={card.label} />}
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          <p>{card.excerpt}</p>
                        </div>
                      </ChildCard>
                    </div>
                  ))}
                </div>
              </>
            )}
            <DocsFooter />
          </div>
        </div>
        {/* right side navbar */}
        {/* <div
          style={{ maxHeight: 'calc(100vh - 128px)' }}
          className="sticky top-32 hidden w-80 shrink-0 overflow-y-scroll p-8 pr-16 1.5xl:block"
        >
          <PageNavigation headings={tool.headings} />
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
        </div> */}
      </div>
    </Container>
  )
}

export default Page

import React from 'react'
import { Container } from '../components/common/Container'
import { Icon } from 'src/components/common/Icon'
import { Heading } from 'src/components/landing-page/Heading'
import { Paragraph } from 'src/components/landing-page/Paragraph'
import { Label } from 'src/components/common/Label'
import Link from 'next/link'

const NotFound = () => {
  return (
    <Container>
      <div className="relative overflow-hidden">
        <div className="relative flex flex-col items-center justify-center pt-32 md:pt-56">
          <Heading level={1} className="flex items-center font-black">
            <span>404</span>
            <span className="ml-4 w-10 text-violet-500 dark:text-violet-400">
              <Icon name="broken-link" />
            </span>
          </Heading>
          <Paragraph className="pb-16 text-center">
            The URL you are looking for does not exist.
            <br />
            {`We've recently revamped our docs.`}
            <br />
            <span>
              You might want to look at{' '}
              <Link href="/docs/essentials">
                <a>Essentials</a>
              </Link>{' '}
              first.
            </span>
            <br />
            Or, hit <Label text="⌘K" /> to explore the Kin Developer Docs.
          </Paragraph>
        </div>
      </div>
    </Container>
  )
}

export default NotFound

import { Doc, Tool } from 'contentlayer/generated'
import Link from 'next/link'
import { FC } from 'react'
import { Icon } from '../common/Icon'

export const DocsFooter: FC = () => {
  return (
    <>
      <hr />
      <div className="space-y-4 text-sm sm:flex sm:justify-between sm:space-y-0">
        <p className="m-0">
          Was this page helpful to you? <br />{' '}
          <Link href="https://forms.gle/qhjcDJR59v8RJsaY7">
            <a className="inline-flex items-center space-x-1" target="_blank" rel="noreferrer">
              <span className="inline-block w-4">
                <Icon name="external-link" />
              </span>
              <span>Provide feedback</span>
            </a>
          </Link>
        </p>
      </div>
    </>
  )
}

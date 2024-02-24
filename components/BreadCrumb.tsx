import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import RootTemplate from './subworlds/RootTemplate';
import classNames from 'classnames'
import Link from 'next/link';

// const pages = [
//   { name: 'Projects', href: '#', current: false },
//   { name: 'Project Nero', href: '#', current: true },
// ]


export default function BreadCrumb({ pages }) {
  return (
    <div className='p-10'>
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-6">
        <li>
          <div>
            <Link href="/" className="text-lighter hover:text-light no-underline">
              <HomeIcon className="h-7 w-7 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page, index) => (
          <li key={page.name}>
            <div className="flex items-center text-lg space-x-6">
              <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-lighter" aria-hidden="true" />
              <a
                href={page.href}
                className={classNames(
                  index === pages.length - 1 ? "text-brand no-underline" : "text-lighter hover:text-light no-underline text-lg"
                )}
                aria-current={index == pages.length -1 ? 'page' : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
    </div>
  )
}


import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function LatestBlogs({ blogs }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <main>
        {/* Category section */}
        <section aria-labelledby="category-heading" className="bg-darkest">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="sm:flex sm:items-baseline sm:justify-between">
              <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-lightest">
                Latest
              </h2>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
              <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
                <img
                  src={blogs[0].thumbnail}
                  alt={blogs[0].title}
                  className="object-cover object-center group-hover:opacity-75"
                />
                <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-75" />
                <div className="flex items-end p-6 sm:absolute sm:inset-0">
                  <div>
                    <div className="font-semibold">
                      <Link href={`/blogs/${blogs[0].id}`} className="no-underline text-light">
                        <span>
                          <span className="absolute inset-0" />
                          {blogs[0].title}
                        </span>
                      </Link>
                    </div>
                    {/* <div aria-hidden="true" className="mt-1 text-sm text-lighter">
                      Shop now
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
                <img
                  src={blogs[1].thumbnail}
                  alt={blogs[1].title}
                  className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                />
                <div
                  aria-hidden="true"
                  className="bg-gradient-to-b from-transparent to-black opacity-75 sm:absolute sm:inset-0"
                />
                <div className="flex items-end p-6 sm:absolute sm:inset-0">
                  <div>
                    <div className="font-semibold">
                      <Link href={`/blogs/${blogs[1].id}`} className="no-underline text-light">
                        <span>
                          <span className="absolute inset-0" />
                          {blogs[1].title}
                        </span>
                      </Link>
                    </div>
                    {/* <div aria-hidden="true" className="mt-1 text-sm text-lighter">
                      Shop now
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
                <img
                  src={blogs[2].thumbnail}
                  alt={blogs[2].title}
                  className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                />
                <div
                  aria-hidden="true"
                  className="bg-gradient-to-b from-transparent to-black opacity-75 sm:absolute sm:inset-0"
                />
                <div className="flex items-end p-6 sm:absolute sm:inset-0">
                  <div>
                    <div className="font-semibold">
                      <Link href={`/blogs/${blogs[2].id}`} className="no-underline text-light">
                        <span>
                          <span className="absolute inset-0" />
                          {blogs[2].title}
                        </span>
                      </Link>
                    </div>
                    {/* <div aria-hidden="true" className="mt-1 text-sm text-lighter">
                      Shop now
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>     
    </div>
  )
}
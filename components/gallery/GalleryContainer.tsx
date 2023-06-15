import { Fragment, useState , useEffect} from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3BottomLeftIcon,
  CogIcon,
  HeartIcon,
  HomeIcon,
  PhotoIcon,
  RectangleStackIcon,
  Squares2X2Icon as Squares2X2IconOutline,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  Bars4Icon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  Squares2X2Icon as Squares2X2IconMini,
} from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { StarIcon } from '@heroicons/react/20/solid'
import { MarketplaceTabKey } from '../MarketplaceFilterTab';

type SidebarDetailsProps = {
  id: number;
  name: string;
  creatorName: string;
  rating: number;
  thumbnail: string;
  buttons?: any;
  description: string;
}

type GalleryContainerProps = {
  children: any;
  details: SidebarDetailsProps;
  type: MarketplaceTabKey;
}

const GalleryContainer = ({ children, details, type }: GalleryContainerProps) => {  
    return (
        <div className="flex flex-1 items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* Gallery */}
                    <section className="pb-16" aria-labelledby="gallery-heading">
                      {children}
                    </section>
                </div>
            </main>

            {/* Details sidebar */}
            <aside className="hidden w-96 overflow-y-auto border-l border-medium p-8 xl:block">
              <div className="space-y-6 pb-16">
                <div>
                  <div className="aspect-h-1 aspect-w-1 w-80 overflow-hidden rounded-lg bg-darkest">
                      <img
                          src={details.thumbnail || "/images/color-image-placeholder.webp"}
                          className="h-full w-full aspect-square object-cover object-center"
                          loading="lazy"
                      />
                  </div>
                  <div className="mt-4 flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-medium text-lightest">
                        <span className="sr-only">Details for </span>
                        {details.name}
                      </h2>
                      {/* <p className="text-sm font-medium text-light">{details.creatorName}</p> */}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-medium text-lightest">Information</div>
                  <dl className="mt-2 divide-y divide-medium border-b border-t border-medium">
                    {/* Add more information for the card */}
                    <div className="flex justify-between py-3 text-sm font-medium">
                      <dt className="text-lighter">Creator</dt>
                      <dd className="whitespace-nowrap text-lightest">
                        {details.creatorName}
                      </dd>
                    </div>

                    <div className="flex justify-between py-3 text-sm font-medium">
                      <dt className="text-lighter">Rating</dt>
                      <dd className="whitespace-nowrap text-lightest">
                        <div className="flex items-center">             
                            {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                    key={rating}
                                    className={classNames(
                                        details.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                        'h-5 w-5 flex-shrink-0'
                                    )}
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                      </dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <div className="font-medium text-lightest">Description</div>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm italic text-lighter">{details.description}.</p>
                  </div>
                </div>
                {type === MarketplaceTabKey.WORLD_TYPE && (
                  <div className="mt-2 flex">
                    <a href={`/subworlds/${details.id}`} className="text-sm font-semibold leading-6 text-brand">
                      More details <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                )}
                {type === MarketplaceTabKey.WORLD_TYPE && details.buttons}
              </div>
            </aside>
        </div>
    );
}

export default GalleryContainer;
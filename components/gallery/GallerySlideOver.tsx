import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames';
import { MarketplaceTabKey } from '../MarketplaceFilterTab';
import Button from '../Button';

const GallerySlideOver = ({ open, setOpen, details, type }) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none mt-16 fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="pointer-events-auto relative w-[30rem]">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-500"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-500"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                    <button
                                        type="button"
                                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close panel</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                    </div>
                                </Transition.Child>
                                <div className="h-full overflow-y-auto bg-darkest p-8">
                                    <aside className="">
                                        <div className="space-y-6 pb-16">
                                            <div>
                                            <div className="aspect-h-1 aspect-w-1 w-80 overflow-hidden rounded-lg bg-darkest hover:opacity-75">
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
                                            <a href="/subworlds/1" className="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-brand text-dark hover:bg-slate-700">
                                                <span><span className="flex items-center"><svg viewBox="0 0 20 20" className="ml-1.5 h-5 w-5 fill-slate-400" fill-rule="evenodd" clip-rule="evenodd">
                                                    <path d="M10 2.75a7.25 7.25 0 1 0 0 14.5 7.25 7.25 0 0 0 0-14.5ZM1.25 10a8.75 8.75 0 1 1 17.5 0 8.75 8.75 0 0 1-17.5 0Zm9.5-4.083v5.606l1.917-1.917 1.06 1.06L10 14.395l-3.727-3.727 1.06-1.061 1.917 1.917V5.917h1.5Z">
                                                        </path>
                                                        </svg>
                                                        </span>
                                                        </span></a>
                                            {/* {type === MarketplaceTabKey.WORLD_TYPE && details.buttons} */}
                                        </div>
                                        </aside>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default GallerySlideOver;
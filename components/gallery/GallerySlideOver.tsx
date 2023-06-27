import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { CursorArrowRaysIcon, EyeIcon } from '@heroicons/react/24/outline'
import { IoLogoGameControllerB } from "react-icons/io";
import classNames from 'classnames';
import { MarketplaceTabKey } from '../MarketplaceFilterTab';
import PlayIcon from '@heroicons/react/20/solid';
import OverlayImage360Button from '../image360/OverlayImage360Button';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import SubWorldTemplateService from '../../data/services/SubWorldTemplateService';
import StatsService from '../../data/services/StatsService';
import { IncrementTypes } from '../../data/services/StatsService';
const OverlayImage360 = dynamic(() => import('../image360/OverlayImage360'));

const GallerySlideOver = ({ open, setOpen, details, type }) => {
    const [openImage, setOpenImage] = useState(false);
    const [description, setDescription] = useState();

    useEffect(()=> {
        setDescription("");
        if (details.derivativeUri) {
            SubWorldTemplateService.fetchTemplateDescription(details.derivativeUri).then(res => {
                if (res.descriptions)  setDescription(res.descriptions.join(", "));
            });
        }
    }, [details]);

    useEffect(() => {
        if (open && details && details.id)
            StatsService.incrementStats(details.id, IncrementTypes.VIEWS).then(_res => {});
    }, [open]);

    const stats = [
        { name: 'Number of Views', value: `${details.numViews} views`, icon: <EyeIcon className="h-10 w-10" aria-hidden="true" /> },
        { name: 'Number of Clicks', value: `${details.numClicks} clicks`, icon: <CursorArrowRaysIcon className="h-10 w-10" aria-hidden="true" /> },
        { name: 'Number of Plays', value: `${details.numPlays} plays`, icon: <IoLogoGameControllerB className="h-10 w-10" aria-hidden="true" /> },
    ];

    const infomationDetails = [
        {
            label: "Creator",
            value: details.creatorName,
        },
        // {
        //     label: "Views",
        //     value: details.numViews,
        // },
        // {
        //     label: "Plays",
        //     value: details.numPlays,
        // },
        // {
        //     label: "Clicks",
        //     value: details.numClicks,
        // },
        {
            label: "Rating",
            value: (
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
            ),
        },

    ]

    return (
        <>
            <OverlayImage360 source={details.thumbnail} open={openImage} setOpen={setOpenImage} />
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
                                <Dialog.Panel className="pointer-events-auto relative w-[26rem]">
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
                                                    <div className="cursor-pointer aspect-h-1 aspect-w-1 w-80 overflow-hidden rounded-lg bg-darkest hover:opacity-75">
                                                        <img
                                                            src={details.thumbnail || "/images/color-image-placeholder.webp"}
                                                            className="h-full w-full aspect-square object-cover object-center"
                                                            loading="lazy"
                                                            onClick={() => setOpenImage(true)}
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
                                                    <dl className="mt-4 sm:mt-10 border-y border-medium py-6 grid grid-cols-1 gap-x-8 gap-y-10 text-white sm:grid-cols-3 sm:gap-y-16 lg:grid-cols-3">
                                                        {stats.map((stat) => (
                                                            <div key={stat.name} className="flex flex-col items-center gap-y-3">
                                                                <dt className="text-sm leading-6">{stat.value}</dt>
                                                                <dd className="order-first text-3xl font-semibold tracking-tight">{stat.icon}</dd>
                                                            </div>
                                                        ))}
                                                    </dl>
                                                </div>
                                                <div>
                                                    <div className="font-medium text-lightest mt-16">Information</div>
                                                        <dl className="mt-2 divide-y divide-medium border-b border-t border-medium">
                                                            {infomationDetails.map(infoRow => (
                                                                <div className="flex justify-between py-3 text-sm font-medium">
                                                                    <dt className="text-lighter">{infoRow.label}</dt>
                                                                    <dd className="whitespace-nowrap text-lightest">
                                                                        {infoRow.value}
                                                                    </dd>
                                                                </div>
                                                            ))}
                                                        </dl>
                                                    </div>
                                                <div>
                                                    <div className="font-medium text-lightest">Description</div>
                                                    <p className="mt-2 text-sm text-lighter whitespace-pre-line">{description}</p>
                                                </div>           
                                                {type === MarketplaceTabKey.WORLD_TYPE && details.buttons}
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
        </>
    );
}

export default GallerySlideOver;
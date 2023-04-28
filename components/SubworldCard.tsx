import React, { useEffect } from 'react';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import OverlayImage360Button from './image360/OverlayImage360Button';
import PlayModal from './asset/PlayModal';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SubworldCard = ({ data }) => {
    const [showPlayModal, setShowPlayModal] = useState(false);

    return (

        <div className="overflow-hidden rounded-2xl ring-1 ring-inset ring-zinc-900/7.5 dark:ring-white/10 dark:group-hover:ring-white/20 p-6 px-4 pb-4 pt-5 text-left transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="group text-sm">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100">
                    <img
                        src={data.image || "/images/color-image-placeholder.webp"}
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-6 text-white">{data.name}</h3>
                <span className="text-base leading-7 text-gray-400">Creator name</span>
                <div className="mt-3 flex flex-col">
                    <p className="sr-only">{data.rating} out of 5 stars</p>
                    <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                                key={data.rating}
                                className={classNames(
                                    data.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                    'h-5 w-5 flex-shrink-0'
                                )}
                                aria-hidden="true"
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-4 sm:mt-5 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <OverlayImage360Button
                        source={data.image}
                        className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 sm:col-start-1"
                    // className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-1"
                    // onClick={() => setOpen(false)}
                    >
                        Preview
                    </OverlayImage360Button>
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors overflow-hidden bg-cyan-500 text-white active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowPlayModal(true);
                        }}>

                        Launch
                    </button>
                </div>
                {showPlayModal && <PlayModal templateId={data.id} onClose={() => setShowPlayModal(false)} />}
            </div>
        </div>
    )
};


export default SubworldCard;

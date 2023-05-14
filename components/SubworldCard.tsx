import React from 'react';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid'
import OverlayImage360Button from './image360/OverlayImage360Button';
import PlayModal from './asset/PlayModal';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SubworldCard = ({ data }) => {
    const [showPlayModal, setShowPlayModal] = useState(false);

    return (
        <div className="overflow-hidden rounded-lg bg-dark ring-1 ring-inset ring-medium text-left transition-all sm:my-4 sm:w-full sm:max-w-lg">
            <div className="group text-sm">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-100">
                    <img
                        src={data.image || "/images/color-image-placeholder.webp"}
                        className="h-full w-full aspect-square object-cover object-center"
                    />
                </div>
                <div className="p-6">
                    <h3 className="text-lg font-bold text-lightest">{data.name}</h3>
                    <span className="mt-2 text-base text-light">{data.creator.name}</span>
                    <div className="mt-2 flex flex-col">
                        <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                    key={rating}
                                    className={classNames(
                                        data.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                        'h-5 w-5 flex-shrink-0'
                                    )}
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-darkest shadow-sm hover:bg-gray-50 sm:col-start-1 mb-2 sm:mb-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowPlayModal(true);
                            }}>

                            Launch
                        </button>
                        <OverlayImage360Button
                            source={data.image}
                            className="inline-flex w-full justify-center rounded-md py-2 px-3 text-sm font-semibold overflow-hidden border border-brand text-brand"
                        >
                            Preview
                        </OverlayImage360Button>

                    </div>
                </div>
                {showPlayModal && <PlayModal templateId={data.id} onClose={() => setShowPlayModal(false)} />}
            </div>
        </div>
    )
};


export default SubworldCard;

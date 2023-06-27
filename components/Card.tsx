import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';
import classNames from 'classnames';

const Card = ({ name, creatorName, rating, thumbnail, children, numViews, numClicks, ...props }) => {

    return (
        <div className="overflow-hidden rounded-lg bg-dark ring-1 ring-inset ring-medium text-left transition-all sm:my-4 sm:w-full sm:max-w-lg">
            <div className="group text-sm">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-100">
                    <img
                        src={thumbnail || "/images/color-image-placeholder.webp"}
                        className="h-full w-full aspect-[12/10] object-cover object-center bg-darkest"
                        loading="lazy"
                    />
                </div>
                <div className="p-6">
                    <h3 className="text-lg font-bold text-lightest">{name}</h3>
                    <div className="mt-2 text-base text-light">{creatorName || "Deverse World"}</div>
                    {rating && rating !== '' && (
                        <div className="mt-2 flex flex-col">
                            <div className="flex items-center">             
                                {[0, 1, 2, 3, 4].map((_rating) => (
                                    <StarIcon                                
                                        key={`${name}-${creatorName}-${_rating}`}
                                        className={classNames(
                                            rating > _rating ? 'text-yellow-400' : 'text-gray-200',
                                            'h-3 w-3 sm:h-5 sm:w-5 flex-shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            
                        </div>
                    )}
                   {numViews !== undefined && numClicks !== undefined &&
                        <div className="pointer-events-none mt-1 block text-sm font-medium text-lighter">{numViews || 0} Views • {numClicks || 0} Clicks</div>
                    }
                    {children}
                </div>

            </div>
        </div>
    )
};


export default Card;

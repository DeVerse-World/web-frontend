import React from 'react';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Card = ({ name, creatorName, rating, thumbnail, children }) => {
    return (
        <div className="overflow-hidden rounded-lg bg-dark ring-1 ring-inset ring-medium text-left transition-all sm:my-4 sm:w-full sm:max-w-lg">
            <div className="group text-sm">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-100">
                    <img
                        src={thumbnail || "/images/color-image-placeholder.webp"}
                        className="h-full w-full aspect-square object-cover object-center bg-darkest"
                        loading="lazy"
                    />
                </div>
                <div className="p-6">
                    <h3 className="text-lg font-bold text-lightest">{name}</h3>
                    <span className="mt-2 text-base text-light">{creatorName}</span>
                    {rating && rating !== '' && (
                        <div className="mt-2 flex flex-col">
                            <div className="flex items-center">             
                                {[0, 1, 2, 3, 4].map((rating) => (
                                    <StarIcon
                                        key={rating}
                                        className={classNames(
                                            rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                            'h-5 w-5 flex-shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {children}
                    
                </div>

            </div>
        </div>
    )
};


export default Card;

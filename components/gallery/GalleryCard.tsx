import { memo } from "react";
import classNames from "classnames";

type GalleryCardProps = {
    current?: boolean;
    thumbnail: string;
    name: string;
    creatorName: string;
}

const GalleryCard = ({ current, thumbnail, name, creatorName }: GalleryCardProps) => {
    return (
        <div className="relative">
            <div
                className={classNames(
                    current
                    ? 'ring-2 ring-indigo-500 ring-offset-2'
                    : 'focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100',
                    'aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100'
                )}
            >
                <img
                    src={thumbnail}
                    alt=""
                    className={classNames(
                        current ? '' : 'group-hover:opacity-75',
                        'pointer-events-none object-cover'
                    )}
                />
                <button type="button" className="absolute inset-0 focus:outline-none">
                    <span className="sr-only">View details for {name}</span>
                </button>
            </div>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                {name}
            </p>
            <p className="pointer-events-none block text-sm font-medium text-gray-500">{creatorName}</p>
        </div>
    );
}

export default memo(GalleryCard);
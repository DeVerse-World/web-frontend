import { memo } from "react";
import classNames from "classnames";
import { FaCommentsDollar } from "react-icons/fa";
import { StarIcon } from "@heroicons/react/20/solid";
import { Wordlist } from "ethers";
type GalleryCardProps = {
    current?: boolean;
    thumbnail: string;
    name: string;
    creatorName: string;
    index: number;
    rating : string;
    numViews : number;
    numClicks: number;
    numPlays: number;
    setSelectedIndex: (index: number) => void;
}


const GalleryCard = ({ current, id, thumbnail, name, creatorName, index, rating, numViews, numPlays, numWorlds, setSelectedIndex }: GalleryCardProps) => {
    return (
        <div className="relative">
            <div
                className={classNames(
                    current
                    ? 'ring-2 ring-indigo-500 ring-offset-2'
                    : 'focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100',
                    'aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100'
                )}
                onClick={() => setSelectedIndex(index)}
            >
                <img
                    src={thumbnail}
                    alt=""
                    className={classNames(
                        current ? '' : 'group-hover:opacity-75',
                        'pointer-events-none object-cover h-full w-full aspect-[4/3] bg-darkest',
                        
                    )}
                    loading="lazy"
                />
            </div>
            <div className="pointer-events-none mt-3 mb-0.5 block truncate text-sm font-medium text-lightest">
                {name}
            </div>
        
            <div className="pointer-events-none mt-1 block text-sm font-medium text-lighter">{creatorName}</div>
            
            {numViews !== undefined && numPlays !== undefined &&
            <div className="pointer-events-none mt-1 block text-sm font-medium text-lighter">{numViews || 0} Views • {numPlays || 0} Plays</div>
            }
            
            <div className="mt-1">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <dd className="whitespace-nowrap text-lightest">
                        <div className="flex items-center">             
                            {[0, 1, 2, 3, 4].map((_rating) => (
                                <StarIcon
                                    key={rating}
                                    className={classNames(
                                    rating > _rating ? 'text-yellow-400' : 'text-gray-200','h-3 w-3 sm:h-5 sm:w-5 flex-shrink-0'
                            )}
                                    aria-hidden="true"
                            />
                                    ))}
                        </div>
                    </dd>
                    <div className="mt-1 block text-sm font-medium text-lighter">
                        <a href={`/subworlds/${id}`} className="text-sm font-semibold leading-6 text-brand">
                            {numWorlds -1} worlds<span aria-hidden="true">&rarr;</span>
                        </a>
                                    </div>
                </div>
            </div>

        </div>
        
    );
}

export default memo(GalleryCard);
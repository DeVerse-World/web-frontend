import { memo } from "react";
import classNames from "classnames";
import { StarIcon, ViewfinderCircleIcon } from "@heroicons/react/20/solid";
import {
  NumViewsText,
  NumPlaysText,
} from "../../components/cards/CardElements";
import { Button } from "react-bootstrap";

type GalleryCardProps = {
  current?: boolean;
  thumbnail: string;
  name: string;
  creatorName: string;
  index: number;
  rating: string;
  numViews: number;
  numClicks: number;
  numPlays: number;
  setSelectedIndex: (index: number) => void;
};

const GalleryCard = ({
  current,
  id,
  thumbnail,
  name,
  creatorName,
  index,
  rating,
  numViews,
  numPlays,
  numWorlds,
  setSelectedIndex,
}: GalleryCardProps) => {
  return (
    <div>
      <div
        className={classNames(
          current
            ? "ring-2 ring-indigo-500 ring-offset-2"
            : "focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100",
          "aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100"
        )}
        onClick={() => setSelectedIndex(index)}
      >
        <img
          src={thumbnail}
          alt=""
          className={classNames(
            current ? "" : "group-hover:opacity-75",
            "pointer-events-none object-cover h-full w-full aspect-[4/3] bg-darkest"
          )}
          loading="lazy"
        />
      </div>
      <h6 className="mt-3 font-bold text-lightest pointer-events-none truncate">
        {name}
      </h6>
      <div className="text-base text-light">{creatorName}</div>
      <div className="flex flex-wrap">
        {rating !== undefined && (
          <div className="flex my-2 mr-4">
            {[0, 1, 2, 3, 4].map((_rating) => (
              <StarIcon
                key={`${name}-${creatorName}-${_rating}`}
                className={classNames(
                  rating > _rating ? "text-yellow-300" : "text-gray-200",
                  "h-3 w-3 sm:h-5 sm:w-5"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
        )}
        {numViews !== undefined && numPlays !== undefined && (
          <>
            <NumViewsText numViews={numViews} />
            <NumPlaysText numPlays={numPlays} />
          </>
        )}
      </div>
      <Button
        className="secondary-action-button p-0 f-0"
        href={`/subworlds/${id}`}
      >
        <div className="group flex gap-x-2">
          <ViewfinderCircleIcon
            className="h-6 w-6 shrink-0"
            aria-hidden="true"
          />
          {numWorlds - 1} worlds &rarr;
        </div>
      </Button>
    </div>
  );
};

export default memo(GalleryCard);

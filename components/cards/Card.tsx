import { StarIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

interface CardProps {
  title: string;
  subtitle?: string;
  thumbnail?: string;
  rating?: number;
  /** Array of extra information boxes, above CTA buttons. */
  extra?: React.ReactNode[];
  /** Array of CTA buttons. */
  buttons?: React.ReactNode[];
}

const Card = ({
  title,
  subtitle,
  rating,
  thumbnail,
  extra,
  buttons,
  ...props
}: CardProps) => {
  return (
    <div className="overflow-hidden bg-dark-d ring-medium text-left transition-all sm:w-full sm:max-w-lg rounded-border">
      <div className="group text-sm">
        <div className="aspect-h-1 aspect-w-1.5 w-full overflow-hidden rounded-t-lg">
          <img
            src={thumbnail || "/images/color-image-placeholder.webp"}
            alt="Thumbnail image"
            className="h-full w-full aspect-[12/10] object-cover object-center bg-darkest"
            loading="lazy"
            style={{
              borderRadius: "24px 24px 0 0",
            }}
          />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold text-lightest">{title}</h3>
          <div className="text-base text-light">{subtitle}</div>
          <div className="flex flex-wrap">
            {rating !== undefined && (
              <div className="flex my-3 mr-4">
                {[0, 1, 2, 3, 4].map((_rating) => (
                  <StarIcon
                    key={`${title}-${subtitle}-${_rating}`}
                    className={classNames(
                      rating > _rating ? "text-yellow-300" : "text-gray-200",
                      "h-3 w-3 sm:h-5 sm:w-5"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
            )}
            {extra && <div className="flex flex-wrap my-1">{extra}</div>}
          </div>
          {buttons && (
            <div
              className={`flex mt-3 align-items-center ${
                buttons.length > 1
                  ? "justify-content-between"
                  : "justify-content-end"
              } flex-wrap`}
            >
              {buttons}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

import { formatDistance } from 'date-fns';

const EventCard = ({ thumbnail, lastUpdate, name, creatorName, category, children, ...props }) => {
    let lastUpdateDate;
    let lastUpdateText;

    if (lastUpdate) {
        lastUpdateDate = new Date(lastUpdate);
        lastUpdateText = `Updated ${formatDistance(lastUpdateDate, new Date(), { addSuffix: true })}`;
    }

    return (
        <div className="overflow-hidden rounded-lg bg-dark ring-1 ring-inset ring-medium text-left transition-all sm:w-full sm:max-w-lg">
            <div className="group text-sm">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-100">
                    <img
                        src={thumbnail || "/images/color-image-placeholder.webp"}
                        className="h-full w-full aspect-square object-cover object-center bg-darkest"
                        loading="lazy"
                    />
                </div>
                <div className="min-h-[240px] p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-lightest">{name}</h3>
                        <div className="mt-2 text-base text-light">{creatorName || "Deverse World"}</div>
                        {category && <div className="mt-2 text-sm font-semibold text-lighter">{category}</div>}
                        {lastUpdate && <div className="mt-2 text-base text-lighter">{lastUpdateText}</div>}
                    </div>
                    
                    {children}
                    
                </div>

            </div>
        </div>
    )
}

export default EventCard;
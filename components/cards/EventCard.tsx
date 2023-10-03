import { formatDistance } from "date-fns";

import Card from "../cards/Card";

const EventCard = ({
  thumbnail,
  lastUpdate,
  name,
  creatorName,
  category,
  children,
  ...props
}) => {
  let lastUpdateDate;
  let lastUpdateText;

  if (lastUpdate) {
    lastUpdateDate = new Date(lastUpdate);
    lastUpdateText = `Updated ${formatDistance(lastUpdateDate, new Date(), {
      addSuffix: true,
    })}`;
  }

  return (
    <Card
      thumbnail={thumbnail}
      title={name}
      subtile={creatorName}
      extra={lastUpdateText}
      {...props}
    />
  );
};

export default EventCard;

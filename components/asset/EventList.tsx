import { EventCategory } from "../../data/enum/asset_type";
import InfiniteList from "../marketplace/InfiniteList";
import Card from "../../components/cards/Card";
import { TimeAgoText } from "../../components/cards/CardElements";

type EventListProps = {
  data: EventViewModel[];
  cardType: string;
  onDeleted?: (EventViewModel) => void;
};
const itemPerPage = 4;

export default function EventList({ data, ...props }: EventListProps) {
  return <InfiniteList items={data} {...props} />;
}

type EventCardProps = {
  key: number;
  data: EventViewModel;
  // onDeleted: (AvatarViewModel) => void
};
export type EventViewModel = {
  id?: string;
  name?: string;
  author?: string;
  description?: string;
  category?: EventCategory;
  image?: string;
  startDate?: string;
  stage?: string;
  deletable?: boolean;
  lastUpdate?: string;
  eventConfigUri: string;
  participants: number;
};

export function EventCard(props: EventCardProps) {
  return (
    <Card
      thumbnail={props.data.image || "/images/color-image-placeholder.webp"}
      title={props.data.name || ""}
      subtile={props.data.author || "Deverse World"}
      extra={[<TimeAgoText text={props.data.lastUpdate} />]}
      {...props}
    />
  );
}

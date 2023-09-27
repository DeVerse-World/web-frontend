// Elements placed in cards used in different pages.
import {
  PlayIcon,
  EyeIcon,
  CursorArrowRippleIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { Button } from "react-bootstrap";
import { VideoCameraIcon } from "@heroicons/react/24/outline";

export const NumViewsText = ({ numViews, ...props }) => (
  <div className="flex align-items-center">
    <PlayIcon className="h-5 w-5" aria-hidden="true" />
    {numViews || 0}
  </div>
);

export const NumPlaysText = ({ numPlays, ...props }) => (
  <div className="flex align-items-center ml-4">
    <EyeIcon className="h-5 w-5 mr-1" aria-hidden="true" />
    {numPlays || 0}
  </div>
);

export const NumClicksText = ({ numClicks, ...props }) => (
  <div className="flex align-items-center ml-4">
    <CursorArrowRippleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
    {numClicks || 0}
  </div>
);

export const TimeAgoText = ({ text, ...props }) => (
  <div className="flex align-items-center">
    <CalendarDaysIcon className="h-5 w-5 mr-2" aria-hidden="true" />
    {text}
  </div>
);

export const PreviewButton = ({ onClick }) => (
  <Button className="secondary-action-button" onClick={onClick}>
    <div className="group flex gap-x-2">
      <VideoCameraIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
      Preview
    </div>
  </Button>
);

export const LaunchButton = ({ onClick }) => (
  <Button className="action-button" onClick={onClick}>
    <div className="group flex align-items-center  gap-x-2">
      <PlayIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
      Launch
    </div>
  </Button>
);

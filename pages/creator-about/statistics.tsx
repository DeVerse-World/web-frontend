import {
  CheckBadgeIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";
import CardStatPrimary from "../../components/cards/CardStatPrimary";
import CardStatSecondary from "../../components/cards/CardStatSecondary";

const Statistics = () => {
  return (
    <section className="w-full px-4">
      <div className="flex flex-wrap">
        <CardStatPrimary number={0} subtitle={"plays"} />
        <CardStatSecondary
          number={0}
          subtitle="clicks"
          iconComponent={
            <CursorArrowRaysIcon
              className="h-16 w-16 shrink-0"
              aria-hidden="true"
              style={{
                color: "#FEEB00",
              }}
            />
          }
        />
        <CardStatSecondary
          number={0}
          subtitle="views"
          iconComponent={
            <CheckBadgeIcon
              className="h-14 w-14 shrink-0"
              aria-hidden="true"
              style={{
                color: "#96FEDE",
              }}
            />
          }
        />
      </div>
    </section>
  );
};

export default Statistics;

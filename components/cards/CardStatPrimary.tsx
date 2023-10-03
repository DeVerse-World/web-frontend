import { PlayIcon } from "@heroicons/react/20/solid";

const CardStat = ({ number, subtitle, ...props }) => {
  return (
    <div className="flex align-items-center rounded-border bg-deverse-secondary m-2 pl-10">
      <div
        style={{
          background: "#DCBFF9",
          borderRadius: "15px",
          width: "70px",
          height: "70px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PlayIcon
          className="h-9 w-9 shrink-0"
          aria-hidden="true"
          style={{
            color: "rgb(4, 15, 22)",
          }}
        />
      </div>
      <div className="px-8">
        <h1 style={{ fontWeight: 700 }}>{number}</h1>
        <h6>{subtitle}</h6>
      </div>
    </div>
  );
};

export default CardStat;

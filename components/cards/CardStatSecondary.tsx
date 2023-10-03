const CardSecondary = ({ number, subtitle, iconComponent, ...props }) => {
  return (
    <div className="flex rounded-border bg-deverse-secondary m-2">
      <div className="px-12 pt-14 pb-10">
        <h3 style={{ fontWeight: 500 }}>{number}&nbsp;</h3>
        <h6>{subtitle}</h6>
      </div>
      <div style={{ padding: "15px", marginLeft: "-45px" }}>
        {iconComponent}
      </div>
    </div>
  );
};

export default CardSecondary;

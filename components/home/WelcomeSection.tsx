function WelcomeSection(props) {
  return (
    <section className="py-8 text-white bg-[url('/images/background-deverse.png')] h-full w-full bg-cover bg-center h-[750px]">
      <div className="col-lg-8 mx-auto text-center">
        <h6 className="mb-4 text-xl font-bold" style={{ textShadow: "-2px 0px #21EFE8,2px 0px #EB3BEC" }}>WELCOME TO DEVERSE</h6>
        <h1 className="title uppercase" style={{
          fontWeight: 900,
          fontSize: "4.5rem",
          textShadow: "0 0 10px #FF0000, 0 0 10px #0000FF",
          // fontFamily: "Poppins,sans-serif"
        }} >A Sandbox (De)centralized Meta(Verse)</h1>
      </div>

    </section>
  );
}

export default WelcomeSection;
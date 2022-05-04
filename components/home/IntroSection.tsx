import React, { useState, useEffect } from "react";

const iframeWrapper: React.CSSProperties = {
  position: "relative",
  paddingBottom: "56.25%",
  height: 0,
}

function IntroSection(props) {

  return (
    <section className="h-[800px] py-8" >


        {/* <div className="m-auto" style={iframeWrapper}> */}
        <iframe
          className="rounded-[12px] w-[75vw] h-[650px] m-auto"
          src="https://www.youtube.com/embed/qEdULCHiAZE"
          title="Deverse Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen />
        {/* </div> */}


      
    </section>
  );
}

export default IntroSection;

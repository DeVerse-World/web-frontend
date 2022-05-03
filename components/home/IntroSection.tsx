import React, { useState, useEffect } from "react";

const iframeWrapper : React.CSSProperties = {
  position: "relative",
  paddingBottom: "56.25%",
  height: 0,
}

function IntroSection(props) {

  return (
    <section className="pt-4 bg-gradient-to-b from-black to-gray-700">
      <div className="m-auto" style={iframeWrapper}>
        <iframe
          className="rounded-[12px] absolute top-0 left-0 bottom-0 right-0 mx-auto w-[90%] h-[90%]" 
          src="https://www.youtube.com/embed/qEdULCHiAZE"
          title="Deverse Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen />
      </div>
    </section>
  );
}

export default IntroSection;

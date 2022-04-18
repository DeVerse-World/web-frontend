import React, { useState, useEffect } from "react";



function IntroSection(props) {
  return (
    <section className="flex flex-col p-4">
      <div className="row text-center">
        <h6 className="mb-4 text-6xl font-bold">What is Deverse?</h6>
        <h1 className="">Deverse is something, place holder here</h1>
      </div>
      <div className="m-auto">
        <iframe width="880"
          height="515"
          className="rounded-[12px]"
          src="https://www.youtube.com/embed/jnl_2Uui68k"
          title="Deverse Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen />

      </div>

    </section>
  );
}

export default IntroSection;

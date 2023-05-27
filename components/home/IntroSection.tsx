import React, { useEffect, useState } from "react";
import FirebaseService from "../../data/services/FirebaseService";
import classNames from 'classnames';


const iframeWrapper: React.CSSProperties = {
  position: "relative",
  paddingBottom: "56.25%",
  height: 0,
}

export default function IntroSection() {
  const [videoUrl, setVideoUrl] = useState();

  useEffect(() => {
    FirebaseService.getIntroSectionVideoUrl().then(setVideoUrl)
  }, [])

  return (
    <div className={classNames(
      "pb-20 pt-20 sm:pt-48 lg:pb-48 px-16 lg:px-20 flex flex-col lg:flex-row items-center justify-center gap-14 lg:gap-20",
      "lg:flex-row-reverse",
      "bg-gray-950"
    )}>
      <div className="mx-auto flex max-w-md flex-col">
        <h2 className="text-3xl font-bold tracking-tight text-light sm:text-5xl">
          Beyond the metaverse
        </h2>
        <p className="mt-3 text-lg text-lighter">
        Discover hidden dimensions, encounter amazing creatures, and unlock the magic of a limitless universe.
        </p>
      </div>

      <div className="shrink-0 rounded-lg xl:order-2 aspect-h-1 aspect-w-1 w-[32rem] sm:w-[40rem] lg:w-7/12 overflow-hidden">
          <iframe
            className="h-full w-full aspect-video object-cover object-center"
            src={videoUrl}
            title="Deverse World Alpha"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen />
      </div>
    </div>
  );
}

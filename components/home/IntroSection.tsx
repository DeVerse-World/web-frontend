import React, { useEffect, useState } from "react";
import FirebaseService from "../../data/services/FirebaseService";


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
    <section id="section-demo-video" style={iframeWrapper}>
      <iframe
        className="rounded-xl w-[75%] h-[75%] m-auto absolute inset-0"
        src={videoUrl}
        title="Deverse World Alpha"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen />
    </section>
  );
}

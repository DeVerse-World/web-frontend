import ActionButton from "../ActionButton";
import EpicDownloadButton from "../EpicDownloadButton";
import { Button } from "react-bootstrap";

export default function WelcomeSection({
  placeholder,
  imageHeadPage,
  introVideoUrl,
  partners = [],
  communityPartners = [],
}) {
  console.log("imageHeadPage:", imageHeadPage);
  return (
    <div style={{ position: 'relative' }}>
      <div className="inset-0 flex items-center justify-center z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full absolute inset-0"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
          }}
          alt="banner"
        >
          <source src={"images/Header-Video.webm"} type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* <img
          src={"images/homepage-header.webp"}
          className="absolute w-full h-full inset-0"
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
          }}
          alt="banner"
        /> */}
        <div
          className="absolute inset-0 bg-black opacity-60"
          style={{ zIndex: 1, width: "100vw", height: "100vh" }}
        ></div>
      </div>

      <div className="flex justify-center h-screen">
        <div className="z-10 pl-6 lg:pl-8 xl:pl-12">
          <div className="mx-auto pt-48">
            <div className="text-center">
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-5xl deverse-header">
                Deverse World
              </h1>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-4">
                <div className="flex flex-row items-center justify-center gap-x-4 mt-4 mb-4">
                  <div className="text-center font-bold">
                    EARLY ACCESS
                  </div>
                  <div className="shrink-0">                  
                    <EpicDownloadButton
                      href="https://store.epicgames.com/en-US/p/deverse-world-3ccb84"
                      imgSrc="/images/epicgames-icon.png"
                      buttonText=""
                      disabled={false}
                    />
                  </div>
                  <div className="text-center font-bold">
                    COMING SOON
                  </div>
                  <div className="shrink-0">
                    <EpicDownloadButton
                        href=""
                        imgSrc="/images/steam-icon.png"
                        buttonText=""
                        disabled={true}
                    />
                  </div>
                </div>
                <div className="font-bold mb-2">GET YOUR ISLES [COMING SOON]</div>
                <div className="flex flex-row items-center justify-center gap-x-4">
                  <ActionButton
                    href="https://www.sphere.market"
                    buttonText=""
                    disabled={true}
                    imgSrc="/images/SphereMarket.png"
                  />
                  <ActionButton
                    href="https://www.opensea.io"
                    buttonText=""
                    disabled={true}
                    imgSrc="/images/OpenSea.png"
                  />
                </div>
                {/* <Button
                  className="important-action-button mt-3"
                  
                  target="_blank"
                >
                  <div className="group flex">Get your Isle</div>
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo cloud (positioned below the content) */}
      {/* <div
        className="bottom-0 left-0 right-0 p-4 grid items-center gap-x-8 gap-y-10 sm:gap-x-10 lg:mx-0 xl:grid-cols-6 md:grid-cols-3 z-12"
        style={{
          position: "relative",
          background: "rgba(0, 0, 0, 0.6)",
          zIndex: 5
        }}
      >
        {[...partners, ...communityPartners].map((partner) => (
          <img
            key={partner.id}
            className="max-h-12 w-full object-contain col-span-1"
            src={partner.thumbnail}
            alt={partner.id}
            width={158}
            height={48}
          />
        ))}
      </div> */}
    </div>
  );
}

export default function WelcomeSection({
  placeholder,
  imageHeadPage,
  introVideoUrl,
  partners = [],
  communityPartners = [],
}) {
  console.log("imageHeadPage:", imageHeadPage);
  return (
    <div className="relative">
      <div className="inset-0 flex items-center justify-center z-0">
        {/* <video
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
          }}
        >
          <source src={"images/Deverse World Introduction Video.webm"} type="video/webm" />
          Your browser does not support the video tag.
        </video> */}
        <img
          src={"images/homepage-header.webp"}
          className="absolute w-full h-full inset-0"
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
          }}
          alt="banner"
        />
        <div
          className="absolute inset-0 bg-black opacity-60"
          style={{ zIndex: 1, width: "100vw", height: "100vh" }}
        ></div>
      </div>

      <div className="flex justify-center h-screen">
        <div className="relative z-10 pl-6 lg:pl-8 xl:pl-12">
          <div className="mx-auto pt-48">
            <div className="text-center">
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-5xl deverse-header">
                Deverse World
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Where adventure meets opportunity, where worlds are
                interconnected
              </p>

              {/* <div className="mt-10 flex items-center gap-x-4 justify-center"> // TODO @AH this has wrong Z
                <EpicDownloadButton />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Logo cloud (positioned below the content) */}
      <div
        className="bottom-0 left-0 right-0 p-4 grid items-center gap-x-8 gap-y-10 sm:gap-x-10 lg:mx-0 xl:grid-cols-6 md:grid-cols-3"
        style={{ background: "rgba(0, 0, 0, 0.6)", zIndex: 1 }}
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
      </div>
    </div>
  );
}

import { Carousel } from "react-bootstrap";
import DownloadDemoButton from "../DownloadDemoButton";
import Image from "next/image";


function renderShowcaseItem(src: String) {
  return (
    <Carousel.Item className="h-screen w-screen">
      {/* <div className="h-screen w-screen " style={{
        background: `url('${src}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      </div> */}
      <Image src={src} layout="fill"/>
    </Carousel.Item>
  )
}



function WelcomeSection(props) {
  return (
    <section id="section-slider" className="relative min-h-[500px] h-screen">
      <div className="flex flex-col items-center justify-items-start absolute z-10 w-[100%]">
        <div className=" mx-auto text-center">
          <h6 className="mt-24 text-lg font-bold txt-deverse-gradient" >WELCOME TO DEVERSE WORLD</h6>
          <h1 className="mt-4 deverse-title uppercase txt-deverse-gradient ">Your portal to the endless virtual world experiences, owned by the users</h1>
        </div>
        <DownloadDemoButton className="h-12" />
      </div>
      <Carousel interval={10000}>
        {renderShowcaseItem('/images/01.webp')}
        {renderShowcaseItem('/images/02.webp')}
        {renderShowcaseItem('/images/03.webp')}
        {renderShowcaseItem('/images/04.webp')}
        {renderShowcaseItem('/images/05.webp')}
        {renderShowcaseItem('/images/06.webp')}
      </Carousel>

    </section>

  );
}

export default WelcomeSection;


import { Carousel, Image } from "react-bootstrap";
import DownloadDemoButton from "../DownloadDemoButton";


function renderShowcaseItem(src: String) {
  return (
    <Carousel.Item>
      <div className="h-screen w-screen " style={{
        background: `url('${src}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      </div>
    </Carousel.Item>
  )
}



function WelcomeSection(props) {
  return (
    <section id="section-slider" className="relative min-h-[500px] h-screen">
      <div className="flex flex-col items-center justify-items-start absolute z-10 w-[100%]">
        <div className=" mx-auto text-center">
          <h6 className="mt-24 text-lg font-bold txt-deverse-gradient" >WELCOME TO DEVERSE WORLD</h6>
          <h1 className="mt-4 deverse-title uppercase txt-deverse-gradient ">A Sandbox (De)centralized Meta(Verse)</h1>
        </div>
        <DownloadDemoButton className="h-12" />
      </div>
      <Carousel interval={10000}>
        {renderShowcaseItem('/images/01.png')}
        {renderShowcaseItem('/images/02.png')}
        {renderShowcaseItem('/images/03.png')}
        {renderShowcaseItem('/images/04.png')}
        {renderShowcaseItem('/images/05.png')}
        {renderShowcaseItem('/images/06.png')}
      </Carousel>

    </section>

  );
}

export default WelcomeSection;


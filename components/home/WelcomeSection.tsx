import { Carousel, Image } from "react-bootstrap";
import DownloadDemoButton from "../DownloadDemoButton";


function renderShowcaseItem(src: String) {
  return (
    <Carousel.Item>
      <div className="flex flex-col justify-between" style={{
        background: `url('${src}')`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
      }} >
      </div>
    </Carousel.Item>
  )
}

function WelcomeSection(props) {
  return (
    <section id="section-slider" className="relative min-h-[500px] h-screen">
      <Carousel interval={10000}>
        <Carousel.Item>
          <div className="bg-[url('/images/02.png')] bg-cover bg-center h-screen flex flex-col items-center justify-items-start">
            <div className=" mx-auto text-center">
              <h6 className="mt-24 text-xl font-bold txt-deverse-gradient" >WELCOME TO DEVERSE</h6>
              <h1 className="mt-4 deverse-title uppercase txt-deverse-gradient ">A Sandbox (De)centralized Meta(Verse)</h1>

            </div>
            <DownloadDemoButton className="h-12"/>
          </div>
        </Carousel.Item>
        {renderShowcaseItem('/images/01.png')}
        {renderShowcaseItem('/images/03.png')}
        {renderShowcaseItem('/images/04.png')}
        {renderShowcaseItem('/images/05.png')}
        {renderShowcaseItem('/images/06.png')}
      </Carousel>

    </section>

  );
}

export default WelcomeSection;


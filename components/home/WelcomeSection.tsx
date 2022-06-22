import { Carousel, Image } from "react-bootstrap";

function renderShowcaseItem(src: String) {
  return (
    <Carousel.Item>
      <div className="flex flex-col justify-between" style={{
        background: `url('${src}')`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position:"relative"
      }} >
      </div>
    </Carousel.Item>
  )
}

function WelcomeSection(props) {
  return (
    <section className="" style={{
      position: "relative",
      minHeight: "500px",
      height: "100vh"
    }}>
      <Carousel interval={10000}>
        <Carousel.Item>
          <div className="bg-[url('/images/02.png')] bg-cover bg-center h-[100vh] flex flex-col justify-between">
            <div className=" mx-auto text-center">
              <h6 className="mt-24 text-xl font-bold txt-deverse-gradient" >WELCOME TO DEVERSE</h6>
              <h1 className="mt-4 deverse-title uppercase txt-deverse-gradient ">A Sandbox (De)centralized Meta(Verse)</h1>
            </div>
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


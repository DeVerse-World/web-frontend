import { Carousel, Image } from "react-bootstrap";

function renderShowcaseItem(src: String) {
  return (
    <Carousel.Item>
      <div className="flex flex-col-reverse" style={{
        background: `url('${src}')`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }} >
        <div style={{
          backgroundImage: "linear-gradient(rgba(72,34,122,0.2), rgba(72,34,122,0.4) 75%, rgba(16, 22, 68,0.9))",
          height: "16px",
        }}></div>
      </div>
    </Carousel.Item>
  )
}

function WelcomeSection(props) {
  return (
    <section className="bg-black " style={{
      position: "relative",
      minHeight: "500px",
      height: "100vh"
    }}>
      <Carousel interval={10000}>
        <Carousel.Item>
          <div className="bg-[url('/images/02.png')] bg-cover bg-center h-[100vh] flex flex-col justify-between">
            <div className=" mx-auto text-center ">
              <h6 className="mt-24 text-xl font-bold deverse-gradient-text" >WELCOME TO DEVERSE</h6>
              <h1 className="mt-4 deverse-title uppercase deverse-gradient-text ">A Sandbox (De)centralized Meta(Verse)</h1>
            </div>
            <div style={{
              backgroundImage: "linear-gradient(rgba(72,34,122,0.2), rgba(72,34,122,0.4) 75%, rgba(16, 22, 68,0.9))",
              height: "16px",
            }}></div>
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


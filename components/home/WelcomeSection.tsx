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
        {renderShowcaseItem('https://firebasestorage.googleapis.com/v0/b/deverse-357506.appspot.com/o/static%2F01.webp?alt=media&token=ffab7251-7a3d-4875-9dca-383b72f51b8a')}
        {renderShowcaseItem('https://firebasestorage.googleapis.com/v0/b/deverse-357506.appspot.com/o/static%2F02.webp?alt=media&token=4445d32a-932b-40e4-869b-dcac932b6832')}
        {renderShowcaseItem('https://firebasestorage.googleapis.com/v0/b/deverse-357506.appspot.com/o/static%2F03.webp?alt=media&token=72b5a184-0c53-4009-bd0f-334e7ad61f36')}
        {renderShowcaseItem('https://firebasestorage.googleapis.com/v0/b/deverse-357506.appspot.com/o/static%2F04.webp?alt=media&token=4f7ae674-4c82-4c2b-b3b7-a4aa2bdee4b6')}
        {renderShowcaseItem('https://firebasestorage.googleapis.com/v0/b/deverse-357506.appspot.com/o/static%2F05.webp?alt=media&token=f27013fc-92ea-4237-8b2e-5f64bd36e232')}
        {renderShowcaseItem('https://firebasestorage.googleapis.com/v0/b/deverse-357506.appspot.com/o/static%2F06.webp?alt=media&token=34b2d9cf-576d-4f22-9d8c-0a41fcfe9005')}
      </Carousel>

    </section>

  );
}

export default WelcomeSection;


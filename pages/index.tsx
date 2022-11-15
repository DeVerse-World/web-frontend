import IntroSection from '../components/home/IntroSection';
import React, { useEffect } from "react";
import ProductSection from '../components/home/ProductsSection';
import WelcomeSection from '../components/home/WelcomeSection';
import HighlightFeatureSection from '../components/home/HighlightFeaturesSection';
import Footer from '../components/common/Footer';
import BlogPostSection from '../components/home/BlogPostSection';

function Home(props) {

  return (
    <div id='section-content'>
      <WelcomeSection />
      <IntroSection />
      <HighlightFeatureSection />
      <ProductSection />
      <div className='text-white p-4 flex flex-row justify-center'>
        <a id='pitch-deck-btn' className="rounded-md bg-deverse-gradient w-[250px] 
                uppercase cursor-pointer h-12 no-underline text-white
                flex flex-row justify-center items-center"
          href='https://www.canva.com/design/DAFJreBYRUI/rRSqsPiikMYP7wXohxTbWw/view?utm_content=DAFJreBYRUI&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink#5'
          target="_blank">
          <span className="text-lg font-black" >Pitch Deck</span>
        </a>
      </div>
      <BlogPostSection />
      <Footer />
    </div>
  );
}

export default Home;

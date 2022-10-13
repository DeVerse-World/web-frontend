import IntroSection from '../components/home/IntroSection';
import React, {  } from "react";
import ProductSection from '../components/home/ProductsSection';
import WelcomeSection from '../components/home/WelcomeSection';
import HighlightFeatureSection from '../components/home/HighlightFeaturesSection';
import Footer from '../components/common/Footer';

function Home(props) {
  return (
    <div id='section-content'>
      <WelcomeSection />
      <IntroSection />
      <HighlightFeatureSection />
      <ProductSection />
      <Footer />
    </div>
  );
}

export default Home;

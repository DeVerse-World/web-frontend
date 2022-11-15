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
      <BlogPostSection />
      <Footer />
    </div>
  );
}

export default Home;

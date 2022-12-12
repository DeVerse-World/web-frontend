import IntroSection from '../components/home/IntroSection';
import React, { useContext, useEffect, useState } from "react";
import ProductSection from '../components/home/ProductsSection';
import WelcomeSection from '../components/home/WelcomeSection';
import HighlightFeatureSection from '../components/home/HighlightFeaturesSection';
import Footer from '../components/common/Footer';
import BlogPostSection from '../components/home/BlogPostSection';
import FirebaseService from "../data/services/FirebaseService";
import PartnerSection from '../components/home/PartnerSection';
import { AppContext } from '../components/contexts/app_context';
import TeamMemberSection from '../components/home/TeamMemberSection';
import AdvisorSection from '../components/home/AdvisorSection';

function Home(props) {
  const [showBlogToggle, setShowBlogToggle] = useState(false);
  const { remoteConfig } = useContext(AppContext);
  useEffect(() => {
    if (remoteConfig != null)
      FirebaseService.getShouldShowBlogToggle(remoteConfig).then(setShowBlogToggle)
  }, [remoteConfig])

  return (
    <div id='section-content'>
      <WelcomeSection />
      <IntroSection />
      <HighlightFeatureSection />
      <ProductSection />
      <TeamMemberSection/>
      <AdvisorSection/>
      <PartnerSection />
      {/* {showBlogToggle ?
        <BlogPostSection />
        : null
      } */}
      <Footer />
    </div>
  );
}

export default Home;

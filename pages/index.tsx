import IntroSection from '../components/home/IntroSection';
import React, { useContext, useEffect, useState } from "react";
import ProductSection from '../components/home/ProductsSection';
import WelcomeSection from '../components/home/WelcomeSection';
import HighlightFeatureSection from '../components/home/HighlightFeaturesSection';
import BlogPostSection from '../components/home/BlogPostSection';
import FirebaseService from "../data/services/FirebaseService";
import PartnerSection from '../components/home/PartnerSection';
import { AppContext } from '../components/contexts/app_context';
import TeamMemberSection from '../components/home/TeamMemberSection';
import AdvisorSection from '../components/home/AdvisorSection';
import CommunityPartnerSection from '../components/home/CommunityPartnerSection';
import LayoutWrapper from '../components/LayoutWrapper';

function Main(props) {
  const [showBlogToggle, setShowBlogToggle] = useState(false);
  const { remoteConfig } = useContext(AppContext);


  useEffect(() => {
    if (remoteConfig != null)
      FirebaseService.getShouldShowBlogToggle(remoteConfig).then(setShowBlogToggle)
  }, [remoteConfig])

  return (
    <LayoutWrapper>
      <div id="section-content" className='flex flex-col'>
        <WelcomeSection />
        {/* <IntroSection />
        <HighlightFeatureSection />
        <ProductSection />
        <TeamMemberSection />
        <AdvisorSection />
        <PartnerSection />
        <CommunityPartnerSection />
        {showBlogToggle ?
          <BlogPostSection />
          : null
        } */}
      </div>
    </LayoutWrapper>
  );
}

export default Main;
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
import { getLayoutWithFooter } from '../components/LayoutWithFooter';

function Home(props) {
  const [showBlogToggle, setShowBlogToggle] = useState(false);
  const { remoteConfig } = useContext(AppContext);


  useEffect(() => {
    if (remoteConfig != null)
      FirebaseService.getShouldShowBlogToggle(remoteConfig).then(setShowBlogToggle)
  }, [remoteConfig])

  return (
    <div className='flex flex-col'>
      <WelcomeSection />
      <IntroSection />
      <HighlightFeatureSection />
      <ProductSection />
      <TeamMemberSection />
      <AdvisorSection />
      <PartnerSection />
      <CommunityPartnerSection />
      {showBlogToggle ?
        <BlogPostSection />
        : null
      }
    </div>
  );
}

Home.getLayout = getLayoutWithFooter;
export default Home;

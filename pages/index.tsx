import React, { useContext, useEffect, useState } from "react";
import WelcomeSection from '../components/home/WelcomeSection';
import FirebaseService from "../data/services/FirebaseService";
import { AppContext } from '../components/contexts/app_context';
import LayoutWrapper from '../components/LayoutWrapper';
import dynamic from 'next/dynamic';

const IntroSection = dynamic(() => import('../components/home/IntroSection').then((mod) => mod.default))
const ProductSection = dynamic(() => import('../components/home/ProductsSection').then((mod) => mod.default))
const HighlightFeatureSection = dynamic(() => import('../components/home/HighlightFeaturesSection').then((mod) => mod.default))
const BlogPostSection = dynamic(() => import('../components/home/BlogPostSection').then((mod) => mod.default))
const PartnerSection = dynamic(() => import('../components/home/PartnerSection').then((mod) => mod.default))
const TeamMemberSection = dynamic(() => import('../components/home/TeamMemberSection').then((mod) => mod.default))
const AdvisorSection = dynamic(() => import('../components/home/AdvisorSection').then((mod) => mod.default))
const CommunityPartnerSection = dynamic(() => import('../components/home/CommunityPartnerSection').then((mod) => mod.default))

function Main() {
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
    </LayoutWrapper>
  );
}

export default Main;
import React, { useContext, useEffect, useState } from "react";
import WelcomeSection from '../components/home/WelcomeSection';
import FirebaseService from "../data/services/FirebaseService";
import { AppContext } from '../components/contexts/app_context';
import LayoutWrapper from '../components/LayoutWrapper';
import dynamic from 'next/dynamic';

const IntroSection = dynamic(() => import('../components/home/IntroSection').then((mod) => mod.default))
const HighlightFeatureSection = dynamic(() => import('../components/home/HighlightFeaturesSection').then((mod) => mod.default))
const BlogPostSection = dynamic(() => import('../components/home/BlogPostSection').then((mod) => mod.default))

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
        {showBlogToggle ?
          <BlogPostSection />
          : null
        }
      </div>
    </LayoutWrapper>
  );
}

export default Main;
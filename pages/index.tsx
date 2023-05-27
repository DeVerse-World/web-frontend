import React, { useContext, useEffect, useState } from "react";
import WelcomeSection from '../components/home/WelcomeSection';
import FirebaseService from "../data/services/FirebaseService";
import { AppContext } from '../components/contexts/app_context';
import dynamic from 'next/dynamic';
import PartnerSection from "../components/home/PartnerSection";
import CommunityPartnerSection from "../components/home/CommunityPartnerSection";

const IntroSection = dynamic(() => import('../components/home/IntroSection').then((mod) => mod.default))
const HighlightFeatureSection = dynamic(() => import('../components/home/HighlightFeaturesSection').then((mod) => mod.default))
const BlogPostSection = dynamic(() => import('../components/home/BlogPostSection').then((mod) => mod.default))

export const getStaticProps = async () => {
  const [partners, communityPartners, placeholder, introVideoUrl] = await Promise.all([
    FirebaseService.getPartners(),
    FirebaseService.getComunityPartners(),
    FirebaseService.getWelcomeImage(),
    FirebaseService.getIntroSectionVideoUrl(),
  ]);

  return {
    props: {
      partners,
      communityPartners,
      placeholder,
      introVideoUrl,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
};

function Main({
  introVideoUrl,
  placeholder = "https://firebasestorage.googleapis.com/v0/b/deverse-357506.appspot.com/o/static%2F01.webp?alt=media&token=ffab7251-7a3d-4875-9dca-383b72f51b8a",
  partners = [],
  communityPartners = [],
}) {
  const [showBlogToggle, setShowBlogToggle] = useState(false);
  const { remoteConfig } = useContext(AppContext);

  useEffect(() => {
    if (remoteConfig != null)
      FirebaseService.getShouldShowBlogToggle(remoteConfig).then(setShowBlogToggle)
  }, [remoteConfig])

  return (
      <div className='flex flex-col bg-darkest'>
        <WelcomeSection
          placeholder={placeholder}
          partners={partners}
          communityPartners={communityPartners}
          introVideoUrl={introVideoUrl}
        />
        <IntroSection />
        <div className="px-16 lg:px-20">
          <HighlightFeatureSection />
          {/*
            <PartnerSection />
            <CommunityPartnerSection />
            */}
          {showBlogToggle ?
            <BlogPostSection />
            : null
          }
        </div>
      </div>
  );
}

export default Main;

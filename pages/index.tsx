import { useContext, useEffect, useState } from "react";
import WelcomeSection from "../components/home/WelcomeSection";
import FirebaseService from "../data/services/FirebaseService";
import { AppContext } from "../components/contexts/app_context";
import dynamic from "next/dynamic";
import Popup from "../components/Popup";
import TrendingSection from "../components/home/TrendingSection";
import PartnerSection from "../components/home/PartnerSection";
import FaqSection from "../components/home/FaqSection";

const IntroSection = dynamic(() =>
  import("../components/home/IntroSection").then((mod) => mod.default)
);
const HighlightFeatureSection = dynamic(() =>
  import("../components/home/HighlightFeaturesSection").then(
    (mod) => mod.default
  )
);
const BlogPostSection = dynamic(() =>
  import("../components/home/BlogPostSection").then((mod) => mod.default)
);

export const getStaticProps = async () => {
  const [partners, communityPartners, placeholder, introVideoUrl] =
    await Promise.all([
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
    // - At most once every X seconds
    revalidate: 60 * 60, // In seconds
  };
};

function Main({
  introVideoUrl,
  placeholder = null,
  partners = [],
  communityPartners = [],
}) {
  const [showBlogToggle, setShowBlogToggle] = useState(false);
  const { remoteConfig } = useContext(AppContext);
  const [imageHeadPage, setImageHeadPage] = useState();
  const [videoHeadPage, setVideoHeadPage] = useState();
  const imgPlaceHolder = placeholder || imageHeadPage;

  useEffect(() => {
    if (remoteConfig != null)
      FirebaseService.getShouldShowBlogToggle(remoteConfig).then(
        setShowBlogToggle
      );

    FirebaseService.getImageHeadPage().then(setImageHeadPage);
    FirebaseService.getVideoHeadPage().then(setVideoHeadPage);
  }, [remoteConfig]);

  return (
    <div className="flex flex-col bg-darkest">
      {/* <Popup /> */}
      <WelcomeSection
        placeholder={imgPlaceHolder}
        imageHeadPage={videoHeadPage}
        partners={partners}
        communityPartners={communityPartners}
        introVideoUrl={introVideoUrl}
      />

      {/* <IntroSection /> */}

      <div className="lg:px-0">
        <HighlightFeatureSection />
        <PartnerSection/>
        <div>
          <FaqSection />
        </div>
        <BlogPostSection/>
        {/* {showBlogToggle ? <BlogPostSection /> : null} */}
      </div>
      {/* <div className='flex flex-col items'> */}
      {/* <ContentAbout/> */}
      {/* <TeamMemberSection /> */}
      {/* <AdvisorSection /> */}
      {/* </div> */}
    </div>
  );
}

export default Main;

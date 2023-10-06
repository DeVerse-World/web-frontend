import React, { useEffect, useRef } from "react";
import { Image } from "react-bootstrap";
import classNames from 'classnames';

const FeatureSection = ({ title, description, imgSrc, bgSrc, reverse=false, sectionRef }) => (
  <div className="relative">
  <div className="bg-gradient-to-r from-black via-transparent to-black opacity-80 absolute inset-0"></div>
  <div
    ref={sectionRef} // Assign the ref to the individual FeatureSection
    className={classNames(
      "flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20 move-up w-full",
      reverse ? "lg:flex-row-reverse" : "lg:flex-row",
    )}
    style={{ backgroundImage: `url(${bgSrc})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
  >

    <div className="mx-auto flex max-w-md flex-col"
    style={{ zIndex: 1 }}>
      <h2 className="text-3xl font-bold tracking-tight text-lightest sm:text-5xl">
        {title}
      </h2>
      <p className="mt-3 text-lg text-lighter">
        {description}
      </p>
    </div>
    <div className="shrink-0 rounded-lg xl:order-2 aspect-[4/3] aspect-w-1 w-full sm:w-[40rem] lg:w-7/12 overflow-hidden">
      <Image className="h-full w-full object-contain object-center"
          src={imgSrc} width={undefined} height={undefined} />
    </div>
  </div>
  </div>
);

function HighlightFeatureSection() {
  const featureSectionRefs = useRef([null, null, null]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the "move-up" class to the individual FeatureSection components
          entry.target.classList.add("move-up");
        }
      });
    }, 
    {
      threshold: 0.9,
    });
    // Observe each FeatureSection
    featureSectionRefs.current.forEach(ref => {
      if (ref) {
        observer.observe(ref);
      }
    });

    // Clean up the observer on component unmount
    return () => {
      featureSectionRefs.current.forEach(ref => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <section className="flex flex-col gap-0 lg:gap-64 mx-auto py-20 lg:py-0 w-full">
      <FeatureSection
        title="One for all the fun"
        description="Discover endless games and experiences constructed by the communities on the islands"
        imgSrc="/images/section1.webp"
        bgSrc="/images/section1-bg.webp"
        sectionRef={featureSectionRefs.current[0]} // Pass the ref
      />
      <FeatureSection
        title="Seamless experience"
        description="Easily travel and play games that are personalized to you"
        imgSrc="/images/section2.webp"
        bgSrc="/images/section2-bg.webp"
        reverse
        sectionRef={featureSectionRefs.current[1]} // Pass the ref
      />
      <FeatureSection
        title="Continuous Community Collaboration"
        description="Work together to expand the fun"
        imgSrc="/images/section3.webp"
        bgSrc="/images/section3-bg.webp"
        sectionRef={featureSectionRefs.current[2]} // Pass the ref
      />
    </section>
  );
}

export default HighlightFeatureSection;
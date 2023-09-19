import React, { useEffect } from "react";
import { Image } from "react-bootstrap";
import classNames from 'classnames';


const FeatureSection = ({ title, description, imgSrc, reverse=false }) => (
  <div className={classNames(
    "flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20",
    reverse ? "lg:flex-row-reverse" : "lg:flex-row",
  )}>
    <div className="mx-auto flex max-w-md flex-col">
      <h2 className="text-3xl font-bold tracking-tight text-lightest sm:text-5xl">
        {title}
      </h2>
      <p className="mt-3 text-lg text-lighter">
        {description}
      </p>
    </div>

    <div className="shrink-0 rounded-lg xl:order-2 aspect-[4/3] aspect-w-1 w-full sm:w-[40rem] lg:w-7/12 overflow-hidden">
      <Image className="h-full w-full aspect-[12/9] object-cover object-center"
          src={imgSrc} width={undefined} height={undefined} />
    </div>
  </div>
)

function HighlightFeatureSection() {

    return (
        <section className="flex flex-col gap-28 lg:gap-64 max-w-7xl mx-auto py-20 lg:py-56">
            <FeatureSection
              title="Unlimited exploration"
              description="Discover never-ending worlds and games constructed by the communities"
              imgSrc="/images/highlight-exploration.webp"
            />
            <FeatureSection
              title="Become a pioneer in metaverse"
              description="Easily contribute and build the interconnected metaverse without programming knowledge using our drag-n-drop Editor, or enhance even beyond with our Unreal Engine SDK."
              imgSrc="/images/highlight-pioneer.webp"
              reverse
            />
            <FeatureSection
              title="Turn your work into money"
              description="Earn by selling your digital contents, tackling quest events, serving certain social roles and contributing to the metaverse."
              imgSrc="/images/highlight-money.webp"
            />
        </section>
    );
}

export default HighlightFeatureSection;

import Image from "next/image";
import DownloadDemoButton from "../DownloadDemoButton";
import Button from '../Button';
import EpicDownloadButton from "../EpicDownloadButton";
import { useEffect, useState } from "react";
// import EpicDownloadButton from "../EpicDownloadButton";
export default function WelcomeSection({
  placeholder,
  imageHeadPage,
  introVideoUrl,
  partners = [],
  communityPartners = [],
}) {
  console.log(imageHeadPage);
  return (
    <div className="pb-16 sm:pb-20 bg-cover h-[54rem] "
      style={{
        backgroundImage: `
          linear-gradient(to left, rgba(7, 24, 39, 0.3) 50%, rgba(17, 24, 39, 1) 75%),
          linear-gradient(to bottom, rgba(7, 24, 39, 0.3) 60%, rgba(17, 24, 39, 1) 80%),
          url('${imageHeadPage}')
        `,
      }}
    >
      <div className="pl-6 lg:pl-8 xl:pl-12">
        <div className="mx-auto pt-48">
          <div className="">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Welcome To Deverse World
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Your portal to the endless virtual world experiences, owned by the users
            </p>
            
            <a className="leading-6 text-brand underline" href={introVideoUrl} target="_blank">
              Watch trailer <span aria-hidden="true">→</span>
            </a>

            <div className="mt-10 flex items-center gap-x-4">
              <EpicDownloadButton/>
              <DownloadDemoButton />
            </div>
          </div>
        </div>
      </div>
      {/* Logo cloud */}
      <div className="pt-56 lg:pt-68 xl:pt-72 mx-auto grid max-w-lg grid-cols-3 items-center gap-x-8 gap-y-10 sm:max-w-xl md:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none xl:grid-cols-6">
        {[...partners, ...communityPartners].map(partner => (
          <img
            key={partner.id}
            className="max-h-12 w-full object-contain col-span-1"
            src={partner.thumbnail}
            alt={partner.id}
            width={158}
            height={48}
          />
        ))}
      </div>
    </div>
  );
}

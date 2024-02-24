import { useState, useEffect } from "react";
import FirebaseService from "../../data/services/FirebaseService";

const ContentAbout = () => {
  const [imageContent, setImageContent] = useState();

  useEffect(() => {
    FirebaseService.getImageContentAbout().then(setImageContent)
  }, [])

    return (
      
        <div className="overflow-hidden bg-gradient-to-b pt-0">
        <div
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-5xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-light sm:text-6xl lg:col-span-2 xl:col-auto">
                About Deverse World
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              {/* <p className="text-lg leading-8 text-lighter">
              Deverse World platform began its journey in the summer of 2022. It was developed in order to bring the best out of content creators, digital artists, as well as provide gamers with a vast and never-ending playground with high quality contents. Literally anyone can design the world they want to play - This is our motto.
              </p> */}
              {/* <p className="text-lg leading-8 text-lighter">
              Don't know where to start? We've got you covered with our no-code creator tool Deverse World Builder. We developed this tool based on the Unreal Engine 5 and in such a way that anyone using it will never need knowledge of programming or 3D. One hour is all you need to design , fully customize and share your own 3D world online, which can then be accessed by players all over the world on their PCs.
              </p> */}
              {/* <p className="text-lg leading-8 text-lighter">
              Our platform already hosted over 100 unique worlds, all designed and shared by our fast-growing community across the internet. All of those worlds are interconnected, jumping from one to another is just a walk through the portal.
              </p> */}
            </div>
            <img
              src={imageContent}
              alt=""
              className="mt-10 aspect-[3/4] w-full max-w-lg rounded-3xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
            />
          </div>
        </div>
       
      </div>
    );
}


export default ContentAbout;
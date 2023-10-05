import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import FirebaseService from '../data/services/FirebaseService'

export default function Popup() {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const [imageBanner, setImageBanner] = useState();
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    FirebaseService.getImageBanner().then(setImageBanner)
    // Create a new image element
    const img = new Image();
    img.src = imageBanner; // Set the image source to your background image URL
    img.onload = () => {
      // Once the image has loaded, update the state with its dimensions
      setImageDimensions({ width: img.width, height: img.height });
    };
  }, [imageBanner])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"  />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-stretch justify-center text-center md:items-center md:px-2 lg:px-4"
        >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="z-10 flex flex-col items-center transform text-left text-base transition my-20 aspect-[2/1] w-1/2 md:w-[700px] lg:w-[54rem]">
                <div className="relative flex items-center px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 bg-center w-full h-full cursor-pointer"
                      onClick={() => router.push('/creator_program')}
                      style={{
                        backgroundImage: `url('${imageBanner}')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        width: `${imageDimensions.width}px`,
                        height: `${imageDimensions.height}px` // TODO make this dynamic instead
                      }}>   
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-lightest hover:text-light sm:right-6 sm:top-8 md:right-6 md:top-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(false);
                      }}
                    >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}


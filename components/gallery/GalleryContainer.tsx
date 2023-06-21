import { Fragment, useState , useEffect} from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3BottomLeftIcon,
  CogIcon,
  HeartIcon,
  HomeIcon,
  PhotoIcon,
  RectangleStackIcon,
  Squares2X2Icon as Squares2X2IconOutline,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  Bars4Icon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  Squares2X2Icon as Squares2X2IconMini,
} from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { StarIcon } from '@heroicons/react/20/solid'
import { MarketplaceTabKey } from '../MarketplaceFilterTab';
import GallerySlideOver from './GallerySlideOver';
import OverlayImage360Button from '../image360/OverlayImage360Button'

type SidebarDetailsProps = {
  id: number;
  name: string;
  creatorName: string;
  rating: number;
  thumbnail: string;
  buttons?: any;
  description: string;
}

type GalleryContainerProps = {
  children: any;
  details: SidebarDetailsProps;
  type: MarketplaceTabKey;
}


const GalleryContainer = ({ children, details, type, slideOverOpen, setSlideOverOpen }: GalleryContainerProps) => {
    
    return (
        <div className="flex flex-1 items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* Gallery */}
                    <section className="pb-16" aria-labelledby="gallery-heading">
                      {children}
                    </section>
                </div>
            </main>
            <GallerySlideOver open={slideOverOpen} setOpen={setSlideOverOpen} details={details} type={type} />

        </div>
    );
}

export default GalleryContainer;
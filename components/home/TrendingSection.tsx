import { Fragment, useState, useEffect } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import GalleryCard from '../gallery/GalleryCard';
import Card from '../Card';


export default function TrendingSection() {
    const [open, setOpen] = useState(false);
    const trendingCard = [
        {
          id: 2,
          name: "Egypt Runner",
          creatorName: "Deverse World",
          rating: 5,
          thumbnail: "https://i.natgeofe.com/k/109a4e08-5ebc-48a5-99ab-3fbfc1bbd611/Giza_Egypt_KIDS_0123_square.jpg",
          description: "meow",
          buttons: null,
        },
        {
            id: 2,
            name: "Egypt Runner",
            creatorName: "Deverse World",
            rating: 5,
            thumbnail: "https://i.natgeofe.com/k/109a4e08-5ebc-48a5-99ab-3fbfc1bbd611/Giza_Egypt_KIDS_0123_square.jpg",
            description: "meow",
            buttons: null,
          },
          {
            id: 2,
            name: "Egypt Runner",
            creatorName: "Deverse World",
            rating: 5,
            thumbnail: "https://i.natgeofe.com/k/109a4e08-5ebc-48a5-99ab-3fbfc1bbd611/Giza_Egypt_KIDS_0123_square.jpg",
            description: "meow",
            buttons: null,
          },
          {
            id: 2,
            name: "Egypt Runner",
            creatorName: "Deverse World",
            rating: 5,
            thumbnail: "https://i.natgeofe.com/k/109a4e08-5ebc-48a5-99ab-3fbfc1bbd611/Giza_Egypt_KIDS_0123_square.jpg",
            description: "meow",
            buttons: null,
          },
    ]

    return (
      <section aria-labelledby="trending-heading">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
          <div className="md:flex md:items-center md:justify-between">
            <h2 id="favorites-heading" className="text-2xl font-bold tracking-tight text-lightest">
              Trending 
            </h2>
            <a href="/marketplace?type=world" className="hidden text-sm font-medium text-brand hover:text-lightests md:block">
              View All
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
            {trendingCard.map((world) => (
              <div key={world.id} className="group relative">
                {/* <div className="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
                  <img
                    src={world.thumbnail}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-4 text-sm text-light">
                    <span className="absolute inset-0" />
                    {world.name}
                </h3>
                <p className="mt-1 text-sm text-light">{world.rating}</p>
                <p className="mt-1 text-sm font-medium text-light">{world.description}</p> */}
                <a href={`/subworlds/${world.id}`} className="no-underline">
                  <Card
                    thumbnail={world.thumbnail}
                    name={world.name}
                    creatorName={world.creatorName}        
                    rating={world.rating}  
                  />
                </a>
              </div>
            ))}
          </div>    
        </div>
      </section>
    );
}
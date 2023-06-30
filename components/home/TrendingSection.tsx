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
import SubWorldTemplateService from '../../data/services/SubWorldTemplateService';

export default function TrendingSection() {
    const [open, setOpen] = useState(false);
    const [worlds, setWorlds] = useState([]);

    useEffect(() => {
      SubWorldTemplateService.fetchRootTemplates().then(res => {
        if (res.isSuccess()) {
          const sortedWorlds = res.value.enriched_subworld_templates.sort((a, b) => b.derived_world_stats.num_plays_count - a.derived_world_stats.num_plays_count);
        setWorlds(sortedWorlds);
      }
      });
    }, []);

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
            {worlds.slice(0,4).map((world) => (
              <div key={world.overview.id} className="group relative">
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
                <a href={`/subworlds/${world.overview.id}`} className="no-underline">
                  <Card
                    thumbnail={world.overview.thumbnail_centralized_uri                    }
                    name={world.overview.display_name}
                    creatorName={world.creator_info.name}        
                    rating={world.overview.rating}  
                  />
                </a>
              </div>
            ))}
          </div>    
        </div>
      </section>
    );
}
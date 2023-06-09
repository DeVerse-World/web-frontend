import { Fragment, useState } from 'react'
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


const navigation = [
    { name: 'Home', href: '#', icon: HomeIcon, current: false },
    { name: 'All Files', href: '#', icon: Squares2X2IconOutline, current: false },
    { name: 'Photos', href: '#', icon: PhotoIcon, current: true },
    { name: 'Shared', href: '#', icon: UserGroupIcon, current: false },
    { name: 'Albums', href: '#', icon: RectangleStackIcon, current: false },
    { name: 'Settings', href: '#', icon: CogIcon, current: false },
]
const userNavigation = [
{ name: 'Your profile', href: '#' },
{ name: 'Sign out', href: '#' },
]
const tabs = [
{ name: 'Recently Viewed', href: '#', current: true },
{ name: 'Recently Added', href: '#', current: false },
{ name: 'Favorited', href: '#', current: false },
]
const files = [
{
    name: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
    'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    current: true,
},
// More files...
]
const currentFile = {
name: 'IMG_4985.HEIC',
size: '3.9 MB',
source:
    'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
information: {
    'Uploaded by': 'Marie Culver',
    Created: 'June 8, 2020',
    'Last modified': 'June 8, 2020',
},
sharedWith: [
    {
    id: 1,
    name: 'Aimee Douglas',
    imageUrl:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80',
    },
    {
    id: 2,
    name: 'Andrea McMillan',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
],
}

const GalleryContainer = ({ children, selectedDetails, }) => {
    return (
        <div className="flex flex-1 items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">

                    {/* Gallery */}
                    <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                      {children}
                    </section>
                </div>
            </main>

            {/* Details sidebar */}
            <aside className="hidden w-[28rem] overflow-y-auto border-l border-medium p-8 xl:block">
              <div className="space-y-6 pb-16">
                <div>
                  <div className="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg">
                    <img src={currentFile.source} alt="" className="object-cover" />
                  </div>
                  <div className="mt-4 flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-medium text-lightest">
                        <span className="sr-only">Details for </span>
                        {currentFile.name}
                      </h2>
                      <p className="text-sm font-medium text-light">{currentFile.size}</p>
                    </div>
                    <button
                      type="button"
                      className="ml-4 flex h-8 w-8 items-center justify-center rounded-full  text-lighter hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <HeartIcon className="h-6 w-6" aria-hidden="true" />
                      <span className="sr-only">Favorite</span>
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-lightest">Information</h3>
                  <dl className="mt-2 divide-y divide-medium border-b border-t border-medium">
                    {Object.keys(currentFile.information).map((key) => (
                      <div key={key} className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-lighter">{key}</dt>
                        <dd className="whitespace-nowrap text-lightest">{currentFile.information[key]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div>
                  <h3 className="font-medium text-lightest">Description</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm italic text-lighter">Add a description to this image.</p>
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lighter hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <PencilIcon className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">Add description</span>
                    </button>
                  </div>
                </div>
                <div className="flex gap-x-3">
                  <button
                    type="button"
                    className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Download
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </aside>
        </div>
    );
}

export default GalleryContainer;
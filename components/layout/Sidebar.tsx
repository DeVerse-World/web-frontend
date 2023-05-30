import { Fragment } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from "next/router";
import {
  XMarkIcon,
  HomeIcon,
  RocketLaunchIcon,
  PlayCircleIcon,
  WrenchScrewdriverIcon,
  UsersIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'
import classNames from 'classnames';

const navigation = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Alpha", href: "/alpha", icon: PlayCircleIcon },
    { name: "Explore", href: "/marketplace", icon: RocketLaunchIcon },
    { name: "Create", href: "/create", icon: WrenchScrewdriverIcon },
    { name: "About", href: "/about", icon: UsersIcon },
    // { name: "Stream", href: "/stream", icon: (<BsBroadcast fontSize="1.5rem" color='rgb(97 198 208)' />) },
    { name: "Docs", href: "https://docs.deverse.world", icon: DocumentTextIcon },
]
const teams = [
{ id: 1, name: 'Planetaria', href: '#', initial: 'P', current: false },
{ id: 2, name: 'Protocol', href: '#', initial: 'P', current: false },
{ id: 3, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
]
const statuses = {
offline: 'text-gray-500 bg-gray-100/10',
online: 'text-green-400 bg-green-400/10',
error: 'text-rose-400 bg-rose-400/10',
}
const environments = {
Preview: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
Production: 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
}
const deployments = [
{
    id: 1,
    href: '#',
    projectName: 'ios-app',
    teamName: 'Planetaria',
    status: 'offline',
    statusText: 'Initiated 1m 32s ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
},
// More deployments...
]
const activityItems = [
{
    user: {
    name: 'Michael Foster',
    imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    projectName: 'ios-app',
    commit: '2d89f0c8',
    branch: 'main',
    date: '1h',
    dateTime: '2023-01-23T11:00',
},
// More items...
]

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const router = useRouter();
    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                            <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                <span className="sr-only">Close sidebar</span>
                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                            </button>
                            </div>
                        </Transition.Child>
                        {/* Sidebar component, swap this element with another sidebar if you like */}
                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                            <div className="flex h-16 shrink-0 items-center">
                                <Image
                                    className="h-8 w-auto"
                                    src="/images/logo.webp"
                                    alt="Deverse logo"
                                    height={32}
                                    width={32}
                                />
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <div className="flex flex-1 flex-col gap-y-7">
                                    <div className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                        <div key={item.name}>
                                            <Link href={item.href}>
                                                <a
                                                    className={classNames(
                                                        router.pathname === item.href
                                                        ? 'bg-gray-800 text-white'
                                                        : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold no-underline'
                                                    )}
                                                >
                                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                    {item.name}
                                                </a>
                                            </Link>
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            </nav>
                        </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
                    <div className="flex h-16 gap-1 shrink-0 items-center">
                        <Image
                            className="h-8 w-auto"
                            src="/images/logo.webp"
                            alt="Deverse logo"
                            height={32}
                            width={32}
                        />
                        <Image
                            height={24}
                            width={180}
                            src={"/images/logo-text.webp"}
                            alt="Deverse text logo" />
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <div className="flex flex-1 flex-col gap-y-7">
                            <div className="-mx-2 space-y-1">
                                {navigation.map((item) => (
                                <div key={item.name}>
                                    <Link href={item.href}>
                                        <a
                                            className={classNames(
                                                router.pathname === item.href
                                                ? 'bg-gray-800 text-white'
                                                : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold no-underline'
                                            )}
                                        >
                                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                            {item.name}
                                        </a>
                                    </Link>
                                </div>
                                ))}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
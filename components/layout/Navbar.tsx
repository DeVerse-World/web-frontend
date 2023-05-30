import { Fragment, useState, memo } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames';

const navigation = [
{ name: 'Projects', href: '#', icon: FolderIcon, current: false },
{ name: 'Deployments', href: '#', icon: ServerIcon, current: true },
{ name: 'Activity', href: '#', icon: SignalIcon, current: false },
{ name: 'Domains', href: '#', icon: GlobeAltIcon, current: false },
{ name: 'Usage', href: '#', icon: ChartBarSquareIcon, current: false },
{ name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
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

// TODO: Pass user as a prop to trigger re-rendering
const Navbar = ({ setSidebarOpen }) => {
    return (
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-white lg:hidden" onClick={() => setSidebarOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex h-16 shrink-0 items-center lg:hidden">
                <Image
                    className="h-8 w-auto"
                    src="/images/logo.webp"
                    alt="Deverse logo"
                    height={32}
                    width={32}
                />
            </div>

            <div className="flex flex-1 items-center justify-end gap-x-8">
                <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your profile</span>
                    <img
                        className="h-8 w-8 rounded-full bg-gray-800"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                </a>
            </div>
        </div>
    );
};

export default memo(Navbar);
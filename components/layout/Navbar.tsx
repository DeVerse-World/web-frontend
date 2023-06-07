import { memo } from 'react'
import Image from 'next/image'
import { Bars3Icon } from '@heroicons/react/20/solid'

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
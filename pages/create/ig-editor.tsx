import DownloadDemoButton from "../../components/DownloadDemoButton";
import dynamic from "next/dynamic";
import { useState } from "react";
import customProtocolCheck from "custom-protocol-check";
import { TabHeaderBar } from "../../components/common/TabHeader";
import { BsPlayFill } from "react-icons/bs";
import Button from "../../components/Button";
import { PlayIcon } from '@heroicons/react/24/outline'
const GameLaunchModal = dynamic(() => import("../../components/create/GameLaunchModal"));

const posts = [
    {
      id: 1,
      title: 'Free for all',
      description:
        'Create awesome worlds, games, races using thousands of free assets made by the community',
      imageUrl: '/images/ig-free-for-all.webp',
    },

    {
        id: 2,
        title: 'Share your creation',
        description:
          'What can be better than having your friends or others players experience your world. Share to everyone with just a button click.',
        imageUrl: '/images/ig-share-creation.webp',
    },

    {
        id: 3,
        title: 'No Coding needed',
        description:
          'Easy to use, no coding required. It is simple and intuitive to modify the rules or attributes of your world.',
        imageUrl: '/images/ig-no-coding.webp',
    },
      
    // More posts...
  ]

function Editor() {
    const [showPlayModal, setShowPlayModal] = useState(false);

    const openApp = () => {
        customProtocolCheck(
            `deverseworld://?is_editor=True`,
            () => {
                setShowPlayModal(true)
            },
            () => {
                console.log("Custom protocol found and opened the file successfully.");
            }, 1000
        );
    }

    return (
        <>
            <TabHeaderBar data={[
                { href: '/create', label: 'Avatar' },
                // { href: '/create/mint', label: 'Mint' },
                { href: '/create/ig-editor', label: 'World Builder' },
                // { href: '/create/ue-sdk', label: 'Unreal Engine SDK' }
            ]} />
            <div className="px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-lightest sm:text-6xl">
                        Build your dream world
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-lighter">
                        Anyone can be a creator, own part of the metaverse now. No coding required, all you need is imagination.
                    </p>
                    <Button
                        primary
                        onClick={(e) => {
                            e.stopPropagation();
                            openApp();
                        }}
                        size="md"
                    >
                        Play
                        <PlayIcon className="ml-1 h-6 w-6" aria-hidden="true" />
                    </Button>
                </div>
            </div>
            
            {/* Highlights */}
            <div className=" py-24 sm:py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-lightest sm:text-4xl">Highlight</h2>
                    <p className="mt-2 text-lg leading-8 text-lighter">
                        Learn how to grow your business with our expert advice.
                    </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => (
                        <article key={post.id} className="flex flex-col items-start justify-between">
                            <div className="relative w-full">
                                <img
                                    src={post.imageUrl}
                                    alt=""
                                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                />
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                            </div>
                            <div className="max-w-xl">
                           
                                <div className="group relative">
                                <h3 className="mt-4 text-lg font-semibold leading-6 text-lightest">
                                    {post.title}
                                </h3>
                                <p className="mt-3 line-clamp-3 text-sm leading-6 text-lighter">{post.description}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                    </div>
                </div>
            </div>
            <SystemRequirement />
            <GameLaunchModal
                show={showPlayModal}
                setShow={setShowPlayModal}
            />
        </>
    )
}

function SystemRequirement() {
    return (
        <div className="flex-col flex justify-center items-center rounded-xl p-4 gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-lightest sm:text-4xl">System requirements</h2>
            <div className="grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 lg:max-w-none lg:grid-cols-2">
                <div className="">
                    <h3 className="text-brand">Minimum</h3>
                    Requires a 64-bit processor and operating system<br />
                    OS: Window 10 or above<br />
                    Processor: Quad core 3.2Ghz<br />
                    Memory: 8GB<br />
                    Graphics: GTX 1060 or equivalent<br />
                    DirectX: Version 11<br />
                    Storage: 6GB available space
                </div>
                <div className="">
                    <h3 className="text-brand">Recommended</h3>
                    Requires a 64-bit processor and operating system<br />
                    OS: Window 10 or above<br />
                    Processor: 8-core 3.8Ghz<br />
                    Memory: 16GB<br />
                    Graphics: GTX 2060 or above<br />
                    DirectX: Version 11<br />
                    Storage: 10GB available space
                </div>
            </div>
        </div>
    )
}

export default Editor;

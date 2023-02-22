import Image from "next/image";
import Link from "next/link";
import { AiFillFacebook, AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import FirebaseService from "../data/services/FirebaseService";
import { useContext } from "react";
import { AppContext } from "./contexts/app_context";

export default function Footer() {
    const { remoteConfig } = useContext(AppContext)

    return (
        <section id="section-footer" className="md:max-h-36">
            <div className="flex flex-col">
                <Link className="no-underline text-white" href="/alpha" >Alpha</Link>
                <Link className="no-underline text-white" href="/expore">Explore</Link>
                <Link className="no-underline text-white" href="/create">Create</Link>
                <Link className="no-underline text-white" href="/docs">Docs</Link>
            </div>
            <div className="flex flex-col">
                <Link className="no-underline text-white" href="/roadmap">Roadmap</Link>
                <span className="cursor-pointer text-white" onClick={() => {
                    FirebaseService.getPitchDeckUri(remoteConfig).then(url => {
                        window.open(url, "_blank")
                    }).catch(e => {
                        console.log(e)
                    })
                }}>Pitch Deck</span>
            </div>
            <div className="flex flex-col">
                <Link className="no-underline text-white" href="/privacy-policies" >Privacy Policies</Link>
                <Link className="no-underline text-white" href="/term-of-use" >Term of Use</Link>
                <Link className="no-underline text-white" href="/about">About Us</Link>
            </div>
            <div className="flex flex-col items-center text-2xl">
                Contact us
                <div className="flex flex-row gap-2 flex-wrap justify-center items-center">
                    {[
                        { title: 'email', href: "mailto:info@cosugames.com", icon: (<MdEmail color="white" fontSize="1.5rem" />) },
                        { title: 'twitter', href: "https://twitter.com/DeverseWorld", icon: (<AiOutlineTwitter color="white" fontSize="1.5rem" />) },
                        { title: 'discord', href: "https://discord.gg/z6qRJN9PAp", icon: (<FaDiscord color="white" fontSize="1.5rem" />) },
                        { title: 'facebook', href: "https://www.facebook.com/DeverseWorld/", icon: (<AiFillFacebook color="white" fontSize="1.5rem" />) }
                    ].map(item => <a key={item.title} title={item.title} target="_blank" href={item.href} >{item.icon}</a>)
                    }
                </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
                <span className="flex flex-row gap-2">
                    <Image
                        src={"/images/logo.webp"}
                        height={36}
                        width={36}
                        alt="Deverse logo" />
                    <Image
                        height={36}
                        width={256}
                        src={"/images/logo-text.webp"}
                        alt="Deverse text logo" />
                </span>
                Copyright © Deverse World
            </div>
        </section>
    )
}
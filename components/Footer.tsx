import { memo } from 'react';
import Image from "next/image";
import Link from "next/link";
import { AiFillFacebook, AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import FirebaseService from "../data/services/FirebaseService";
import { useContext } from "react";
import { AppContext } from "./contexts/app_context";

function FooterLink({ href, label }) {
    return (
        <Link href={href} prefetch={false}>
            <a className="no-underline text-white">{label}</a>
        </Link>
    )
}

const Footer = () => {
    const { remoteConfig } = useContext(AppContext)

    return (
        <section id="section-footer">
            <div className="flex flex-col">
                {[
                    { href: "/alpha", label: "Alpha" },
                    { href: "/expore", label: "Explore" },
                    { href: "/create", label: "Create" },
                    { href: "/docs", label: "Docs" }
                ].map(item => <FooterLink href={item.href} label={item.label} />)}
            </div>
            <div className="flex flex-col">
                <FooterLink href="/roadmap" label="Roadmap" />
                <span className="cursor-pointer text-white" onClick={() => {
                    FirebaseService.getPitchDeckUri(remoteConfig).then(url => {
                        window.open(url, "_blank")
                    }).catch(e => {
                        console.log(e)
                    })
                }}>Pitch Deck</span>
            </div>
            <div className="flex flex-col">
                {[
                    { href: "/privacy-policies", label: "Privacy Policies" },
                    { href: "/term-of-use", label: "Term of Use" },
                    { href: "/about", label: "About Us" }
                ].map(item => <FooterLink href={item.href} label={item.label} />)}
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

export default memo(Footer);
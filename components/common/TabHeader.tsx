import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type Props = {
    children: ReactNode,
    href: string,
    className?: string
}

function TabHeader(props: Props) {
    const router = useRouter();

    let className = "tab-header";
    if (router.pathname == props.href) {
        className += " active";
    }
    return (
        <Link href={props.href} scroll={false} >
            <span className={className}>
                {props.children}
            </span>
        </Link>
    )
}

export default TabHeader;
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type itemProps = {
    children: ReactNode,
    href: string,
    className?: string
}

function TabHeader(props: itemProps) {
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

export type TabHeaderItems = {
    href: string,
    label: string
}

type Props = {
    data: TabHeaderItems[]
}

export function TabHeaderBar(props: Props) {
    const router = useRouter();

    return (
        <div id="tab-bar" >
            {props.data.map(item => {
                let className = "tab-header";
                if (router.pathname == item.href) {
                    className += " active";
                }
                return (
                    <Link href={item.href} scroll={false} >
                        <span className={className}>{item.label}</span>
                    </Link>
                )
            })}
        </div>
    )
}

export default TabHeader;
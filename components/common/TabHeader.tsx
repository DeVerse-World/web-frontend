import Link from "next/link";
import { useRouter } from "next/router";

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
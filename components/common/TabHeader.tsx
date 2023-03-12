import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/top-tab.module.css";

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
        <div className={styles.tabBar} >
            {props.data.map(item => {
                return (
                    <Link href={item.href} scroll={false} key={item.href}>
                        <a className={`${styles.tabHeader} ${router.pathname == item.href && styles.active} no-underline`}>{item.label}</a>
                    </Link>
                )
            })}
        </div>
    )
}
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/top-tab.module.css";
import classNames from "classnames";

export type TabHeaderItems = {
    href: string,
    label: string
}

type Props = {
    data: TabHeaderItems[],
    prefetch: boolean,
}

export function TabHeaderBar({ data, prefetch=false }: Props) {
    const router = useRouter();

    // TODO: Remove after done
    return (
        <div>
           
            <div>
                <div className="border-b border-gray-200">
                <nav className="-mb-px flex" aria-label="Tabs">
                    {data.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                        >
                            <span
                                className={classNames(
                                    router.pathname === item.href
                                    ? 'border-brand text-brand hover:text-brand'
                                        : 'border-transparent text-lighter hover:border-lightest hover:text-brand',
                                    'cursor-pointer w-1/4 border-b-4 py-4 px-1 text-center text-sm font-medium'
                                )}
                            >                            
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>
                </div>
            </div>
        </div>
    );
    return (
        <div className={styles.tabBar} >
            {data.map(item => {
                return (
                    <Link href={item.href} scroll={false} key={item.href} prefetch={prefetch}>
                        <a className={`${styles.tabHeader} ${router.pathname == item.href && styles.active} no-underline`}>{item.label}</a>
                    </Link>
                )
            })}
        </div>
    )
 }
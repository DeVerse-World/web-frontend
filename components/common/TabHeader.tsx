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
    const tabs = [
        { name: 'My Account', href: '#', current: false },
        { name: 'Company', href: '#', current: false },
        { name: 'Team Members', href: '#', current: true },
        { name: 'Billing', href: '#', current: false },
      ]
    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                id="tabs"
                name="tabs"
                className="block w-full rounded-md  focus:border-indigo-500 focus:ring-indigo-500"
                defaultValue={data.find((item) => item.href === router.pathname).label}
                >
                {data.map((item) => (
                    <option key={item.label}>{item.label}</option>
                ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                <nav className="-mb-px flex" aria-label="Tabs">
                    {data.map((item) => (
                    <a
                        key={item.href}
                        href={item.href}
                        className={classNames(
                        router.pathname == item.href
                            ? ' text-indigo-600'
                            : 'border-transparent text-lightest hover:border-gray-300 hover:text-gray-700',
                        'w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium'
                        )}
                        aria-current={router.pathname === item.href ? 'page' : undefined}
                    >
                        {item.label}
                    </a>
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
import Link from "next/link";
import { useRouter } from "next/router"
import styles from '../styles/filter-tab.module.css';

type Props = {
    type: string;
    data: FilterTabItem[]
}

type FilterTabItem = {
    label?: string,
    subType?: string,
    disabled?: boolean,
}

type SFilterTabITem = {
    type: string;
    isActive?: boolean;
} & FilterTabItem

function DisabledFilterTabItem(props: SFilterTabITem) {
    return (
        <div key={`disabled-${props.subType}`}
            className={`${styles.filterTab} ${styles.filterTabDisabled}`}>
            {props.label}
        </div>
    )
}

function FilterTabItem(props: SFilterTabITem) {
    return (
        <Link key={`${props.type}-${props.subType}`} className={`${styles.filterTab} ${props.isActive && styles.filterTabActive}`}
            href={{
                query: {
                    type: props.type,
                    ...(props.subType && { subtype: props.subType })
                }
            }}>
            {props.label}
        </Link>
    )
}

export default function FilterTab(props: Props) {
    const router = useRouter();

    return (
        <div className="flex flex-col">
            {props.data.map(item =>
                item.disabled
                    ? <DisabledFilterTabItem
                        label={item.label}
                        subType={item.subType}
                        type={props.type} />
                    : <FilterTabItem
                        label={item.label}
                        subType={item.subType}
                        type={props.type}
                        isActive={router.query['subtype'] === item.subType && props.type === router.query['type']} />

            )}
        </div>
    )
}
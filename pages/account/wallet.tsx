import { TabHeaderBar } from "../../components/common/TabHeader";

export default function Wallet() {
    return (
        <>
            <TabHeaderBar data={[
                { href: '/account', label: 'Info' },
                // { href: '/account/wallet', label: 'Wallet' },
                { href: '/account/avatar', label: 'Avatars' },
                // { href: '/account/events', label: 'Events' },
                { href: '/account/templates', label: 'Worlds' },
                // { href: '/account/items', label: 'Items' },
                { href: '/account/settings', label: 'Settings' }
            ]} />
            <div>
                {/*<NFTList data={data} />*/}
            </div>
        </>
    )
}
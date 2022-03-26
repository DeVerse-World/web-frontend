import Link from 'next/link'

function MarketplaceNavbar(props) {
    return (
        <div>
        <Link href="/marketplace">
          <a className="mr-6 text-pink-500">
            Markets
          </a>
        </Link>
        <Link href="/marketplace/creator-dashboard">
          <a className="mr-6 text-pink-500">
            Creator Dashboard
          </a>
        </Link>
        <Link href="/marketplace/my-assets">
          <a className="mr-6 text-pink-500">
            My NFTs
          </a>
        </Link>
        <Link href="/marketplace/create-item">
          <a className="mr-6 text-pink-500">
            Sell NFT
          </a>
        </Link>
        </div>
    )
}

export default MarketplaceNavbar;
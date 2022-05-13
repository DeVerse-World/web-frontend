import Link from 'next/link'

function MarketplaceMenu(props) {
    return (
        <div>
        <Link href="/marketplace">
          <a className="mr-6 text-pink-500">
              Markets
          </a>
        </Link>
        <Link href="/marketplace/create-item">
          <a className="mr-6 text-pink-500">
            Mint NFT
          </a>
        </Link>
        </div>
    )
}

export default MarketplaceMenu;
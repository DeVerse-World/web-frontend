export function formatWalletAddress(walletAddress: string): string {
    return `${walletAddress.substring(0, 7)}...${walletAddress.substring(walletAddress.length - 5, walletAddress.length - 1)}`
}
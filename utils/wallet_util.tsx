export function formatWalletAddress(walletAddress: string): string {
    if (!walletAddress) {
        return '';
    }
    return `${walletAddress.substring(0, 7)}...${walletAddress.substring(walletAddress.length - 5, walletAddress.length - 1)}`
}
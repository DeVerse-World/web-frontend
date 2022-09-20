export function formatPrice(price: any): string {
    let priceFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 8
    });
    return priceFormatter.format(price);
}

export function formatMarketCap(marketCap: any): string {
    let marketCapFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return marketCapFormatter.format(marketCap);
}
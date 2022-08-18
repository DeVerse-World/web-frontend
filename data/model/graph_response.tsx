export type DeverseGraphResponse = {
    data: DeverseGraphResponseData
}

type DeverseGraphResponseData ={
    assetTokens: Token[]
    owners: AssetOwner[]
}

type Token = {
    id: string,
    tokenURI: string,
    supply: number,
    isNFT: boolean
}
type AssetOwner = {
    id: string,
    numAssets: string,
    timestamp: string,
    assetTokens: AssetToken[]
}

type AssetToken = {
    id: string,
    token: Token
}
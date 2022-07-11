export type DeverseGraphResponse = {
    data: DeverseGraphResponseData
}

type DeverseGraphResponseData ={
    assetTokens: AssetToken[]
}

type AssetToken = {
    id: string,
    tokenURI: string,
    supply: number,
    isNFT: boolean
}
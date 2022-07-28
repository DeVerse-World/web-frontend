import axios from "axios"

class MarketService {
    fetchPrice() {
        // await axios.get("/api/info")
        //   .then(res => {
        //     setTotalSupply(String(res.data.totalCoins).replace(/\B(?=(\d{3})+(?!\d))/g, ","))
        //     setCirculatingSupply(String(res.data.circulatingCoins).replace(/\B(?=(\d{3})+(?!\d))/g, ","))
        //     setPrice(formatPrice(res.data.price))
        //     setMcap(formatMarketCap(res.data.marketCap))
        //     setHolders(`${String(res.data.holders).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
        //   })
      }
}

export default new MarketService();
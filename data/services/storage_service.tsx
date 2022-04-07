class StorageService {

    getMetamaskSessionKey(): string {
        return localStorage.getItem("session_key");
    }

    saveWalletAddress(address: string) {
        localStorage.setItem("wallet_address", address);
    }
}

export default new StorageService();
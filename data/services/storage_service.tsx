class StorageService {

    getMetamaskSessionKey(): string {
        return localStorage.getItem("session_key");
    }

    setMetamaskSessionKey(session_key: string) {
        localStorage.setItem("session_key", session_key);
    }

    saveWalletAddress(address: string) {
        localStorage.setItem("wallet_address", address);
    }
}

export default new StorageService();
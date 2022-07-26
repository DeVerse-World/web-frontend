import { User } from "../model/user";

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

    saveUser(user?: User) {
        if (user == null) {
            localStorage.setItem("user", '')
        } else {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }

    getUser(): User | null {
        let user = localStorage.getItem("user");
        if (user?.length == 0 || !user) {
            return null;
        }
        return JSON.parse(user);
    }
}

export default new StorageService();
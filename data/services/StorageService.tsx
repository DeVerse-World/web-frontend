import { User } from "../model/user";

class StorageService {

    getSessionKey(): string {
        return localStorage.getItem("session_key");
    }

    setSessionKey(session_key: string) {
        localStorage.setItem("session_key", session_key);
    }

    saveWalletAddress(address: string) {
        localStorage.setItem("wallet_address", address);
    }

    saveUser(user?: User) {
        if (user == null) {
            localStorage.removeItem("user")
        } else {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }

    getUser(): User | null {
        let user = localStorage.getItem("user");
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }
}

export default new StorageService();
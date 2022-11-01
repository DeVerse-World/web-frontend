import { BlogPost } from "../model/blog_post";
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

    savePost(post: BlogPost) {
        const cachedPosts = this.getPosts();
        cachedPosts.push(post);
        localStorage.setItem("posts", JSON.stringify(cachedPosts));
    }

    getPosts(): BlogPost[] {
        const posts = localStorage.getItem("posts");
        if (posts) {
            return JSON.parse(posts);
        }
        return [];
    }
}

export default new StorageService();
import { FirebaseApp, initializeApp } from "firebase/app";
import { fetchAndActivate, getBoolean, getRemoteConfig, getString, getValue, RemoteConfig } from "firebase/remote-config";
import { Firestore, getFirestore, collection, getDocs, Timestamp, doc, setDoc, getDoc, addDoc, deleteDoc } from "firebase/firestore";
import { BlogPost } from "../model/blog_post";

class FirebaseService {
    private _app: FirebaseApp;
    private _config: RemoteConfig;
    private _firestore: Firestore;
    private _env_prefix: String;

    private _whiteListBlogPost: String[] = [];
    constructor() {
        this._app = initializeApp({
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID + ".firebaseapp.com",
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID + ".appspot.com",
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
            measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
        });
        this._firestore = getFirestore(this._app);
        this._env_prefix = process.env.ENV_PREFIX;
    }

    private async retrieveConfig(): Promise<RemoteConfig> {
        if (this._config == null) {
            this._config = getRemoteConfig(this._app);
            this._config.settings.minimumFetchIntervalMillis = 360000;
            await fetchAndActivate(this._config);
            console.log('remote config activated');
        }
        return this._config;
    }

    async getBlogPosts(): Promise<BlogPost[]> {
        const blogPostDocs = await getDocs(collection(this._firestore, "blog_post"));
        const blogPosts: BlogPost[] = [];
        blogPostDocs.forEach((doc) => {
            const data = doc.data();
            const blogPost: BlogPost = {
                title: data['title'],
                uri: data['uri'],
                thumbnail: data['thumbnail'],
                id: doc.id,
            }
            if (data['created_at'] != null) {
                blogPost.created_at = (data['created_at'] as Timestamp).toDate()
            }
            blogPosts.push(blogPost);
        });
        return blogPosts.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
    }

    async updateBlogPost(post: BlogPost) {
        if (post.id != null) {
            await setDoc(doc(this._firestore, "blog_post", post.id), {
                title: post.title,
                uri: post.uri,
                thumbnail: post.thumbnail,
                created_at: Timestamp.fromDate(post.created_at)
            });
        } else {
            await addDoc(collection(this._firestore, "blog_post"), {
                title: post.title,
                uri: post.uri,
                thumbnail: post.thumbnail,
                created_at: Timestamp.fromDate(new Date())
            });
        }
    }

    async deleteBlogPost(post: BlogPost) {
        await deleteDoc(doc(this._firestore, "blog_post", post.id));
    }

    async getBlogPostAdmins(): Promise<String[]> {
        if (this._whiteListBlogPost.length == 0) {
            const setting = await getDoc(doc(this._firestore, "settings", "blog_post"));
            this._whiteListBlogPost = setting.data()['wallets'];
        }
        return this._whiteListBlogPost;
    }

    async getAlphaDriveLink() : Promise<string> {
        return getString(await this.retrieveConfig(), "alphaDriveLink");
    }

    async getPitchDeckUri() : Promise<string> {
        return getString(await this.retrieveConfig(), "pitchDeckUri");
    }

    async getShouldShowLoading(): Promise<boolean> {
        return getBoolean(await this.retrieveConfig(), this._env_prefix + "showLoadingInMarketplace");
    }

    async getShouldShowDashboardToggle(): Promise<boolean> {
        return getBoolean(await this.retrieveConfig(), this._env_prefix + "showDashboardToggle")
    }

    async getShouldShowBlogToggle(): Promise<boolean> {
        return getBoolean(await this.retrieveConfig(), this._env_prefix + "showBlogToggle")
    }
}

export default new FirebaseService();
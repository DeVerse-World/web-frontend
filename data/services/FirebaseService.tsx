import { FirebaseApp, initializeApp } from "firebase/app";
import { fetchAndActivate, getBoolean, getRemoteConfig, getString, getValue, RemoteConfig } from "firebase/remote-config";
import { Firestore, getFirestore, collection, getDocs, Timestamp, doc, setDoc, getDoc, addDoc, deleteDoc } from "firebase/firestore";
import { BlogPost } from "../model/blog_post";
import { Partner } from "../model/partner";

class FirebaseService {
    private _app: FirebaseApp;
    private _firestore: Firestore;
    private _env_prefix: String;

    private _whiteListBlogPost: String[] = [];
    private _partners: Partner[] = [];

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

    async retrieveConfig(): Promise<RemoteConfig> {
        const config = getRemoteConfig(this._app);
        config.settings.minimumFetchIntervalMillis = 3600000;
        await fetchAndActivate(config);
        if (config.lastFetchStatus == 'success') {
            console.log('remote config activated');
        }
        return config;
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

    async getAlphaDriveLink(config: RemoteConfig): Promise<string> {
        return getString(config, "alphaDriveLink");
    }

    async getPitchDeckUri(config: RemoteConfig): Promise<string> {
        return getString(config, "pitchDeckUri");
    }

    async getShouldShowLoading(config: RemoteConfig): Promise<boolean> {
        return getBoolean(config, this._env_prefix + "showLoadingInMarketplace");
    }

    async getShouldShowDashboardToggle(config: RemoteConfig): Promise<boolean> {
        return getBoolean(config, this._env_prefix + "showDashboardToggle")
    }

    async getShouldShowBlogToggle(config: RemoteConfig): Promise<boolean> {
        return getBoolean(config, this._env_prefix + "showBlogToggle");
    }

    async getShowcaseAnimation(config: RemoteConfig): Promise<string> {
        return getString(config, this._env_prefix + "animationPath");
    }

    async getPartners(): Promise<Partner[]> {
        if (this._partners.length == 0) {
            const docs = await getDocs(collection(this._firestore, "partner"));
            docs.forEach((doc) => {
                const data = doc.data();
                const partner: Partner = {
                    uri: data['uri'],
                    thumbnail: data['thumbnail'],
                    id: doc.id,
                }
                this._partners.push(partner);
            });
        }
        return this._partners;
    }
}

export default new FirebaseService();
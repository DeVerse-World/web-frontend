import { FirebaseApp, initializeApp } from "firebase/app";
import { getRemoteConfig, getValue, RemoteConfig } from "firebase/remote-config";
import { Firestore, getFirestore, collection, getDocs, Timestamp } from "firebase/firestore";
import { BlogPost } from "../model/blog_post";

class FirebaseService {
    private _app: FirebaseApp;
    private _config: RemoteConfig;
    private _firestore: Firestore;
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
        // this._config = getRemoteConfig(this._app);
        // this._config.settings.minimumFetchIntervalMillis = 3600000;
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
        return blogPosts.sort((a, b) => a.created_at.getTime() > b.created_at.getTime() ? 1 : 0);
    }
}

export default new FirebaseService();
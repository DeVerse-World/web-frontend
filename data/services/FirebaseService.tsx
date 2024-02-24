import { FirebaseApp, initializeApp } from "firebase/app";
import { fetchAndActivate, getBoolean, getRemoteConfig, getString, getValue, RemoteConfig } from "firebase/remote-config";
import { Firestore, getFirestore, collection, getDocs, Timestamp, doc, setDoc, getDoc, addDoc, deleteDoc } from "firebase/firestore";
import { BlogPost } from "../model/blog_post";
import { TeamAdvisor, Partner, TeamMember } from "../model/partner";

class FirebaseService {
    private _app: FirebaseApp;
    private _firestore: Firestore;
    private _env_prefix: String;

    private _whiteListBlogPost: String[] = [];
    private _partners: Partner[] = [];
    private _communityPartners: Partner[] = [];
    private _teamMembers: TeamMember[] = [];
    private _teamAdvisors: TeamAdvisor[] = [];


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
        this._env_prefix = process.env.ENV_PREFIX || "staging_";
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

    async getBlog(id) {
        const docSnap = await getDoc(
            doc(this._firestore, "blog_post", id),
        );
        return {
            id: docSnap.id,
            ...docSnap.data(),
        };
    }

    async getBlogPosts(): Promise<BlogPost[]> {
        const blogPostDocs = await getDocs(collection(this._firestore, "blog_post"));
        const blogPosts: BlogPost[] = [];
        blogPostDocs.forEach((doc) => {
            const data = doc.data();
            const blogPost: BlogPost = {
                title: data['title'],
                thumbnail: data['thumbnail'],
                id: doc.id,
                content: data['content'],
            }
            if (data['created_at'] != null) {
                blogPost.created_at = (data['created_at'] as Timestamp).toDate()
            }
            blogPosts.push(blogPost);
        });
        return blogPosts.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
    }

    async addBlogPost(post: BlogPost) {
        await setDoc(doc(this._firestore, "blog_post", post.id), {
            title: post.title,
            content: post.content,
            creator_id: post.creator_id,
            thumbnail: post.thumbnail,
            created_at: Timestamp.fromDate(new Date())
        });
    }

    async updateBlogPost(post: BlogPost) {
        await setDoc(doc(this._firestore, "blog_post", post.id), {
            ...post,
            title: post.title,
            content: post.content,
            thumbnail: post.thumbnail,
        });
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
        const partners = [];
        const docs = await getDocs(collection(this._firestore, "partner"));
        docs.forEach((doc) => {
            const data = doc.data();
            const partner: Partner = {
                uri: data['uri'],
                thumbnail: data['thumbnail'],
                id: doc.id,
            }
            partners.push(partner);
        });
        return partners;
    }

    async getComunityPartners(): Promise<Partner[]> {
        const partners = [];
        const docs = await getDocs(collection(this._firestore, "community_partner"));
        docs.forEach((doc) => {
            const data = doc.data();
            const partner: Partner = {
                uri: data['uri'],
                thumbnail: data['thumbnail'],
                id: doc.id,
            }
            partners.push(partner);
        });
        return partners;
    }

    async getTeamMembers(): Promise<TeamMember[]> {
        if (this._teamMembers.length == 0) {
            const teamMembers = [];
            const docs = await getDocs(collection(this._firestore, "team_member"));
            docs.forEach((doc) => {
                const data = doc.data();
                const member: TeamMember = {
                    thumbnail: data['thumbnail'],
                    linkedin: data['linkedin'],
                    name: data['name'],
                    education: data['education'],
                    title: data['title'],
                    id: doc.id,
                    order_id: data['id'],
                }
                console.log(member);
                teamMembers.push(member);
            });
            this._teamMembers = teamMembers.sort((a, b) => a.order_id - b.order_id);
        }
        return this._teamMembers;
    }

    async getAdvisors(): Promise<TeamAdvisor[]> {
        if (this._teamAdvisors.length == 0) {
            const advisors = [];
            const docs = await getDocs(collection(this._firestore, "advisor_member"));
            docs.forEach((doc) => {
                const data = doc.data();
                const advisor: TeamAdvisor = {
                    thumbnail: data['thumbnail'],
                    linkedin: data['linkedin'],
                    title: data['title'],
                    name: data['name'],
                    experiences: data['experiences'],
                    id: doc.id,
                }
                console.log(data['experiences'])
                advisors.push(advisor);
            });
            this._teamAdvisors = advisors;
        }
        return this._teamAdvisors;
    }
    async updatePrivacy(content: string) {
        const today = new Date();
        await setDoc(doc(this._firestore, "info_contents", "privacy_policy"), {
            content: content,
            created_at: Timestamp.fromDate(today)
        });
    }

    async getCurrentPrivacyPolicy() {
        const res = await getDoc(doc(this._firestore, "info_contents", "privacy_policy"))
        return res.data()['content'];
    }

    async updateTermOfUse(content: string) {
        const today = new Date();
        await setDoc(doc(this._firestore, "info_contents", "term"), {
            content: content,
            created_at: Timestamp.fromDate(today)
        });
    }

    async getTermOfUse() {
        const res = await getDoc(doc(this._firestore, "info_contents", "term"))
        return res.data()['content'];
    }

    async getWelcomeImage(): Promise<string> {
        const res = await getDoc(doc(this._firestore, "settings", "welcome_section"))
        return res.data()['image'];
    }

    async getIntroSectionVideoUrl(): Promise<string> {
        const res = await getDoc(doc(this._firestore, "homepage", "intro_section"))
        return res.data().video_url;
    }
    async getImageHeadPage(): Promise<string> {
        const res = await getDoc(doc(this._firestore, "images","homepage"))
        return res.data().image_headpage_url;
    }

    async getVideoHeadPage(): Promise<string> {
        const res = await getDoc(doc(this._firestore, "images", "homepage"))
        return res.data().video_headpage_url;
    }

    async getImageContentAbout(): Promise<string> {
        const res = await getDoc(doc(this._firestore,"images","contentAbout"))
        return res.data().img_content_about;
    }
    async getImageBanner(): Promise<string> {
        const res = await getDoc(doc(this._firestore,"images","PopUp"))
        return res.data().img_banner_popup;
    }

}
    

export default new FirebaseService();
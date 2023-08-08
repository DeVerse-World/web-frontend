import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import BlogsPosts from "../../components/blog/BlogsPosts";
import LatestBlogs from "../../components/blog/LatestBlogs";
import { AppContext } from "../../components/contexts/app_context";
import Button from "../../components/Button";
import { isAdminUser } from "../../utils/user_utils";
import FirebaseService from "../../data/services/FirebaseService";

export default function BlogPage() {
    const { user } = useContext(AppContext);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        FirebaseService.getBlogPosts().then(response => setBlogs(response));
    }, []);
    let latestBlogs = [];
    let remainingBlogs = [];

    if (blogs.length > 3) {
        latestBlogs = blogs.slice(0, 3);
        remainingBlogs = blogs.slice(4, blogs.length);
    }
    else {
        remainingBlogs = blogs;
    }
    return (
        <>
            <Head>
                <title>Blogs</title>
            </Head>
            <div className='flex flex-col items'>
                {isAdminUser(user) && (
                    <div className="w-18 p-4">
                        <Button
                            primary
                            href="/blogs/new"
                        >
                            Create new blog
                        </Button>
                    </div>
                )}
                {latestBlogs.length === 3 && (
                    <LatestBlogs blogs={latestBlogs} />
                )}
                <BlogsPosts blogs={remainingBlogs} />
            </div>
    
        </>
   );
}
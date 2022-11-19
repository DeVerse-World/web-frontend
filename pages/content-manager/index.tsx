import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { getCommonLayout } from '../../components/common/CommonLayout';
import { BlogPost } from '../../data/model/blog_post';
import { getDateString } from '../../utils/time_util';
import FirebaseService from '../../data/services/FirebaseService';
import { userInfo } from 'os';
import { AppContext } from '../../components/contexts/app_context';
import UnauthorizedView from '../../components/UnauthorizedView';


type BlogPostItemProps = {
    data: BlogPost,
    onEdit: (BlogPost) => void,
    onDelete: (BlogPost) => void,
}

function BlogPostItem(props: BlogPostItemProps) {
    return (
        <div className="nft-card md:w-[500px] w-[350px] md:h-[400px] h-[250px] flex flex-col justify-center no-underline text-gray-600 hover:text-gray-500 "
        >
            <div className="md:h-[250px] h-[150px] overflow-hidden flex flex-col justify-center">
                <img src={props.data.thumbnail || "/images/placeholder.jpg"} />
            </div>
            <span className="md:text-2xl text-sm px-4 py-2 font-semibold text-blue-300" style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }}>{props.data.title}</span>
            <div className='flex flex-row justify-between px-4 gap-4 text-white'>
                <span className='flex-grow'>{getDateString(props.data.created_at)}</span>
                <span className='text-green-500 cursor-pointer' onClick={() => props.onEdit(props.data)}>Click to edit</span>
                <span className='text-red-500 cursor-pointer' onClick={() => props.onDelete(props.data)}>Delete</span>
            </div>
        </div>
    )
}

function ContentManager() {
    const {user} = useContext(AppContext);

    const [postTitle, setPostTitle] = useState('');
    const [postThumbnail, setPostThumbnail] = useState('');
    const [postUri, setPostUri] = useState('')
    const [editingPost, setEditingPost] = useState<BlogPost>();
    const [posts, setPosts] = useState<BlogPost[]>([]);

    const onEdit = (post?: BlogPost) => {
        setEditingPost(post)
        setPostTitle(post?.title || "")
        setPostThumbnail(post?.thumbnail || "")
        setPostUri(post?.uri || "")
    }

    const onDeletePost = (post: BlogPost) => {
        FirebaseService.deleteBlogPost(post).then((res) => {
            onEdit(null)
            getPosts();
            alert('Delete success')
        })
    }

    const getPosts = () => {
        FirebaseService.getBlogPosts().then(setPosts)
    }

    const onPostUpdated = () => {
        if (!postTitle || !postUri || !postThumbnail) {
            alert('Invalid values. Every field must have values')
            return;
        }
        const updatingPost = editingPost ?? {} as BlogPost
        updatingPost.title = postTitle
        updatingPost.thumbnail = postThumbnail;
        updatingPost.uri = postUri;
        FirebaseService.updateBlogPost(updatingPost).then((res) => {
            onEdit(null)
            getPosts();
            alert('Update success');
        });
    }

    if (user == null) {
        return <UnauthorizedView />
    }

    return (
        <div id='section-content' className='flex flex-col items-center p-4 gap-2'>
            <input className='w-[800px] p-2' placeholder='Post title' value={postTitle} onChange={(e) => setPostTitle(e.target.value)}></input>
            <input className='w-[800px] p-2' placeholder='Thumbnail uri' value={postThumbnail} onChange={(e) => setPostThumbnail(e.target.value)}></input>
            <input className='w-[800px] p-2' placeholder='Post uri' value={postUri} onChange={(e) => setPostUri(e.target.value)}></input>
            <div className='flex flex-row gap-4'>
                <button className='rounded-md px-8 py-1 bg-deverse-gradient text-white' onClick={onPostUpdated}>
                    {editingPost != null ? "Update post" : "Create new post"}
                </button>
                <button className='rounded-md px-8 py-1 bg-deverse-negative-gradient text-white' onClick={() => onEdit(null)}>
                    Clear
                </button>
            </div>

            <button className='rounded-md px-8 py-1 my-4 bg-deverse-gradient text-white' onClick={getPosts}>Get Posts from server</button>

            <div className="flex flex-row gap-4 px-4 flex-wrap justify-center">
                {posts.map(item => <BlogPostItem data={item} key={item.id} onEdit={onEdit} onDelete={onDeletePost} />)}
            </div>
        </div>
    )
}

ContentManager.getLayout = getCommonLayout;

export default ContentManager;
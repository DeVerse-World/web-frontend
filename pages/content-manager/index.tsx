import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { getCommonLayout } from '../../components/common/CommonLayout';
import BlogService from '../../data/services/BlogService';
import { BlogPost } from '../../data/model/blog_post';
import { timeStampToString } from '../../utils/time_util';
const getMetaData = require('metadata-scraper')

const EditorModules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const EditorFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

/* 
 * PropType validation
 */
// const EditorPropTypes = {
//     placeholder: PropTypes.string,
//   }

function ContentManager() {
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const onPost = () => {
        if (!postTitle || !postContent) {
            return;
        }
        BlogService.createPost(postTitle, postContent);
        window.alert('Post created successfully')
    }

    const onTitleChange = (e) => {
        setPostTitle(e.target.value)
    }

    const getPosts = () => {

    }

    return (
        <div id='section-content' className='flex flex-col items-center p-4 gap-2'>
            <input className='w-[800px] p-2' placeholder='Post title' value={postTitle} onChange={onTitleChange}></input>
            <div className='w-[800px] bg-white'>
                <ReactQuill id='content-editor' value={postContent} onChange={setPostContent} modules={EditorModules}
                    formats={EditorFormats} placeholder="Write something" />
            </div>
            <button className='rounded-md px-8 py-1 bg-deverse-gradient text-white' onClick={onPost}>Post</button>
            <button className='rounded-md px-8 py-1 bg-deverse-gradient text-white' onClick={getPosts}>Fetch Posts</button>

            <div className='flex flex-row flex-wrap gap-8'>
                {posts.map(post =>
                    <div className="h-[350px] w-[400px] nft-card flex flex-col ">
                        <h3 className='text-center bg-gray-500'>{post.title}</h3>
                        <div className='flex-grow bg-white p-4'> {(post.content)} </div>
                        <span className='text-end bg-gray-300 p-2'>Created on {timeStampToString(post.created_at)}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

ContentManager.getLayout = getCommonLayout;

export default ContentManager;
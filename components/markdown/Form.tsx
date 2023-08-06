import { useState, useCallback, useContext } from "react";
import { useRouter } from 'next/router'
import Editor from "./Editor";
import Preview from "./Preview";
import Button from "../Button";
import FirebaseService from "../../data/services/FirebaseService";
import { AppContext } from "../contexts/app_context";
import { isAdminUser } from "../../utils/user_utils";
import { undoDepth } from "@codemirror/commands";

const Form = ({ post }) => {
    const { user } = useContext(AppContext);
    const router = useRouter();
    const [doc, setDoc] = useState(post ? post.content : "");
    const [thumbnail, setThumbnail] = useState(post ? post.thumbnail : "");
    const [title, setTitle] = useState(post ? post.title : "");
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const handleDocChange = useCallback((newDoc: string) => {
        setDoc(newDoc);
    }, []);

    if (!user || !isAdminUser(user)) {
        router.push("/blogs");
        return;
    }
    
    const saveToFirebase = async () => {
        const newPost = {
            ...(post ? post : {}),
            id: post ? post.id : title.replace(/\s+/g, '-'),
            creator_id: post && post.creator_id ? post.creator_id : user.id,
            thumbnail,
            title,
            content: doc,
        };

        if (doc === undefined || doc === null || doc === "") {
            alert("Markdown content must not be empty")
            return;
          }       


        // Edit
        if (post) {    
            await FirebaseService.updateBlogPost(newPost);
        } else { // Create
            await FirebaseService.addBlogPost(newPost);
        }
    };

    return (
        <div className="h-full flex flex-col gap-2 max-w-7xl mx-auto p-4">
            <h1 className="">
                Markdown Editor
            </h1>

            <div className="w-full">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-white">
                    Title
                </label>
                <div className="mt-2">
                <input
                    id="title"
                    name="title"
                    type="text" 
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    onChange={event => setTitle(event.target.value)}
                    value={title}
                />
                </div>
            </div>

            <div className="mt-2 w-full">
                <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-white">
                    Thumbnail URL
                </label>
                <div className="mt-2">
                    <input
                        id="thumbnail"
                        name="thumbnail"
                        type="text"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        onChange={event => setThumbnail(event.target.value)}
                        value={thumbnail}
                    />
                    <img className="h-32 w-32" src={thumbnail} />
                </div>
            </div>

            <div className="mt-2 flex flex-col sm:flex-row w-full gap-4">
                <div className="w-full">              
                    <div>Editor</div>  
                    <Editor initialDoc={doc} onChange={handleDocChange} />
                </div>
                <div className="w-full">
                    <div>Preview</div>
                    <Preview doc={doc} />
                </div>
            </div>

            <div className="flex flex-row-reverse mt-4">
                <Button
                    primary
                    disabled={isButtonClicked}
                    onClick={async () => {
                        setIsButtonClicked(true);
                        await saveToFirebase();
                        router.push('/blogs')
                    }}
                >
                    Save
                </Button>
            </div>
        </div>
    );
}

export default Form;


import { useEffect, useState } from "react";
import FirebaseService from "../../data/services/FirebaseService";

const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        [{ 'color': ["#000000", "#ffffff"] }]
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}

function PolicyEditor() {
    const [privacyContent, setPrivacyContent] = useState('');

    useEffect(() => {
        FirebaseService.getCurrentPrivacyPolicy().then(res => {
            setPrivacyContent(res)
        })
    }, [])

    const onSaved = () => {
        FirebaseService.updatePrivacy(privacyContent).then(res => {
            alert('Updated successfully')
        })
    }

    return (
        <div className='py-4 px-2 max-w-[800px] w-[80%]'>
            <ReactQuill theme="snow"
                modules={modules}
                value={privacyContent} onChange={setPrivacyContent} />
            <button onClick={onSaved} className='bg-deverse-gradient my-4 w-32 h-8 rounded-lg'>Save</button>
        </div>
    )
}

export default PolicyEditor;
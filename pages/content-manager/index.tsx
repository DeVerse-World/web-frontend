import React, { useState } from 'react';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

import 'react-quill/dist/quill.snow.css';
import { getCommonLayout } from '../../components/common/CommonLayout';


function ContentManager() {
    const [value, setValue] = useState('');

    return (
        <div id='section-content'>
            <div className='bg-white w-[800px]'>
                <ReactQuill  value={value} onChange={setValue} />

            </div>
        </div>
    )
}

ContentManager.getLayout = getCommonLayout;

export default ContentManager;
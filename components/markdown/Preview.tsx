import React from 'react'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'

interface Props {
    doc: string
}

const Preview = (props: Props) => {
    return (
        <div className='px-8 mx-auto max-w-xl lg:mx-0 lg:max-w-7xl'>
            <ReactMarkdown
                children={props.doc}
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({node, children, ...props}) => <div className="mt-8 text-3xl font-bold tracking-tight text-light sm:text-4xl">{children}</div>,
                    h2: ({node, children, ...props}) => <div className="mt-4 text-2xl font-bold tracking-tight text-light">{children}</div>,
                    p: ({node, children, ...props}) => <div className="mt-2 text-light max-w-2xl">{children}</div>,                    
                }}
            />
        </div>
    );
}

export default Preview;
type GTMHeaderProps = {
    tagId: string
}

function GTMHeader(props: GTMHeaderProps) {
    return (
        <iframe src={`https://www.googletagmanager.com/ns.html?id=${props.tagId}`}
            height="0" width="0" style={{
                display: 'none',
                visibility: 'hidden'
            }}
        >
        </iframe>
    )
}

export default GTMHeader;
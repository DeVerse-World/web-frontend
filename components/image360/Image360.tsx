import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
const ReactPhotoSphereViewer = dynamic(
    () =>
        import('react-photo-sphere-viewer').then(
            (mod) => mod.ReactPhotoSphereViewer
        ),
    {
        ssr: false,
    }
);

const Image360 = ({ source }) => {
    return (
        <div className="h-60 w-80 sm:h-96 sm:w-auto">
            <ReactPhotoSphereViewer src={source} height={'100%'} width={"100%"} />
        </div>
    );
};

export default Image360;
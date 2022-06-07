import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import HomeNavbar from '../../components/home/HomeNavbar'
import ModelViewer from '../../components/ModelViewer';

function Showcase() {
  const [modelPath, setModelPath] = useState<string>(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    let query = router.query;
    if (query['model']) {
      setModelPath(`/3d/${query['model']}.glb`);
    }
  }, [router.isReady])

  return (
    <>
      <HomeNavbar />
      <div className='text-center'>
        <h1>Models</h1>
      </div>
      <div className='flex flex-row justify-center '>
        {modelPath && <ModelViewer filePath={modelPath} />}
      </div>
    </>

  )
}

export default Showcase;
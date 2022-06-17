import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import ModelViewer from '../../components/ModelViewer';
import AssetService from "../../data/services/asset_service";

function Showcase() {
  const [modelPath, setModelPath] = useState<string>(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    let query = router.query;
    if (query['model']) {
      setModelPath(AssetService.getFullAssetUrl(query['model'] as string));
    }
  }, [router.isReady])

  return (
    <>
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
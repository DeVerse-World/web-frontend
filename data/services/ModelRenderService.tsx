import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class ModelPreviewService {
    private _loader: GLTFLoader = new GLTFLoader();
    load(path: string, onLoaded: (gltf: GLTF) => void, onLoading?: (progress: number) => void) {
        if (!path) {
            return;
        }
        this._loader.load(path, (gltf: GLTF) => {
            onLoaded(gltf)
        }, (e) => {
            if (onLoading)
                onLoading(e.loaded * 100/e.total )
        }, (error) => {
            console.log(error)
        });
    }
}

export default new ModelPreviewService();
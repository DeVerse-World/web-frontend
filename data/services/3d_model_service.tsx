import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class ModelPreviewService {
    private _loader: GLTFLoader = new GLTFLoader();
    load(path: string, onLoaded: (gltf: GLTF)=> void) {
        this._loader.load(path, (gltf: GLTF) => {
            onLoaded(gltf)
        });
    }
}

export default new ModelPreviewService();
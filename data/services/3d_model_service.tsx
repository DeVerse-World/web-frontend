import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class ModelPreviewService {
    private _loader: GLTFLoader = new GLTFLoader();
    load(onLoaded: (gltf: GLTF)=> void) {
        this._loader.load('/3d/cleric_idle_equipped.glb', (gltf: GLTF) => {
            onLoaded(gltf)
        });
    }
}

export default new ModelPreviewService();
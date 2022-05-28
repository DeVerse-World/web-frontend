# Deverse Web Frontend

Using Next.js, Ethers.js

`npm run dev`

Environment variables: Change them in next.config.js

# Using gltf components
To generate react component from .gltf file
`npx gltfjsx public/3d/path-to-file.gltf`
Then move that file to components/gltf
2 options:
- Load the file by copy paste the content of the generated file to the corresponding page. (not preferred)
- Rename the export function of the generated file, and use that component as react component directly.
*Caution: make sure to edit "useGLTF.prelogit ad" and "useGLTF" of the generated file to refer to the correct path of.gltf file
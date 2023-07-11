import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

const MDEditor = () => {
  const [value, setValue] = useState("");
  return (
    <Editor value={value} onChange={setValue} />
  );
};

export default MDEditor;


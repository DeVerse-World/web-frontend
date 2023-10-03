import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Form from "../../../components/markdown/Form";
import FirebaseService from "../../../data/services/FirebaseService";

export default function EditBlogPage() {
  const [doc, setDoc] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.id)
      FirebaseService.getBlog(router.query.id).then(blog => setDoc(blog));
  }, [router.query.id]);

  return (
    <div className="w-full h-full p-4">
      {doc && (  
        <Form post={doc}/>  
      )}
    </div>
  )
}
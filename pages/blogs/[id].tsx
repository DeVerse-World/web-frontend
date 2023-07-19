import { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router'
import Preview from "../../components/markdown/Preview";
import FirebaseService from "../../data/services/FirebaseService";
import Button from "../../components/Button";
import { AppContext } from "../../components/contexts/app_context";
import { isAdminUser } from "../../utils/user_utils";


export default function BlogPage() {
  const router = useRouter();
  const { user } = useContext(AppContext);
  const [doc, setDoc] = useState("");

  useEffect(() => {
    if (router.query.id)
      FirebaseService.getBlog(router.query.id).then(blog => setDoc(blog.content));
  }, [router.query.id]);

  return (
    <div className="w-full h-full p-4">
      {isAdminUser(user) && router.query.id && (
        <div className="my-4">
          <Button
            primary
            href={`/blogs/edit/${router.query.id}`}
          >
            Edit
          </Button>
        </div>
      )}
      <Preview doc={doc} />
    </div>
  )
}
import { useState, useEffect, useContext } from "react";
import Head from 'next/head'
import { useRouter } from 'next/router'
import Preview from "../../components/markdown/Preview";
import FirebaseService from "../../data/services/FirebaseService";
import Button from "../../components/Button";
import AlertModal from "../../components/AlertModal";
import { AppContext } from "../../components/contexts/app_context";
import { isAdminUser } from "../../utils/user_utils";

export const getServerSideProps = async ({ params }) => {
  const blog = await FirebaseService.getBlog(params.id);
  return {
    props: {
      blog: {
        ...blog,
        created_at: null,
      }
    }
  }
}

export default function BlogPage({ blog }) {
  const router = useRouter();
  const [openAlert, setOpenAlert] = useState(false)
  const { user } = useContext(AppContext);
  
  if (!blog) router.push('/blogs')

  const onDeleteBlog = () => {
    FirebaseService.deleteBlogPost(blog).then(res => {
      router.push("/blogs")
    });
  }

  return (
    <>
      <Head>
        <title key="title">{blog.title}</title>
        <meta
          name="description"
          content={blog.title}
          key="meta_description"
        />
        <meta
          property="og:description"
          content={blog.title}
          key="og:description"
        />
        <meta
          property="og:title"
          content={blog.title}
          key="og:title"
        />
        <meta
          property="og:image"
          content={blog.thumbnail}
          key="og:image"
        />
      </Head>
      <AlertModal
        actionText="delete this blog"
        buttonText="Delete"
        onSubmit={onDeleteBlog}
        open={openAlert}
        setOpen={setOpenAlert}
      />
      <div className="w-full h-full p-4">
        {isAdminUser(user) && (
          <div className="my-4 flex gap-2">
            <Button
              primary
              href={`/blogs/edit/${blog.id}`}
            >
              Edit
            </Button>
            <Button
              secondary
              onClick={() => setOpenAlert(true)}
            >
              Delete
            </Button>
          </div>
        )}
        <Preview doc={blog.content} />
      </div>
    </>
  );
}
import { useState, useEffect, useContext } from "react";
import Head from 'next/head'
import { useRouter } from 'next/router'
import Preview from "../../components/markdown/Preview";
import FirebaseService from "../../data/services/FirebaseService";
import Button from "../../components/Button";
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
  const { user } = useContext(AppContext);
  
  if (!blog) router.push('/blogs')

  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta
          name="description"
          content={blog.title}
        />
        <meta
          property="og:description"
          content="og:desciption"
        />
        <meta
          property="og:title"
          content={blog.title}
        />
        <meta
          property="og:image"
          content={blog.thumbnail}
        />
      </Head>
      <div className="w-full h-full p-4">
        {isAdminUser(user) && (
          <div className="my-4">
            <Button
              primary
              href={`/blogs/edit/${blog.id}`}
            >
              Edit
            </Button>
          </div>
        )}
        <Preview doc={blog.content} />
      </div>
    </>
  );
}
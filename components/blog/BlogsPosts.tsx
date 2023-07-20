import FirebaseService from "../../data/services/FirebaseService";
import { getTimeString } from "../../utils/time_util";
import Link from "next/link";
import BlogCard from "../BlogCard";

export default function BlogsPosts({ blogs }) {
  return (
    <div className=" py-24 sm:py-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-full">
          <h2 className="text-2xl font-bold tracking-tight text-lightest sm:text-4xl">From the blog</h2>
          <p className="mt-2 text-lg leading-8 text-lighter">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard 
              thumbnail={blog.thumbnail}
              title={blog.title}
              created_at={blog.created_at}
              id={blog.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
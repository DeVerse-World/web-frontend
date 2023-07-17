import FirebaseService from "../../data/services/FirebaseService";
import { getTimeString } from "../../utils/time_util";
import Link from "next/link";

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
            <article key={blog.id} className="flex flex-col items-start">
              <div className="relative w-full">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                {blog.created_at && (
                  <div className="mt-4 flex items-center gap-x-4 text-xs">
                    <time dateTime={blog.created_at} className="text-gray-500">
                      {getTimeString(blog.created_at)}
                    </time>
                  </div>
                )}
                <div className="group relative">x
                  <h3 className="mt-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link className="no-underline text-brand" href={`/blogs/${blog.id}`} >
                      <div className="cursor-pointer text-brand hover:text-light">
                        <span className="absolute inset-0 text-brand" />
                        {blog.title}
                      </div>
                    </Link>
                  </h3>
                  {/* <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p> */}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
import { useEffect, useState } from "react";
import { BlogPost } from "../../data/model/blog_post";
import FirebaseService from "../../data/services/FirebaseService";
import LatestBlogs from "../blog/LatestBlogs";

type BlogPostItemProps = {
  data: BlogPost;
};

function BlogPostItem(props: BlogPostItemProps) {
  return (
    <a
      className="nft-card nft-card-hover md:w-[500px] w-[350px] md:h-[400px] h-[250px] flex flex-col justify-center no-underline text-gray-600 hover:text-gray-500 "
      href={props.data.uri}
      target="_blank"
    >
      <div className="md:h-[250px] h-[150px] overflow-hidden flex flex-col justify-center">
        <img
          src={props.data.thumbnail || "/images/placeholder.webp"}
          alt={props.data.title}
        />
      </div>
      <span
        className="md:text-2xl text-sm px-4 py-2 font-semibold text-blue-300"
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {props.data.title}
      </span>
    </a>
  );
}

export default function BlogPostSection() {
  const [data, setData] = useState<BlogPost[]>([]);
  useEffect(() => {
    FirebaseService.getBlogPosts().then(setData);
  }, []);

  return (
    <>
      {data.length > 0 && (
        <div className="px-4 py-2 m-4">
          <LatestBlogs blogs={data} />
        </div>
      )}
    </>
  );
}

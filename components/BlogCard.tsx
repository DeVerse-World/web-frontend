import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';
import classNames from 'classnames';
import Link from 'next/link';
import { getTimeString } from '../utils/time_util';

const BlogCard = ({thumbnail, title, created_at, id  }) => {
  return (
    <Link href={`/blogs/${id}`} className="no-underline">
      <article
        className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-56"
      >
        <img src={thumbnail} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
        <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

        <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
          <time dateTime={created_at} className="mr-8">
            {getTimeString(created_at)}
          </time>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
          {title}
        </h3>
      </article>
    </Link>
  );
};


export default BlogCard;


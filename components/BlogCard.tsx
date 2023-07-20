import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';
import classNames from 'classnames';
import Link from 'next/link';
import { getTimeString } from '../utils/time_util';

const BlogCard = ({thumbnail, title, created_at, id  }) => {

    return (
        <div className="overflow-hidden rounded-lg bg-dark ring-1 ring-inset ring-medium text-left transition-all sm:my-4 sm:w-full sm:max-w-lg">
            <div className="group text-sm">
                <div className="aspect-h-1  w-full overflow-hidden rounded-t-lg bg-gray-100">
                    <img
                        src={thumbnail}
                        className="h-full w-full aspect-[12/10] object-cover object-center bg-darkest"
                        loading="lazy"
                    />
                </div>
               
                <div className="max-w-xl">
             
                  <div className="mt-4 flex items-center gap-x-4 text-xs">
                    <time dateTime={created_at} className="text-gray-500">
                      {getTimeString(created_at)}
                    </time>
                  </div>
           
                 <div className="font-semibold">
                      <Link href={`/blogs/${id}`} className="mt-3 no-underline text-light">
                        <span>
                          <span  />
                          {title}
                        </span>
                      </Link>
                    </div>
               
                </div>
            </div>
        </div>
    )
};


export default BlogCard;


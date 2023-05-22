import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';


const Button = ({
  primary=false, secondary=false, tertiary=false, children, onClick, className,
  // <Link> props
  href, prefetchLink=false, target,
}) => {
  return (
    <button
      type="button"
      className={classNames(
        "inline-flex justify-center rounded-md px-3 py-2 text-sm font-semibold overflow-hidden sm:col-start-1",
        primary && "bg-brand text-darkest hover:bg-cyan-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-cyan-300 active:text-dark focus-visible:outline-brand",
        secondary && "bg-transparent text-brand border border-brand",
        tertiary && "bg-transparent text-brand underline",
        className,
      )}
      onClick={onClick}
    >
      {href ? (
        <Link className="text-inherit" href={href} prefetch={prefetchLink}>
          {/* <Link> can only have 1 children */}
          <span>{children}</span>
        </Link>
      ) : children}
    </button>
  );
};

export default Button;

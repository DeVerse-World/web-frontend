import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

type ButtonProps = {
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  size?: string;
  children: any;
  onClick: () => void;
  className?: string;
  href?: string;
  prefetchLink?: boolean;
}

const Button = ({
  primary=false, secondary=false, tertiary=false, children, onClick, className, size='md',
  // <Link> props
  href, prefetchLink=false,
}: ButtonProps) => {
  let sizeClassname;
  switch (size) {
    case "textOnly":
      sizeClassname = "text-sm font-normal";
      break;
    case "sm":
      sizeClassname = "px-1 py-1 text-sm font-normal";
      break;
    case "md":
      sizeClassname = "px-3 py-2 text-sm font-semibold";
      break;
    default:
      sizeClassname = "px-3 py-2 text-sm font-semibold"; // md
  }
  return (
    <button
      type="button"
      className={classNames(
        "inline-flex justify-center rounded-md overflow-hidden sm:col-start-1",
        sizeClassname,
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

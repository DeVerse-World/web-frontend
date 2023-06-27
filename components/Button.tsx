import { memo } from 'react';
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
  linkInNewTab?: boolean;
}

const Button = ({
  primary=false, secondary=false, tertiary=false, children, onClick, className, size='md',
  // <Link> props
  href, prefetchLink=false, linkInNewTab=false,
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
      sizeClassname = "px-3 py-2 text-lg font-semibold";
      break;
    default:
      sizeClassname = "px-3 py-2 text-sm font-semibold"; // md
  }

  const renderChildren = () => {
    if (!href) return children;

    if (linkInNewTab)
      return (
        <a className="text-inherit no-underline hover:text-brand" href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );

    return (
      <Link className="text-inherit" href={href} prefetch={prefetchLink}>
        {/* <Link> can only have 1 children */}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classNames(
        "inline-flex justify-center items-center rounded-md overflow-hidden",
        sizeClassname,
        primary && "bg-brand text-darkest hover:bg-cyan-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-cyan-300 active:text-dark focus-visible:outline-brand",
        secondary && "bg-transparent text-brand border border-brand",
        tertiary && "bg-transparent text-brand underline",
        className,
      )}
      onClick={onClick}
    >
      {renderChildren()}
    </button>
  );
};

export default memo(Button);

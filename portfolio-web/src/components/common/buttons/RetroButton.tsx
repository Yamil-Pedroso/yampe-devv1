import React from "react";
import clsx from "clsx";

interface RetroButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  href: string;
}

const RetroButton: React.FC<RetroButtonProps> = ({
  children,
  className,
  href,
  ...props
}) => {
  return (
    <a
      href={href}
      {...props}
      className={clsx(
        `
        relative
        font-bold
        border-2 border-black
        shadow-[6px_6px_0px_#000]
        transition-all
        duration-150
        active:translate-x-[3px]
        active:translate-y-[3px]
        active:shadow-[3px_3px_0px_#000]
        group
        `,
        className,
      )}
    >
      {children}
    </a>
  );
};

export default RetroButton;

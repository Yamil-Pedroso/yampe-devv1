import React from "react";
import clsx from "clsx";

interface RetroButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onClick?: () => void;
}

const RetroBtn: React.FC<RetroButtonProps> = ({
  children,
  className,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
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
    </div>
  );
};

export default RetroBtn;

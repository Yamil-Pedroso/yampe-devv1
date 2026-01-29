import React from "react";
import clsx from "clsx";

interface RetroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const RetroContainer: React.FC<RetroButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        `
        relative

        font-bold
        border-2 border-black


        `,
        className,
      )}
    >
      {children}
    </button>
  );
};

export default RetroContainer;

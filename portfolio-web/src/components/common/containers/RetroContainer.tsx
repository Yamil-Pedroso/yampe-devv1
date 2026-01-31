import React, { forwardRef } from "react";
import clsx from "clsx";

interface RetroContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const RetroContainer = forwardRef<HTMLDivElement, RetroContainerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={clsx(
          `
          relative
          border-2 border-black
          `,
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

RetroContainer.displayName = "RetroContainer";

export default RetroContainer;

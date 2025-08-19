/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { motion, MotionProps } from "framer-motion";

type CommonProps = {
  children?: React.ReactNode;
  className?: string;
};

type ButtonAsLinkProps = CommonProps &
  MotionProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    href: string;
  };

type ButtonAsButtonProps = CommonProps &
  MotionProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

function Button(props: ButtonAsLinkProps): React.ReactElement;
function Button(props: ButtonAsButtonProps): React.ReactElement;

function Button(props: ButtonAsLinkProps | ButtonAsButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-2xl px-4 h-[3rem] " +
    "bg-[var(--element-bg-color)] text-[var(--font-btn-color)] " +
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
    "focus-visible:outline-[var(--font-btn-color)]";

  const { className, children, ...rest } = props as any;
  const cls = `${base} ${className ?? ""}`;

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as Omit<
      ButtonAsLinkProps,
      "children" | "className"
    >;
    return (
      <motion.a href={href} className={cls} {...anchorRest}>
        {children}
      </motion.a>
    );
  }

  const buttonRest = rest as Omit<
    ButtonAsButtonProps,
    "children" | "className"
  >;
  return (
    <motion.button className={cls} {...buttonRest}>
      {children}
    </motion.button>
  );
}

export default Button;

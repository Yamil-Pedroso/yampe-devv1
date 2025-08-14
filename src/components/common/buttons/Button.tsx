import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  className,
  type = "button",
}) => {
  const buttonClassName =
    "flex items-center justify-center rounded-2xl px-4 bg-[var(--element-bg-color)] text-[var(--font-btn-color)]" +
    (className ? ` ${className}` : "");

  if (href) {
    return (
      <a href={href} className={buttonClassName}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonClassName} type={type}>
      {children}
    </button>
  );
};

export default Button;

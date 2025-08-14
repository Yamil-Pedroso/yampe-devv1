import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  className,
}) => {
  const buttonClassName =
    "flex items-center justify-center px-4 rounded-[1rem] bg-[var(--element-bg-color)] text-[var(--font-btn-color)]" +
    (className ? ` ${className}` : "");

  if (href) {
    return (
      <a href={href} className={buttonClassName}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonClassName}>
      {children}
    </button>
  );
};

export default Button;

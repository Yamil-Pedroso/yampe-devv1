import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, href, onClick }) => {
  const className =
    "flex items-center justify-center px-4 rounded bg-[var(--element-bg-color)] text-[var(--font-btn-color)]";

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;

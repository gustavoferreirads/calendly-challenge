import React, { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: "filled" | "outlined" | "text";
};

const Button: React.FC<ButtonProps> = ({ children, onClick, className = '', type = 'button', disabled = false, variant = "filled" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        h-12 
        w-full 
        lg:w-auto 
        px-6 
        py-2 
        font-semibold 
        rounded-full 
        ${variant !== "text" ? 
          variant === "filled" 
            ? "shadow-md bg-blue-600 hover:opacity-95 text-white" 
            : "shadow-md bg-grayBackground hover:bg-background border-primary border-2 text-primary" 
          : ""
        } 
        font-medium 
        outline-none 
        ${className} 
        ${disabled && "pointer-events-none opacity-50"}
      `}
    >
      {children}
    </button>
  );
};

export default Button;

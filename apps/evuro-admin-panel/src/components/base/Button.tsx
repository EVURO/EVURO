import { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import Loader from './Loader';
import React from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className: string;
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  isLoading,
  ...rest
}) => {
  return (
    <button
      className={`btn capitalize hover:bg-[#11B0F0] ${className}`}
      {...rest}
    >
      {isLoading && <Loader />}
      {children}
    </button>
  );
};

export default Button;

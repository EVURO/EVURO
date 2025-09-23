import React, { ReactNode, HTMLAttributes } from 'react';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
}

const Text: React.FC<TextProps> = ({ children, className, ...rest }) => {
  return (
    <p className={className} {...rest}>
      {children}
    </p>
  );
};

export default Text;

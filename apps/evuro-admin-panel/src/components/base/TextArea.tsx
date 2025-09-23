import { InputHTMLAttributes } from 'react';
import Text from './Text';
import React from 'react';

interface textAreaPropsTypes extends InputHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string;
  className?: string;
  placeholder: string;
}

const TextArea = ({
  errorMessage,
  className,
  placeholder,
  ...rest
}: textAreaPropsTypes) => {
  return (
    <div className="flex flex-col">
      <textarea
        className={`textarea textarea-bordered focus:outline-none ${className} ${
          errorMessage && 'textarea-error'
        }`}
        placeholder={placeholder}
        {...rest}
      ></textarea>
      {errorMessage && (
        <Text className="mt-2 text-xs italic font-normal pl-4 text-error">
          *{errorMessage}
        </Text>
      )}
    </div>
  );
};

export default TextArea;

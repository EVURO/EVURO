import { Svgs } from '../../../../../libs/assets/src';
import Text from './Text';
import React, { InputHTMLAttributes } from 'react';

interface fileInputPropsTypes extends InputHTMLAttributes<HTMLInputElement> {
  inputRef?: React.LegacyRef<HTMLInputElement>;
  errorMessage?: string;
  className?: string;
  myPlaceholder?: string;
}

const FileInput = ({
  errorMessage,
  className,
  inputRef,
  myPlaceholder,
  ...rest
}: fileInputPropsTypes) => {
  return (
    <div className="flex flex-col">
      <div className="form-control relative w-full mt-2">
        {myPlaceholder && (
          <span className="absolute top-1/4 left-4 cursor-default ">
            Choose file
          </span>
        )}
        <input
          type="file"
          ref={inputRef}
          className={`file-input file-input-bordered focus:outline-none ${className?.includes(
            'w-[230px]' ? 'w-[230px]' : 'w-full'
          )}  p-0 ${className} ${errorMessage && 'file-input-error'} `}
          {...rest}
        />
      </div>
      {errorMessage && (
        <Text className="mt-2 text-xs italic font-normal pl-4 text-error">
          *{errorMessage}
        </Text>
      )}
    </div>
  );
};

export default FileInput;

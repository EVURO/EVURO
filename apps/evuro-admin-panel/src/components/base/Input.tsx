import { FC, InputHTMLAttributes, useState, useEffect } from 'react';
import React from 'react';
import Text from './Text';
import { BiShow, BiHide } from 'react-icons/bi';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  className?: string;
  placeholder: string;
  daysAdornmentText?: boolean;
  type?: string;
}

const Input: FC<InputProps> = ({
  errorMessage,
  className,
  placeholder,
  daysAdornmentText,
  type,
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const passwordStyle = 'absolute right-6 top-[15px] flex items-center';
  const daysTextStyle = 'absolute right-6 top-1/3 flex items-center';

  function togglePasswordVisibility(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    setIsPasswordVisible((prevState) => !prevState);
  }

  useEffect(() => {
    if (type === 'password') {
      setIsPasswordVisible(true);
    }
  }, [type]);

  return (
    <div className="flex flex-col relative w-full">
      <input
        type={
          isPasswordVisible ? 'password' : type === 'number' ? 'number' : 'text'
        }
        placeholder={placeholder}
        className={`input input-bordered focus:outline-none ${
          className?.includes('w-[230px]')
            ? 'lg:w-[230px]'
            : className?.includes('w-[450px]')
            ? 'w-[450px]'
            : 'w-full'
        }  relative autofill:!bg-white ${className} ${
          errorMessage && 'input-error'
        }`}
        {...rest}
      />

      {type === 'password' && (
        <button
          className={type === 'password' ? passwordStyle : daysTextStyle}
          onClick={(e) => togglePasswordVisibility(e)}
        >
          {daysAdornmentText ? (
            <Text className=" text-[#9ca4b2] font-medium">Days</Text>
          ) : isPasswordVisible ? (
            <BiHide size={30} color={'#9ca4b2'} />
          ) : (
            <BiShow size={30} color={'#9ca4b2'} />
          )}
        </button>
      )}

      {errorMessage && (
        <Text className="mt-2 text-xs italic font-normal pl-4 text-error">
          *{errorMessage}
        </Text>
      )}
    </div>
  );
};

export default Input;

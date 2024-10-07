import React, { SelectHTMLAttributes } from 'react';
import Text from './Text';

interface selectPropsTypes extends SelectHTMLAttributes<HTMLSelectElement> {
  errorMessage?: string;
  className?: string;
  options: Array<{ label: string; value: string | number }>;
  placeholder: string;
}
const Select = ({
  errorMessage,
  className,
  options,
  placeholder,
  ...rest
}: selectPropsTypes) => {
  return (
    <div>
      <select
        className={`select select-bordered ${className} ${
          errorMessage && 'select-error'
        }`}
        {...rest}
      >
        <option disabled value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <Text className="mt-2 text-xs italic font-normal pl-4 text-error">
          *{errorMessage}
        </Text>
      )}
    </div>
  );
};

export default Select;

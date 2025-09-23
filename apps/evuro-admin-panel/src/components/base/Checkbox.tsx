import Text from '../base/Text';
import { InputHTMLAttributes } from 'react';

interface checkboxPropsTypes extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  errorMessage?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
const Checkbox = ({
  name,
  errorMessage,
  onChange,
  className,
  value,
  ...rest
}: checkboxPropsTypes) => {
  return (
    <div className="flex flex-col">
      <input
        name={name}
        type="checkbox"
        className={`checkbox checkbox-lg bg-red-100 border-red-300 ${className} ${
          errorMessage && 'errorCheckbox'
        }`}
        checked={value === 'true' ? true : false}
        value={value}
        onChange={onChange}
      />
      {errorMessage && (
        <Text className="mt-2 text-xs italic font-normal pl-4 text-error">
          *{errorMessage}
        </Text>
      )}
    </div>
  );
};

export default Checkbox;

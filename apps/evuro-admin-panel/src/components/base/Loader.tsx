import { FC } from 'react';

interface LoaderProps {
  className?: string;
}

const Loader: FC<LoaderProps> = ({ className, ...rest }) => {
  return <span className={`${className} loading loading-spinner`}></span>;
};

export default Loader;

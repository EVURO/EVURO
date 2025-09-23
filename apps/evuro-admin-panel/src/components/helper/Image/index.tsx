import { useGetImageUrlQuery } from '@evuro-frontend/store';
import { Loader } from '../../../components';
import React from 'react';

interface imageProp {
  url: string | File;
  className?: string;
}

const Image = ({ url, className }: imageProp) => {
  // console.log('======url======', url);
  let blobCheck;

  if (typeof url === 'string') {
    blobCheck = (url as string)?.includes('blob');
  }

  const { data: imageData, isLoading: imageLoading } = useGetImageUrlQuery(
    url,
    {
      skip: blobCheck || !url,
    }
  );
  // console.log('=======imageData===', imageData);
  // console.log('=======url===', url);
  return (
    <div className="avatar">
      <div className={`w-12 h-12 ${className}`}>
        {imageLoading ? (
          <Loader />
        ) : (
          <img
            src={blobCheck ? url : imageData?.data}
            alt="Given Url is not correct"
          />
        )}
      </div>
    </div>
  );
};

export default Image;

import { useGetImageUrlQuery } from '@evuro-frontend/store';
import { Loader } from '../../.././../../components';
import React from 'react';

interface imageProp {
  url: string;
  className?: string;
}

const PadImage = ({ url, className }: imageProp) => {
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
  return (
    <div className="avatar">
      <div className={`mask mask-squircle ${className}`}>
        {imageLoading ? (
          <Loader />
        ) : (
          <img
            src={blobCheck ? url : imageData?.data}
            className="h-full object-cover inline"
            alt="Given Url is not correct"
          />
        )}
      </div>
    </div>
  );
};

export default PadImage;

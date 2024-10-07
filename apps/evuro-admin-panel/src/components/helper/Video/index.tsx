import { useGetImageUrlQuery } from '@evuro-frontend/store';
import { Loader } from '../../../components';

interface videoProp {
  urlSource: string;
  className?: string;
  videoTagClassName?: string;
  showVideo?: () => void;
}

const Video = ({
  urlSource,
  className,
  videoTagClassName,
  showVideo,
}: videoProp) => {
  //   console.log('=========urlSource======', urlSource);
  const { data: videoData, isLoading: videoLoading } = useGetImageUrlQuery(
    urlSource,
    {
      skip: !urlSource,
    }
  );
  //   console.log('======video api url strng =====', videoData);
  return (
    <div className={className} onClick={showVideo}>
      {videoLoading ? (
        <Loader />
      ) : (
        <video
          className={`${videoTagClassName} w-[100%] h-[100%] object-cover`}
          controls
        >
          <source src={videoData?.data} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default Video;

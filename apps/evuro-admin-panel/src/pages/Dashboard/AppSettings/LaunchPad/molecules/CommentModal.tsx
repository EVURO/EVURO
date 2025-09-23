import React, { useEffect, useRef } from 'react';
import { Text, Image } from '../../../../../components';
import moment from 'moment';

type modalProps = {
  commentsModal: string;
  setCommentsModal: (value: string) => void;
  comments: Record<string, any>[];
};

const CommentModal = ({
  commentsModal,
  setCommentsModal,
  comments,
}: modalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setCommentsModal('modal-close');
      }
    };

    if (commentsModal === 'modal-open') {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [commentsModal, setCommentsModal]);

  return (
    <dialog id="my_modal_3" className={`modal ${commentsModal}`}>
      <div
        ref={modalRef}
        className="modal-box px-0 py-0 pb-2 overflow-y-hidden h-[90vh] "
      >
        <form
          method="dialog"
          className="flex flex-row justify-between items-center border-b-[1px] border-black w-full my-0 py-2 px-3"
        >
          <h1></h1>
          <h3 className="font-bold text-xl">Comments</h3>
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost "
            onClick={() => setCommentsModal('modal-close')}
          >
            ✕
          </button>
        </form>

        {/* Image Text Flex */}
        <div className="flex flex-col gap-3 py-4 px-4 overflow-y-auto space-y-5 h-[80vh]">
          {/* Flex Items */}
          {comments?.map((comment) => (
            <div
              className="flex items-start justify-between "
              key={comment._id}
            >
              <div className="flex flex-row items-start gap-3">
                <Image className='rounded-full' url={comment.user.profileImage} />
                <div className="flex flex-col">
                  <Text className="font-medium text-base">
                    {comment.user.name}
                  </Text>
                  <Text className=" text-base">{comment.comment}</Text>
                </div>
              </div>

              <Text className="font-medium text-base ">
                {moment(comment?.createdAt).fromNow()}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </dialog>
  );
};

export default CommentModal;

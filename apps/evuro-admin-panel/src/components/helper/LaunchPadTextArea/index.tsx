import React from 'react';
import { MdDelete } from 'react-icons/md';
const LaunchPadTextArea = () => {
  
  return (
    <div className="relative">
      <textarea
        className="textarea relative border bg-dashboardLayoutBackground focus:outline-0 w-full h-full  placeholder:text-launchPadPlaceHolder placeholder:font-medium text-xl font-normal text-black"
        placeholder="Write Description"
      ></textarea>
      <div className="absolute right-3 md:right-12 top-4  lg:right-8 join join-vertical lg:join-horizontal bg-euvroWhite">
        <button className="btn btn-xs md:btn-sm join-item bg-euvroWhite">
          <MdDelete size={22} />
        </button>
      </div>
    </div>
  );
};

export default LaunchPadTextArea;

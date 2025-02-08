import React from "react";

import SkeltonPostList from "@/components/SkeltonPostList";

const SkeletonCarousel = () => {
  return (
    <div>
      <div className="animate-pulse lg:w-[50%] md:[70%] p-2 h-[347px] bg-white border-gray-400 rounded-lg shadow-lg">
        <div className="animate-pulse bg-slate-300 w-[100%] h-[300px] rounded-lg"></div>
      </div>

      <SkeltonPostList />
    </div>
  );
};

export default SkeletonCarousel;

import React from "react";

const SkeletonPostDetails = () => {
  return (
    <div className="animate-pulse flex flex-col gap-5 my-5 ArticleContainer mx-10 lg:mx-[19%]">
      <div className="animate-pulse bg-slate-300 w-20 h-4"></div>
      <div className="animate-pulse bg-slate-300 w-[70%] h-7"></div>
      <div className="animate-pulse bg-slate-300 w-[100%] h-[300px]"></div>

      <div className="animate-pulse bg-slate-300 w-[90%] h-4"></div>
      <div className="animate-pulse bg-slate-300 w-[90%] h-4"></div>
      <div className="animate-pulse bg-slate-300 w-[90%] h-4"></div>
      <div className="animate-pulse bg-slate-300 w-[80%] h-4"></div>
      <div className="animate-pulse bg-slate-300 w-[90%] h-4"></div>
      <div className="animate-pulse bg-slate-300 w-[80%] h-4"></div>

    </div>
  );
};

export default SkeletonPostDetails;

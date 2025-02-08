import React from "react";

const SkeltonPostList = () => {
  return (
    <div>
      <div className="flex flex-wrap flex-col lg:flex-row lg:justify-between my-4">
        <div className="shadow-md w-[100%] lg:w-[calc(50%-3px)] h-[124px] mb-2 overflow-hidden">
          <div className="flex items-center gap-3 bg-slate-100">
            <div className="bg-white p-1 border-gray-300 border-2">
              <img className="animate-pulse bg-slate-300 max-w-40 min-w-40 min-h-28 max-h-28 shrink-0"></img>
            </div>
          </div>
        </div>

        <div className="shadow-md w-[100%] lg:w-[calc(50%-3px)] h-[124px] mb-2 overflow-hidden">
          <div className="flex items-center gap-3 bg-slate-100">
            <div className="bg-white p-1 border-gray-300 border-2">
              <img className="animate-pulse bg-slate-300 max-w-40 min-w-40 min-h-28 max-h-28 shrink-0"></img>
            </div>
          </div>
        </div>

        <div className="shadow-md w-[100%] lg:w-[calc(50%-3px)] h-[124px] mb-2 overflow-hidden">
          <div className="flex items-center gap-3 bg-slate-100">
            <div className="bg-white p-1 border-gray-300 border-2">
              <img className="animate-pulse bg-slate-300 max-w-40 min-w-40 min-h-28 max-h-28 shrink-0"></img>
            </div>
          </div>
        </div>

        <div className="shadow-md w-[100%] lg:w-[calc(50%-3px)] h-[124px] mb-2 overflow-hidden">
          <div className="flex items-center gap-3 bg-slate-100">
            <div className="bg-white p-1 border-gray-300 border-2">
              <img className="animate-pulse bg-slate-300 max-w-40 min-w-40 min-h-28 max-h-28 shrink-0"></img>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SkeltonPostList;

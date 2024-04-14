import React from "react";

const SkeletonCarousel = () => {
  return (
    <div>
      <div className="animate-pulse p-2 h-[347px] bg-white border-gray-400 rounded-lg shadow-lg">
        <div className="animate-pulse bg-slate-300 w-[100%] h-[300px] rounded-lg"></div>
      </div>

      <div className="flex-col space-y-2 my-4">
        
        <div className="shadow-md p">          
          <div className="flex items-center gap-3 bg-slate-100">
            <div className="bg-white p-1 border-gray-300 border-2">
              <img className="animate-pulse bg-slate-300 max-w-40 min-w-40 min-h-28 max-h-28 shrink-0"></img>
            </div>
          </div>
        </div>

        <div className="shadow-md p">          
          <div className="flex items-center gap-3 bg-slate-100">
            <div className="bg-white p-1 border-gray-300 border-2">
              <img className="animate-pulse bg-slate-300 max-w-40 min-w-40 min-h-28 max-h-28 shrink-0"></img>
            </div>
          </div>
        </div>

        <div className="shadow-md p">          
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

export default SkeletonCarousel;

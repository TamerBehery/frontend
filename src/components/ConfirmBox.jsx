import React from "react";

const ConfirmBox = ({ message, onDialog }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50">
      <div
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
                     flex flex-col justify-center items-start 
                     bg-white w-72 p-4 rounded-md drop-shadow-lg"
      >
        <h3 className="my-4">{message}</h3>
        <div className="flex justify-end items-end bg-white w-full ">
          <button
            className="bg-red-600 text-white p-1 w-12 ml-1 border-none rounded-md cursor-pointer"
            onClick={()=>onDialog(true)}
          >
            نعم
          </button>
          <button
            className="bg-green-600 text-white p-1 w-12 mr-1 border-none rounded-md cursor-pointer"
            onClick={()=>onDialog(false)}
          >
            لا
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;

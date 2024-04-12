"use client";

import React, { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
//import { clearInterval } from "timers";

const Carousel = ({ slides, autoSlide = false, interval = 3000 }) => {
  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  useEffect(() => {
    if (!autoSlide) return;
    const intervalSlide = setInterval(nextSlide, interval);
    return () => clearInterval(intervalSlide);
  });

  return (
    <div className="p-2  border-2 bg-white border-gray-300 rounded-lg shadow-lg">
      <div className="relative min-w-[100%] max-w-[100%] min-h-[100%] max-h-[100%] overflow-hidden rounded-lg shadow-md">
        <div
          className={`flex transition ease-out duration-500 min-h-[100%] max-h-[100%]`}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((s, i) => {
            return (
              <img
                key={i}
                src={s.image}
                className="min-w-[100%] max-w-[100%] min-h-[100%] max-h-[100%] h-[300px]"
              ></img>
            );
          })}
        </div>

        <div className="absolute top-0 w-full h-full px-10 flex justify-between items-center text-white">
          <button onClick={previousSlide}>
            <BsArrowLeftCircleFill size={25} />
          </button>
          <button onClick={nextSlide}>
            <BsArrowRightCircleFill size={25} />
          </button>
        </div>

        <div className="absolute bottom-0 w-full h-14 gap-2 flex justify-center items-center">
          {slides.map((s, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  setCurrent(i);
                }}
                className={`w-2 h-2 cursor-pointer ${
                  current == i ? "bg-white p-[6px]" : "bg-gray-500"
                } hover:bg-gray-300 rounded-full`}
              ></div>
            );
          })}
        </div>
      </div>

      <div className="mt-2 text-center font-sans font-semibold" >
        {slides[current].title}
      </div>

    </div>
  );
};

export default Carousel;

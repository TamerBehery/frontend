"use client";

import Link from "next/link";
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
    <div
      dir="ltr"
      className="p-2  border-2 bg-white border-gray-300 rounded-lg shadow-lg"
    >
      <div className="relative min-w-[100%] max-w-[100%] min-h-[100%] max-h-[100%] overflow-hidden rounded-lg shadow-md">
        <div
          className={`flex transition ease-out duration-500 min-h-[100%] max-h-[100%]`}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((s) => {
            //console.log(s)
            return (
              <Link
                key={s?.id}
                href={`/post/${slides[current]?.id}`}
                className="min-w-[100%] max-w-[100%] min-h-[100%] max-h-[100%] h-[300px]"
              >
                <img
                  key={s?.id}
                  //src={s?.attributes?.Image?.data[0]?.attributes?.url}
                  src={s?.Image}
                  className="min-w-[100%] max-w-[100%] min-h-[100%] max-h-[100%] h-[300px]"
                ></img>
              </Link>
            );
          })}
        </div>

        <button
          onClick={previousSlide}
          className="absolute top-[50%] px-10 text-white"
        >
          <BsArrowLeftCircleFill size={25} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-[50%] px-10 text-white"
        >
          <BsArrowRightCircleFill size={25} />
        </button>

        <div className="absolute bottom-0 w-full h-14 gap-2 flex justify-center items-center">
          {slides.map((s, i) => {
            return (
              <div
                key={s?.id}
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

      <div className="mt-2 text-center font-sans font-semibold line-clamp-1">
        {slides[current]?.Tittle}
      </div>
    </div>
  );
};

export default Carousel;

"use client";
import React from "react";

import Slider3 from "../../../../public/images/slider/1.jpg";

import Image from "next/image";

const CarouselIndex = () => {
  return (
    <div className="absolute w-full bg-[#B8272D] opacity-85 h-full">
      {" "}
      <Image
        src={Slider3.src}
        alt=""
        height={0}
        width={0}
        sizes="100vw"
        className="object-cover bg-[#B8272D] mix-blend-overlay h-screen w-full"
      />
    </div>
  );
};

export default CarouselIndex;

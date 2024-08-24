"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Slider1 from "../../../../public/images/slider/1.jpg";
import Slider2 from "../../../../public/images/slider/1.jpg";
import Slider3 from "../../../../public/images/slider/1.jpg";

import Image from "next/image";

const CarouselIndex = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="absolute w-full bg-[#B8272D] h-full"
    >
      <CarouselContent>
        <CarouselItem className="bg-[#B8272D] mix-blend-overlay">
          <Image
            src={Slider1.src}
            alt=""
            height={0}
            width={0}
            sizes="100vw"
            className="object-cover bg-[#B8272D] mix-blend-overlay max-lg:h-screen h-screen w-full"
          />
        </CarouselItem>
        <CarouselItem className="bg-[#B8272D] mix-blend-overlay">
          <Image
            src={Slider2.src}
            alt=""
            height={0}
            width={0}
            sizes="100vw"
            className="object-cover bg-[#B8272D] mix-blend-overlay h-screen w-full"
          />
        </CarouselItem>
        <CarouselItem className="bg-[#B8272D] mix-blend-overlay">
          {" "}
          <Image
            src={Slider3.src}
            alt=""
            height={0}
            width={0}
            sizes="100vw"
            className="object-cover bg-[#B8272D] mix-blend-overlay h-screen w-full"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  );
};

export default CarouselIndex;

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
import Slider1 from "../../../../public/images/slider/1.png";
import Slider2 from "../../../../public/images/slider/2.png";
import Slider3 from "../../../../public/images/slider/3.png";

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
        <CarouselItem>
          <Image
            src={Slider1.src}
            alt=""
            height={0}
            width={0}
            sizes="100vw"
            className="object-cover max-lg:h-screen h-screen w-full"
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src={Slider2.src}
            alt=""
            height={0}
            width={0}
            sizes="100vw"
            className="object-cover h-screen w-full"
          />
        </CarouselItem>
        <CarouselItem>
          {" "}
          <Image
            src={Slider3.src}
            alt=""
            height={0}
            width={0}
            sizes="100vw"
            className="object-cover h-screen w-full"
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

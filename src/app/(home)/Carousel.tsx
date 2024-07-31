"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
            src={"/images/slider/1.png"}
            alt=""
            height={0}
            width={0}
            sizes="100vw"
            className="object-cover max-lg:h-svh h-screen w-full"
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src={"/images/slider/2.png"}
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
            src={"/images/slider/3.png"}
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
    </Carousel>
  );
};

export default CarouselIndex;

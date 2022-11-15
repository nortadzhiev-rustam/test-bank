// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from "swiper";
import React from "react";
import { useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import CardComponent from "./CardComponent";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Slider = ({ items }) => {
  const matches = useMediaQuery("(min-width: 1400px)");
  return (
    <Swiper
      // install Swiper modules

      modules={[Pagination, Navigation, Autoplay]}
      spaceBetween={0}
      slidesPerView={matches ? 5 : 3}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
    >
      {items.map((item, idx) => (
        <SwiperSlide key={idx}>
          <CardComponent item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;

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
  const matches = useMediaQuery("(min-width: 1200px)");
  return (
    <Swiper
      // install Swiper modules
      modules={[Pagination, Navigation, Autoplay]}
      spaceBetween={3}
      slidesPerView={matches ? 5 : 3}
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      
    >
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <SwiperSlide key={idx} style={{ justifyContent: "center" }}>
            <CardComponent item={item} width={220} height={280} top={200} />
          </SwiperSlide>
        </React.Fragment>
      ))}
    </Swiper>
  );
};

export default Slider;

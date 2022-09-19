// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from "swiper";
import { useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import CardComponent from "./CardComponent";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default ({ items }) => {
  const matches = useMediaQuery("(min-width: 600px)");
  return (
    <Swiper
      // install Swiper modules
      modules={[Pagination, Navigation, Autoplay]}
      spaceBetween={0}
      slidesPerView={matches ? 5 : 1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {items.map((item, idx) => (
        <>
          <SwiperSlide style={{ justifyContent: "center" }} key={idx}>
            <CardComponent item={item} width={220} height={280} top={200} />
          </SwiperSlide>
        </>
      ))}
    </Swiper>
  );
};

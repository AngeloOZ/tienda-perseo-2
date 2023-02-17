import { Swiper, SwiperSlide, } from "swiper/react";

import { Autoplay, Pagination, Navigation } from "swiper";

export default function ImagenPricipal() {
  return (
    <>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src="/img/Carrusel/1.jpg" style={{ objectFit: "cover", objectPosition: "center" }}/></SwiperSlide>
        <SwiperSlide><img src="/img/Carrusel/2.jpg" style={{ objectFit: "cover", objectPosition: "center" }}/></SwiperSlide>
        <SwiperSlide><img src="/img/Carrusel/3.jpg" style={{ objectFit: "cover", objectPosition: "center" }}/></SwiperSlide>
        <SwiperSlide><img src="/img/Carrusel/4.jpg" style={{ objectFit: "cover", objectPosition: "center" }}/></SwiperSlide>
        <SwiperSlide><img src="/img/Carrusel/5.jpg" style={{ objectFit: "cover", objectPosition: "center" }}/></SwiperSlide>
      </Swiper>
    </>
  );
}

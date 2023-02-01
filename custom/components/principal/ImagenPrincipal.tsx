/* import * as React from 'react';
import Box from '@mui/material/Box';
import Image from 'src/components/image/Image';



export default function ImagenPricipal() {
    return(
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
            <Image
            //src='https://http2.mlstatic.com/storage/homes-korriban/assets/images/exhibitors/fallbacks/es-desktop.jpg'
            src='https://img.freepik.com/vector-premium/paisaje-urbano-verano-larga-noche-horizontal-panorama-ciudad-ilustracion-plana_318844-225.jpg?w=2000'
            sx={{
                height:340,
                width: '100%'
            }}
            />
        </Box>
    )
} */

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles


//import "./styles.css"; 

// import required modules
import { Navigation } from "swiper";

export default function ImagenPricipal() {
  return (
    <>
      <Swiper navigation={true} autoplay={{delay: 2500, disableOnInteraction:false}} modules={[Navigation]} className="mySwiper">
        <SwiperSlide><img src="https://png.pngtree.com/thumb_back/fh260/background/20200621/pngtree-abstract-modern-neon-frame-background-image_339537.jpg"/> </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}

import React from 'react'
import styles from './HomeSlider.module.css';
import Slider from "react-slick";
import sliderImage1 from './../../assets/images/slider-image-1.jpeg'
import sliderImage2 from './../../assets/images/slider-image-2.jpeg'
import sliderImage3 from './../../assets/images/slider-image-3.jpeg'

export default function HomeSlider() {
  var settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
      <div> 
        <img className={`${styles.imgeslider}`} src={sliderImage1} alt="" />
      </div>
      <div>
        <img className={`${styles.imgeslider}`} src={sliderImage2} alt="" />
      </div>
      <div>
        <img className={`${styles.imgeslider}`} src={sliderImage3} alt="" />
      </div>
    </Slider>
  );
}

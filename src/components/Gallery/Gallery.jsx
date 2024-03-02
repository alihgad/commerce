import React from "react";
import styles from "./Gallery.module.css";
import HomeSlider from "../HomeSlider/HomeSlider";
import img1 from "./../../assets/images/slider-image-1.jpeg";
import img2 from "./../../assets/images/slider-image-2.jpeg";

export default function Gallery() {
  return (
    <div className="container">
      <div className="row mt-2 flex-row-reverse">
      <div className="col-lg-3 p-0">
        <img className={`w-100 ${styles.imge}`} src={img1} alt="" />
        <img className={`w-100 ${styles.imge}`} src={img2} alt="" />
      </div>
      <div className="col-lg-9 p-0 mb-5 ">
        <HomeSlider />
      </div>
    </div>
    </div>
  );
}

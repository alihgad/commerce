import React, { useState } from "react";
import styles from "./CatPreview.module.css";
import axios from "axios";
import { useEffect } from "react";
import Slider from "react-slick";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";

export default function CatPreview() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    rows : 1 ,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        }
      },{
        breakpoint: 786,
        settings: {
          slidesToShow: 3,
        }
      },
    ]
  };

  async function getData(){
    let data = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    return data?.data?.data
  }
  
  const {data,isLoading} = useQuery("cat",getData)
  

  return (<>

    <h3 className="text-capitalize mb-2 text-center">show popular categorys</h3>
    {isLoading ? <Loader/> :<div key='row' className=" row mb-5  ">
      <Slider {...settings}>
        {data?.map((cat) => {
          return (
            <>
                <div key={cat.name} id={cat._id} >
                  <img  src={cat.image} alt={cat.name} className={`w-100 ${styles.sliderImage}` }/>
                  <p  className="text-center mt-1">{cat.name}</p>
                </div>
            </>
          );
        })}
        </Slider>
      </div>}
      </>
  );
}

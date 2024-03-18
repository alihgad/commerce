import React, { useEffect, useState } from 'react'
import styles from './ProductDetails.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import PriceAndRate from '../PriceAndRate/PriceAndRate';
import Loader from '../Loader/Loader';
import  Slider  from 'react-slick';

export default function ProductDetails() {
  let [isLoading,setIsLoading] = useState(true)
  let [data,setData] = useState(true)

  let {id} = useParams()

  async function GetProduct(id){
    let result =  await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setIsLoading(false)
    setData(result?.data?.data)
  }

  useEffect(()=>{
    GetProduct(id)
  })
  

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        }
      },{
        breakpoint: 786,
        settings: {
          slidesToShow: 2,
        }
      },
    ]
  };


  return (<>


    <div className="container align-items-center my-4 py-5  ">

      <div className="item  h-100  d-flex align-items-center ">
        <div className="row w-100 my-4 py-4  align-items-center">
        <div className="container align-items-center d-flex  ">
        
      </div>

          {isLoading? <Loader/> :<>
          <div className="col-md-3 mb-4 border-end ">
          <Slider {...settings}>
            {data?.images?.map((img) => {
              return (
                <>
                <img className={`w-100 ${styles.sliderImage}`} src={img} alt="" />
                </>
              );
            })}
          </Slider>
          </div>
          <div className="col-md-9">
            <p>{data.title} </p>
            <p>{data.description}</p>
            <p>{data.category.name}</p>
            <PriceAndRate ele={data}/>
          </div>
          </>}

        </div>
      </div>
    </div>
    

    </>
  )
}


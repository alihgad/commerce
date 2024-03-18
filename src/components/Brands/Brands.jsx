import React from "react";
import styles from "./Brands.module.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";
import { Navigate, useNavigate } from 'react-router-dom';


export default function Brands() {

const navigate = useNavigate()

  async function getBrands() {
    let data = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    console.log(data?.data?.data);
    return data?.data?.data;
    
  }

  let { data, isLoading } = useQuery("brands", getBrands);



  return (
    <>
      <Helmet>
        <title>brands</title>
      </Helmet>

      <div className="container mb-5 pb-5 pt-3">
        <div className="row gy-3">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {data?.map((brand) => (
                <>
                  <div className="col-lg-4 col-md-6 col-xl-3">
                    <div
                      key={brand.name}
                      className="card rounded-4 overflow-hidden cursor-pointer hover"
                      onClick={()=>{
                        navigate('/brand/'+brand._id)
                      }}
                    >
                      <div className="card-imge">
                        <img src={brand.image} alt={brand.name} className="w-100" />

                      </div>
                      <div className="card-body text-center">
                        <div className="card-text">
                          <p>{brand.name}</p>
                        </div>
                      </div>
                    </div>

                    
                  </div>


                  
                </>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

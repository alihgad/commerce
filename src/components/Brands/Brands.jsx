import React from "react";
import styles from "./Brands.module.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Brands() {
  async function getBrands() {
    let data = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    return data?.data?.data;
  }

  let { data, isLoading } = useQuery("brands", getBrands);

  const showSwal = (brand) => {
    withReactContent(Swal).fire({
      title: <div>
        <img src={brand.image} alt={brand.name} />
        <h1>{brand.name}</h1>
      </div>,

    })
  }

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
                  <div className="col-lg-3">
                    <div
                      key={brand.name}
                      className="card rounded-4 overflow-hidden cursor-pointer hover"
                      onClick={()=>{
                        showSwal(brand)
                      }}
                    >
                      <div className="card-imge">
                        <img src={brand.image} alt="" />
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

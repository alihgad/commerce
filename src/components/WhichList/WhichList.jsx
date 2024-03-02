import React, { useContext, useEffect, useState } from "react";
import styles from "./WhichList.module.css";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useActionData } from "react-router-dom";
import Loader from "../Loader/Loader";
import { CartContexst } from "../../Context/CartContext";

export default function WhichList() {

  let [data,setData] = useState()
  let [isLoading,setIsLoading] = useState(true)
  let { addToCart:addCart} = useContext(CartContexst)
  

  const displayWhichList = async () => {
    const url = "https://ecommerce.routemisr.com/api/v1/wishlist";
    const headers = {
      token: `${localStorage.getItem("token")} `,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(url, { headers });
      console.log(response?.data?.data);
      setData(response?.data?.data)
      setIsLoading(false)
      return response?.data?.data;
    } catch (error) {
      return error;
    }
  };

  const addToCart = async (id) => {
    setIsLoading(true)
    let res = await addCart(id)
    removeItem(id)
   console.log(res)
  }

  const removeItem = async (id) => {
    setIsLoading(true)
    const url = `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`;
    const headers = {
      token: `${localStorage.getItem("token")} `,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.delete(url, { headers });

      console.log(response?.data?.data);
      displayWhichList()
      return response?.data?.data;

    } catch (error) {
      return error;
    }

  }




  useEffect(()=>{
    displayWhichList()
  },[])
  
  return (
    <>
    <Helmet>

      <title>WhichList</title>
    </Helmet>
      <div className="container mb-5 pb-5 pt-3">
        <div className=" bg-body-secondary pt-3 text-capitalize w-75 mx-auto px-4 ">
          <h3>WhichList :</h3>

          {isLoading ? <Loader/> : (
            <>
            {data.map((prod)=>
              <div className="box ">
              <div
                key={prod.id}
                id={prod.id}
                className="row mb-2 border-bottom py-3 align-items-center "
              >
                <div className="col-lg-2">
                  <img
                    src={prod?.imageCover}
                    className="w-100"
                    alt={prod?.title}
                  />
                </div>
  
                <div className="col-lg-8 ">
                  <p className="m-0 mb-2"> {prod?.title}</p>
                  <p className="text-main m-0 mb-2">price : {prod?.price} EGP </p>
                  <p>
                    <span
                      className=" btn p-0"
                      onClick={() => {
                        removeItem(prod.id);
                      }}
                    >
                      <i className="fas fa-trash-can text-main me-1 "></i>
                      remove
                    </span>
                  </p>
                </div>
  
                <div className="col-lg-2">
                  <div className="btn btn-outline-success" onClick={()=> addToCart(prod.id)}>add to cart</div>
                </div>
              </div>
            </div>
            )}
            </>
          )}

          
        </div>
      </div>
    </>
  );
}

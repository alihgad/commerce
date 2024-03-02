import React, { useEffect } from 'react'
import styles from './Allorders.module.css';
import { TokenContext } from './../../Context/TokenContext';
import { useContext } from 'react';
import axios from 'axios';

export default function Allorders() {
    const {id,getId} = useContext(TokenContext)

    async function getOrders(){

      if(id){
      let url = `https://ecommerce.routemisr.com/api/v1/orders/user/${id}` 
      let {data} = await axios.get(url)
      console.log(data);
      return data
      }
      
    }

 

    useEffect(()=>{
      getOrders()
    },[id])

    getId() 



  return (
    <>
      <div className="container">
        <div className="bg-success-subtle p-3 mb-2 rounded">
          <h1>sucsses Order</h1>
        </div>
      </div>
    </>
  )
}

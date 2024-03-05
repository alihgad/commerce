import React from 'react'
import styles from './PriceAndRate.module.css';
import { useContext } from 'react';
import { CartContexst } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

export default function PriceAndRate({ele}) {

  let [loading , setLoading] = useState(false);

  let {addToCart,cartCounter} = useContext(CartContexst)

  async function addItem(id) {
    setLoading(true);
    let data = await addToCart(id)
    if (data){

      toast.success('Successfully created!');
      
    }

    setLoading(false);


  }



  return (
    <>
    <Toaster></Toaster>
    <div className="details d-flex justify-content-between align-items-center   ">
            {ele?.priceAfterDiscount? <div className="prices d-flex "> <p className='text-decoration-line-through me-2 text-danger mb-0'>{ele?.price} egp  </p> <p className='text-success fs-5 mb-0'> {ele.priceAfterDiscount} egp</p> </div> :<p className='fs-5 mb-0'>{ele.price} egp</p>}
            <p className='mb-0'><i className='fas fa-star me-1 rating-color'></i>{ele.ratingsAverage} </p>
          </div>
          <div onClick={async ()=>{   await addItem(ele.id); cartCounter()}}   className="btn btn-success w-100 mt-3"> {loading ? <i className='fas fa-spinner fa-pulse'> </i>  : 'add to cart'}</div>
    </>
  )
}

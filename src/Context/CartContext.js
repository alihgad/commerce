import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export const CartContexst = createContext()


export default function CartContexstProvider(props) {


  const [cartQ, setCartQ] = useState(<i className="fas fa-spinner fa-pulse"></i>)
  const [cartID, setCartID] = useState()
  const url = 'https://ecommerce.routemisr.com/api/v1/cart';
  const headers = {
    token: `${localStorage.getItem("token")} `,
    'Content-Type': 'application/json',
  };



  async function addToCart(id) {
    setCartQ(<i className="fas fa-spinner fa-pulse"></i>)

    const data = {
      'productId': id
    };

    try {
      const response = await axios.post(url, data, { headers });
      toast.success('Product added to cart', { position: 'top-right' });
      setCartQ(response?.data?.numOfCartItems)
    } catch (error) {
      toast.error('Failed to add product to cart');
    }
  };



  const displayCart = async () => {
    try {
      const response = await axios.get(url, { headers });
      return response

    } catch (error) {
      return error
    }

  };

  async function cartCounter() {
    try {
      const response = await axios.get(url, { headers });
      setCartQ(response?.data?.numOfCartItems)
      setCartID(response?.data?.data?._id)
      return response


    } catch (error) {
      
      setCartQ(0)
      return error
    }

  }

  useEffect(() => { cartCounter() }, [])


  const clearCart = async () => {
    setCartQ(<i className="fas fa-spinner fa-pulse"></i>)
    try {
      const response = await axios.delete(url, { headers });
      setCartQ(response?.data?.numOfCartItems)

      return response

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
        footer: '<p>Your Cart is Empety Start <a class="text-primary text-decoration-underline" href="/products">Shopping</a></p>'
      });
      return error
    }

  };


  const removeItem = async (productID) => {
    setCartQ(<i className="fas fa-spinner fa-pulse"></i>)
    const url = `https://ecommerce.routemisr.com/api/v1/cart/${productID}`;
    try {
      const response = await axios.delete(url, { headers });
      setCartQ(response?.data?.numOfCartItems)

      console.log(response);
      return response

    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
        footer: '<p>Your Cart is Empety Start <a class="text-primary text-decoration-underline" href="/products">Shopping</a></p>'
      });
      return error

    }

  };


  async function updateQuantity(id, quantity) {
    const url = `https://ecommerce.routemisr.com/api/v1/cart/${id}`;



    const data = {
      'count': quantity
    };

    try {
      const response = await axios.put(url, data, { headers });
      return response

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
        footer: '<p>Your Cart is Empety Start <a class="text-primary text-decoration-underline" href="/products">Shopping</a></p>'
      });
      return error

    }
  };


  async function onlinePay(cartId, shippingAddress) {
    const url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://alihgad.github.io/commerce#/#/#`;



    const data = {
      shippingAddress
    };

     await axios.post(url, data, { headers })
    .then(response =>
      {console.log(response)
      window.location.href = response?.data?.session?.url
    }
      )
    .catch(error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
        footer: '<p>Your Cart is Empety Start <a class="text-primary text-decoration-underline" href="/products">Shopping</a></p>'
      });
        console.log(error)})

    
  };


  async function offlinePay(cartId, shippingAddress) {
    const url = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}?url=https://https://alihgad.github.io/commerce#/#/a`;

    const data = {
      shippingAddress
    };

    try {
      const response = await axios.post(url, data, { headers });
      console.log(response);
      window.location.href = 'https://alihgad.github.io/commerce/#/'
      cartCounter()

      return response

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
        footer: '<p>Your Cart is Empety Start <a class="text-primary text-decoration-underline" href="/products">Shopping</a></p>'
      });
      return error

    }
  };






  return <CartContexst.Provider value={{ addToCart, displayCart, cartCounter, cartQ, clearCart, removeItem, updateQuantity, onlinePay, cartID, offlinePay }}>
    {props.children}
  </CartContexst.Provider>
}
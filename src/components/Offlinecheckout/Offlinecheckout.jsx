import React, { useState } from "react";
import styles from "./Offlinecheckout.module.css";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { CartContexst } from "../../Context/CartContext";
import * as yup from "yup";
import toast from "react-hot-toast";


export default function Checkout() {


  let [ pays , setPay] =useState("Pay Now")
  let { offlinePay, cartID } = useContext(CartContexst);

  async function payment(cartID, shippingAddress) {
    setPay(<i className="fas fa-spinner fa-pulse"></i>)
    try{

      let res = await offlinePay(cartID, shippingAddress)
      toast.success('payment done successfully')
      console.log(res.request);

    }catch(err){
      console.log(err);
    setPay("Pay Now")

    }
  }

  function pay(values) {
    console.log('values');
    payment(cartID, values);
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (values) => {pay(values) ; console.log(values);},

    validationSchema: yup.object().shape({
      details: yup.string().required("Details is required").min(3),
      phone: yup
        .string()
        .required("Phone is required")
        .matches(/^(?:01)[0125]\d{8}$/, "please enter a valide phone number"),
      city: yup.string().required("City is required").min(3),
    }),
  });


  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <div className="container">
        <h2 className="my-3">Shipping Adress : </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-groub mb-2">
            <label htmlFor="details" className="text-capitalize">
              details
            </label>
            <input
              type="text"
              className="form-control"
              id="details"
              name="details"
              {...formik.getFieldProps("details")}
            />
            {formik.touched.details && formik.errors.details ? (
              <div className="mt-2 p-0 ps-1 alert alert-danger ">
                {formik.errors.details}
              </div>
            ) : null}
          </div>

          <div className="form-groub mb-2">
            <label htmlFor="phone" className="text-capitalize">
              phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              {...formik.getFieldProps("phone")}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="mt-2 p-0 ps-1 alert alert-danger ">
                {formik.errors.phone}
              </div>
            ) : null}
          </div>

          <div className="form-groub mb-2">
            <label htmlFor="city" className="text-capitalize">
              city
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              {...formik.getFieldProps("city")}
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="mt-2 p-0 ps-1 alert alert-danger ">
                {formik.errors.city}
              </div>
            ) : null}
          </div>

          

            <button
              type="submit"
              className="btn bg-main w-100 text-white my-3"
            >
              {pays}
            </button>

        </form>

      </div>
    </>
  );
}


import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { CartContexst } from "../../Context/CartContext";
import * as yup from "yup";
import axios from "axios";

export default function Checkout() {
  let { onlinePay, cartID } = useContext(CartContexst);
  console.log(cartID);



  async function payment(cartID, shippingAddress) {
    let res = await onlinePay(cartID, shippingAddress);
    console.log(res);
  }

  function pay(values) {
    console.log(values);
    payment(cartID, values);
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: pay,

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

          <div className="col">
            <input
              type="submit"
              className="btn bg-main w-100 text-white my-3"
              value={"Online payment"}
            />
          </div>
        </form>
      </div>
    </>
  );
}

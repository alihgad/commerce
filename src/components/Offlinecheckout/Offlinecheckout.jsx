import React from "react";
import styles from "./Offlinecheckout.module.css";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { CartContexst } from "../../Context/CartContext";

export default function Checkout() {

  let { offlinePay, cartID } = useContext(CartContexst);
  console.log(cartID);

  async function payment(cartID, shippingAddress) {
    let res = await offlinePay(cartID, shippingAddress);
    console.log(res);
    window.location.href = res?.data?.session?.url;
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
  });
  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <div className="container">
        <h2 className="my-3">Shippong Adress : </h2>
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
          </div>

          

            <input
              type="submit"
              className="btn bg-main w-100 text-white my-3"
              value={"Pay Now"}
              
            />

        </form>
      </div>
    </>
  );
}


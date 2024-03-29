import React from "react";
import styles from "./ForgetPassword.module.css";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ForgetPassword() {
  const navigate = useNavigate(); 
  let [loading,setLoading] = useState(false)


  let formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: yup.object().shape({
      email: yup.string()
     .email("Invalid email")
     .required("Email is required")
    }),
    onSubmit: (values) => {
      setLoading(true)
      axios
     .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
     .then((res) => {
          console.log(res);
          navigate('/verfiy-code')
          

        })
     .catch((err) => {
          console.log(err);
        });
    }
  })




  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Forget Password</h4>
                <p className="card-text">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
                <form onSubmit={formik.handleSubmit} >
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control my-3"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (<div className='mt-2 p-0 ps-1 alert alert-danger '>{formik.errors.email}</div>) : null}

                    <small id="emailHelp" className="form-text text-muted ">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <button  className="btn btn-primary my-2" >
                    { loading ? <i className="fas fa-spinner fa-pulse"></i> : 'Submit'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

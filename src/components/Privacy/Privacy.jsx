import React, { useContext } from "react";
import styles from "./Privacy.module.css";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { TokenContext } from "../../Context/TokenContext";
import * as yup from "yup";
import Loader from "../Loader/Loader";

export default function Privacy() {
  const { id, token, setToken } = useContext(TokenContext);
  let [loading, setLoading] = useState(true);
  let [userEmail, setUserEmail] = useState("");
  const [Cpassword,SetCPassword] = useState('password')   
  const [Npassword,SetNPassword] = useState('password')   
  const [Rpassword,SetRPassword] = useState('password')   


  async function getData() {
    if (id) {
      let url = `https://ecommerce.routemisr.com/api/v1/users/${id}`;
      let { data } = await axios.get(url);
      setUserEmail(data?.data?.email);
      setLoading(false);
    }
  }

  getData();

  function changeTypeC(){
    if(Cpassword === 'password'){
      SetCPassword('text')
    }
    else{
      SetCPassword('password')
    }
  }

  function changeTypeN(){
    if(Npassword === 'password'){
      SetNPassword('text')
    }
    else{
      SetNPassword('password')
    }
  }

  function changeTypeR(){
    if(Rpassword === 'password'){
      SetRPassword('text')
    }
    else{
      SetRPassword('password')
    }
  }


  async function updatePassword({ currentPassword, password, rePassword }) {
    let url = `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`;
    let data = {
      currentPassword,
      password,
      rePassword,
    };

    let headers = {
      token,
    };

    try {
      let res = await axios.put(url, data, { headers });
      console.log(res.data);
      setToken(null);
      localStorage.removeItem("token");
      window.location.pathname = "/";
    } catch (error) {
      console.log(error);
    }
  }

  const dataform = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: userEmail,
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema: yup.object({
      currentPassword: yup.string().required("current password is required"),
      password: yup
        .string()
        .matches(
          /^[A-Z][a-zA-z0-9]{3,18}$/,
          "password must start with capital letter and bettwen 6-9 chracter length"
        )
        .required("password is requaired"),
      rePassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "passwords must match")
        .required("rePassword is requaired"),
    }),
    onSubmit: (values) => {
      updatePassword(values);
      console.log(values);
    },
  });

  return (
    <>
      <Helmet>
        <title>Privacy</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <div className="row ">
              <div className="col-xxl-3 col-md-4 col-5 pe-0">
                <ul className="list-unstyled">
                  <li className="list-item my-4 fs-5">Current Password</li>
                  <li className="list-item my-4 fs-5">New Password</li>
                  <li className="list-item my-4 fs-5">Re Password</li>
                </ul>
              </div>
              <div className="col-1 ps-2 pe-0">
                <ul className="list-unstyled">
                  <li className="list-item mt-3 pt-1 mb-4 fs-5">:</li>
                  <li className="list-item my-4 fs-5">:</li>
                  <li className="list-item my-4 fs-5">:</li>
                </ul>
              </div>
              <div className=" col-xxl-8 col-md-7 col-6 ps-0">
                <form onSubmit={dataform.handleSubmit}>
                  <div className="my-3 ">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder=""
                      {...dataform.getFieldProps("email")}
                      autoComplete="current-email"
                      hidden
                    />
                    </div>

                  <div className="my-3 position-relative">
                    <input
                      type={Cpassword}
                      name="currentPassword"
                      id="currentPassword"
                      className="form-control"
                      placeholder=""
                      {...dataform.getFieldProps("currentPassword")}
                      autoComplete="current-password"
                      aria-describedby="help-current"
                    />
                    <div
                      className="position-absolute top-custom end-0 me-3 cursor-pointer"
                      onClick={() => {
                        changeTypeC();
                      }}
                    >
                      <i className="fas fa-eye "></i>
                    </div>
                  </div>
                  {dataform.touched.currentPassword &&
                  dataform.errors.currentPassword ? (
                    <div className="mt-2 p-0 ps-1 alert alert-danger ">
                      {dataform.errors.currentPassword}
                    </div>
                  ) : null}

                  <div className="my-3 position-relative">
                    <input
                      type={Npassword}
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder=""
                      {...dataform.getFieldProps("password")}
                      autoComplete="new-password"
                    />
                    <div
                      className="position-absolute top-custom end-0 me-3 cursor-pointer"
                      onClick={() => {
                        changeTypeN();
                      }}
                    >
                      <i className="fas fa-eye "></i>
                    </div>
                  </div>
                  {dataform.touched.password && dataform.errors.password ? (
                    <div className="mt-2 p-0 ps-1 alert alert-danger ">
                      {dataform.errors.password}
                    </div>
                  ) : null}

                  <div className="my-3 position-relative">
                    <input
                      type={Rpassword}
                      name="rePassword"
                      id="rePassword"
                      className="form-control"
                      placeholder=""
                      {...dataform.getFieldProps("rePassword")}
                      autoComplete="new-password"
                    />
                    <div
                      className="position-absolute top-custom end-0 me-3 cursor-pointer"
                      onClick={() => {
                        changeTypeR();
                      }}
                    >
                      <i className="fas fa-eye "></i>
                    </div>
                  </div>
                  {dataform.touched.rePassword && dataform.errors.rePassword ? (
                    <div className="mt-2 p-0 ps-1 alert alert-danger ">
                      {dataform.errors.rePassword}
                    </div>
                  ) : null}

                  <div className=" col-3 d-flex">
                    <button
                      type="submit"
                      className="btn bg-main text-white m-2 "
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

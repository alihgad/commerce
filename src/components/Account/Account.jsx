import React, { useContext, useEffect, useState } from "react";
import styles from "./Account.module.css";
import { Helmet } from "react-helmet";
import { TokenContext } from "../../Context/TokenContext";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Loader from "../Loader/Loader";

export default function Account() {
  const { id ,token } = useContext(TokenContext);
  let [userName, setUserName] = useState("");
  let [userEmail, setUserEmail] = useState("");
  let [userPhone, setUserPhone] = useState("");
  let [update, setUpdate] = useState("Update");
  let [loading, setLoading] = useState(true);
  let [disabeld, setDisabeld] = useState(true);

  async function getData() {
    if (id) {
      let url = `https://ecommerce.routemisr.com/api/v1/users/${id}`;
      let { data } = await axios.get(url);
      setUserName(data?.data.name);
      setUserEmail(data?.data.email);
      setUserPhone(data?.data.phone);
      setLoading(false);
    }
  }

    getData();


    console.log(id);



    async function updateMe({name,email,phone}){
      setUpdate(<i className="fas fa-spinner fa-spin"></i>)
      console.log(name, email, phone);
      let url = `https://ecommerce.routemisr.com/api/v1/users/updateMe`;
      let data = {
        name,
        email,
        phone,
      };

      const headers = {
        token: `${localStorage.getItem("token")} `,
      'Content-Type': 'application/json',    
      };

      try {
        let res = await axios.put(url, data , {headers});
        console.log(res);
        setUpdate('Update')
        setDisabeld(true)
        
      } catch (error) {
        setUpdate('Update')
        setDisabeld(true)
        console.log(error);
      }
    }




  const dataform = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userName,
      email: userEmail,
      phone: userPhone,
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      email: yup.string().required("Email is required"),
      phone: yup.string().required("Phone is required"),
    }),
    onSubmit: (values) => {
      updateMe(values);
    },
  });

  return (
    <>
      <Helmet>
        <title>Account</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <div className="row ">
              <div className="col-xxl-1 col-2 pe-0">
                <ul className="list-unstyled">
                  <li className="list-item mt-3 pt-1 mb-4 fs-5">Name</li>
                  <li className="list-item my-4 fs-5">Email</li>
                  <li className="list-item my-4 fs-5">Phone</li>
                </ul>
              </div>
              <div className="col-1 ps-2 pe-0">
                <ul className="list-unstyled">
                  <li className="list-item mt-3 pt-1 mb-4 fs-5">:</li>
                  <li className="list-item my-4 fs-5">:</li>
                  <li className="list-item my-4 fs-5">:</li>
                </ul>
              </div>
              <div className="col-lg-5 col-9 ps-0">
                <form onSubmit={dataform.handleSubmit}>
                  <div className="my-3">
                    <input
                      disabled={disabeld}
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      placeholder=""
                      {...dataform.getFieldProps("name")}
                    />
                  </div>

                  <div className="my-3">
                    <input
                      disabled={disabeld}
                      type="text"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder=""
                      {...dataform.getFieldProps("email")}
                    />
                  </div>

                  <div className="my-3">
                    <input
                      disabled={disabeld}
                      type="phone"
                      name="phone"
                      id="phone"
                      className="form-control"
                      placeholder=""
                      {...dataform.getFieldProps("phone")}
                    />
                  </div>
                  <div className=" col-3 d-flex">
                    <div
                      className="btn bg-main text-white m-2 ms-0 "
                      onClick={() => setDisabeld(false)}
                    >
                      Change
                    </div>

                    <button
                      type="submit"
                      className="btn bg-main text-white m-2 "
                      disabled={disabeld}
                    >
                      {update}
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

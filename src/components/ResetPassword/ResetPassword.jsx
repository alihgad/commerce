import React, { useContext, useState } from "react";
import styles from "./ResetPassword.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { TokenContext } from "../../Context/TokenContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  const [password, SetPassword] = useState("password");

  function changeType() {
    if (password === "password") {
      SetPassword("text");
    } else {
      SetPassword("password");
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("email is required").email('please enter a valid email'),
      newPassword: yup
        .string()
        .matches(
          /^[A-Z][a-zA-z0-9]{3,18}$/,
          "password must start with capital letter and bettwen 6-9 chracter length"
        )
        .required("password is requaired"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      axios
        .put(
          "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          values
        )
        .then((res) => {
          console.log(res.data.token);
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Reset Password</h4>
                <p className="card-title-desc">
                  Enter your email and your new password.
                </p>
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="mt-2 p-0 ps-1 alert alert-danger ">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-group mb-3 position-relative">
                    <label>Password</label>
                    <input
                      type={password}
                      className="form-control"
                      {...formik.getFieldProps("newPassword")}
                    />
                    <div
                      className="position-absolute top-50 end-0 me-3 cursor-pointer"
                      onClick={() => {
                        changeType();
                      }}
                    >
                      <i className="fas fa-eye "></i>
                    </div>
                  </div>
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <div className="mt-2 p-0 ps-1 alert alert-danger ">
                      {formik.errors.newPassword}
                    </div>
                  ) : null}

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                      {loading ? (
                        <i className="fas fa-spinner fa-pulse"></i>
                      ) : (
                        "Send"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

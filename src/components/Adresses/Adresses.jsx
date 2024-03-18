import React, { useContext, useEffect, useState } from "react";
import styles from "./Adresses.module.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import { TokenContext } from "../../Context/TokenContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FormikErrors, FormikProps, useFormik } from "formik";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import Loader from "../Loader/Loader";

export default function Adresses() {
  let formikRef = null;
  let { id, token } = useContext(TokenContext);
  let [adresses, setAdresses] = useState("");
  let [loading, setLoading] = useState(true);

  async function getAdresses() {
    let headers = {
      token,
    };

    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/addresses`,
        { headers }
      );
      console.log(response);
      setAdresses(response?.data?.data);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function addAdress({ name, details, phone, city }) {
    let headers = {
      token,
      "Content-Type": "application/json",
    };

    let data = {
      name,
      details,
      phone,
      city,
    };

    let url = "https://ecommerce.routemisr.com/api/v1/addresses";

    try {
      const response = await axios.post(url, data, { headers });
      console.log(response);
      setAdresses(response?.data?.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  function swal() {
    withReactContent(Swal).fire({
      title: "Add Adress",
      html: (
        <>
          <Formik
            innerRef={(ref) => (formikRef = ref)}
            initialValues={{
              name: "",
              details: "",
              phone: "",
              city: "",
            }}
            validationSchema={yup.object().shape({
              name: yup.string().required("Name is required"),
              details: yup.string().required("Details is required").min(3),
              phone: yup
                .string()
                .required("Phone is required")
                .matches(
                  /^(?:01)[0125]\d{8}$/,
                  "please enter a valide phone number"
                ),
              city: yup.string().required("City is required").min(3),
            })}
            onSubmit={(values) => addAdress(values)}
          >
            <Form>
              <Field
                type="text"
                className="swal2-input"
                name="name"
                placeholder="Name"
                onKeyPress={(event) =>
                  event.key === "Enter" && Swal.clickConfirm()
                }
              />

              <Field
                type="text"
                className="swal2-input"
                name="details"
                placeholder="Details"
                onKeyPress={(event) =>
                  event.key === "Enter" && Swal.clickConfirm()
                }
              />

              <Field
                type="text"
                className="swal2-input"
                name="phone"
                placeholder="Phone"
                onKeyPress={(event) =>
                  event.key === "Enter" && Swal.clickConfirm()
                }
              />

              <Field
                type="text"
                className="swal2-input"
                name="city"
                placeholder="City"
                onKeyPress={(event) =>
                  event.key === "Enter" && Swal.clickConfirm()
                }
              />
            </Form>
          </Formik>
        </>
      ),
      didOpen: () => {
        Swal.getPopup()?.querySelector("input")?.focus();
      },
      preConfirm: async () => {
        await formikRef?.submitForm();
        if (formikRef?.isValid) {
          Swal.fire({
            title: "Address added successfully",
            icon: "success",
          });
        } else {
          Swal.showValidationMessage(JSON.stringify(formikRef?.errors));
        }
      },
    });
  }

  useEffect(() => {
    getAdresses();
  }, []);

  return (
    <>
      <Helmet>
        <title>Adresses</title>
      </Helmet>
      <div className="container mt-2">
        {loading ? (
          <Loader />
        ) : (
          <>
            {adresses.length < 1 ? (
              <>
                <div className="container mt-5 px-5">
                  <div className="row justify-content-center ">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title text-center">no Adresses</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="row px-4">
                <>
                  <div className="col-12 card  my-2">
                    <table className="table table-striped table-bordered text-center pt-5">
                      <thead>
                        <th>name</th>
                        <th>details</th>
                        <th>phone</th>
                        <th>city</th>
                      </thead>
                      <tbody>

                        {adresses.map(adress => <>
                        <tr>
                          <td>{adress.name}</td>
                          <td>{adress.details}</td>
                          <td>{adress.phone}</td>
                          <td>{adress.city}</td>
                        </tr>
                        </>)}

                      </tbody>
                    </table>
                  </div>
                </>
              </div>
            )}
          </>
        )}

        <button
          className="btn bg-main text-white m-2"
          onClick={() => {
            swal();
          }}
        >
          add adress
        </button>
      </div>
    </>
  );
}

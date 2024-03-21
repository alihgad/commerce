// import React, { useState } from "react";
// import styles from "./Offlinecheckout.module.css";
// import { useFormik } from "formik";
// import { Helmet } from "react-helmet";
// import { useContext } from "react";
// import { CartContexst } from "../../Context/CartContext";
// import * as yup from "yup";
// import toast from "react-hot-toast";


// export default function Checkout() {


//   let [ pays , setPay] =useState("Pay Now")
//   let { offlinePay, cartID } = useContext(CartContexst);

//   async function payment(cartID, shippingAddress) {
//     setPay(<i className="fas fa-spinner fa-pulse"></i>)
//     try{

//       let res = await offlinePay(cartID, shippingAddress)
//       toast.success('payment done successfully')
//       console.log(res.request);

//     }catch(err){
//       console.log(err);
//     setPay("Pay Now")

//     }
//   }

//   function pay(values) {
//     console.log('values');
//     payment(cartID, values);
//   }

//   let formik = useFormik({
//     initialValues: {
//       details: "",
//       phone: "",
//       city: "",
//     },
//     onSubmit: (values) => {pay(values) ; console.log(values);},

//     validationSchema: yup.object().shape({
//       details: yup.string().required("Details is required").min(3),
//       phone: yup
//         .string()
//         .required("Phone is required")
//         .matches(/^(?:01)[0125]\d{8}$/, "please enter a valide phone number"),
//       city: yup.string().required("City is required").min(3),
//     }),
//   });


//   return (
//     <>
//       <Helmet>
//         <title>Checkout</title>
//       </Helmet>
//       <div className="container">
//         <h2 className="my-3">Shipping Adress : </h2>

//         <form onSubmit={formik.handleSubmit}>
//           <div className="form-groub mb-2">
//             <label htmlFor="details" className="text-capitalize">
//               details
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="details"
//               name="details"
//               {...formik.getFieldProps("details")}
//             />
//             {formik.touched.details && formik.errors.details ? (
//               <div className="mt-2 p-0 ps-1 alert alert-danger ">
//                 {formik.errors.details}
//               </div>
//             ) : null}
//           </div>

//           <div className="form-groub mb-2">
//             <label htmlFor="phone" className="text-capitalize">
//               phone
//             </label>
//             <input
//               type="tel"
//               className="form-control"
//               id="phone"
//               name="phone"
//               {...formik.getFieldProps("phone")}
//             />
//             {formik.touched.phone && formik.errors.phone ? (
//               <div className="mt-2 p-0 ps-1 alert alert-danger ">
//                 {formik.errors.phone}
//               </div>
//             ) : null}
//           </div>

//           <div className="form-groub mb-2">
//             <label htmlFor="city" className="text-capitalize">
//               city
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="city"
//               name="city"
//               {...formik.getFieldProps("city")}
//             />
//             {formik.touched.city && formik.errors.city ? (
//               <div className="mt-2 p-0 ps-1 alert alert-danger ">
//                 {formik.errors.city}
//               </div>
//             ) : null}
//           </div>

          

//             <button
//               type="submit"
//               className="btn bg-main w-100 text-white my-3"
//             >
//               {pays}
//             </button>

//         </form>

//       </div>
//     </>
//   );
// }



import React, { useEffect, useState } from "react";
import styles from "./Offlinecheckout.module.css";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { CartContexst } from "../../Context/CartContext";
import * as yup from "yup";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { TokenContext } from "../../Context/TokenContext";
import Loader from "../Loader/Loader";

export default function Offlinecheckout() {
  let formikRef = null;
  let [adresses, setAdresses] = useState("");
  let [loading, setLoading] = useState(true);
  let { offlinePay, cartID } = useContext(CartContexst);
  console.log(cartID);
  const token = localStorage.getItem("token");

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
      setLoading(false);
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
  

  async function deleteAdress(id) {
    setLoading(true);
    let headers = {
      token,
      "Content-Type": "application/json",
    };

    let url = `https://ecommerce.routemisr.com/api/v1/addresses/${id}`;

    try {
      const response = await axios.delete(url, { headers });
      console.log(response);
      setAdresses(response?.data?.data);
      setLoading(false);

      return response.data;
    } catch (e) {
      console.log(e);
      setLoading(false  );

    }
  }


  async function payment(cartID, shippingAddress) {
    let res = await offlinePay(cartID, shippingAddress);
    console.log(res);
  }

  function pay({adress}) {
    loading(true);
    console.log(adress);
    payment(cartID, adress);
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
            onSubmit={
              (values) => {pay(values)
                  addAdress(values)}
            }
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
        <title>Checkout</title>
      </Helmet>

      <div className="container">
        <h2 className="my-3">Chosse Shipping Adress : </h2>

        

{loading ? (
          <Loader />
        ) : (
          <>
            {adresses.length < 1 ? (
              <>
                <div className="container mt-5 px-5 ">
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
              <div className="row px-4 ">
                <>
                  <div className="col-12 card  my-2">
                    <table className="table table-striped table-bordered text-center pt-5">
                      <thead>
                        <th>name</th>
                        <th>details</th>
                        <th>phone</th>
                        <th>city</th>
                        <th>delete</th>
                      </thead>
                      <tbody>

                        {adresses.map(adress => <>
                        <tr key={adress._id} id={adress._id} className="cursor-pointer" onClick={()=>pay({adress})}>
                          <td>{adress.name}</td>
                          <td>{adress.details}</td>
                          <td>{adress.phone}</td>
                          <td>{adress.city}</td>
                          <td><div className="btn btn-outline-danger" onClick={(e)=>{deleteAdress(adress._id) ; e.stopPropagation()}}> <i className="fas fa-trash-can"></i> </div></td>
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

        <div className="btn btn-success m-2" onClick={()=>swal()}>Add New Adress</div>

      </div>
    </>
  );
}


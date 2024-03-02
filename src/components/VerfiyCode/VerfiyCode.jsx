import React from 'react'
import styles from './VerfiyCode.module.css';
import { useFormik } from 'formik';
import * as yup from "yup";
import  axios  from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


export default function VerfiyCode() {

  const navigate = useNavigate()

  let formik= useFormik({
    initialValues: {
      resetCode: ''
    },
    validationSchema: yup.object().shape({
      resetCode: yup.string().required('Code is required')
    }),
    onSubmit: (values) => {

      axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
   .then((res) => {
        console.log(res.data)
        navigate('/reset-password')
      })
   .catch((err) => {
        console.log(err)
      })
      console.log(values);
    }
  });
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <h4>
                  enter the code which sent to your email 
                  </h4>
                  <form onSubmit={formik.handleSubmit} >
                  <div className="form-group">
                    <label>Verfiy Code</label>
                    <input
                      type="text"
                      className="form-control my-3"
                      id="code"
                      aria-describedby="codeHelp"
                      placeholder="Enter code"
                      {...formik.getFieldProps('resetCode')}
                    />
                    <small id="codeHelp" className="form-text text-muted ">
                      dont share your code with anyone else.
                    </small>
                  </div>
                  <button type='submit'  className="btn btn-primary my-2" >
                    Submit
                  </button>
                </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

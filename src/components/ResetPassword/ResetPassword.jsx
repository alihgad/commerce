import React, { useContext } from 'react'
import styles from './ResetPassword.module.css';
import { useFormik } from 'formik';
import * as yup from "yup";
import axios from 'axios';
import { TokenContext } from '../../Context/TokenContext';
import { Navigate, useNavigate } from 'react-router-dom';


export default function ResetPassword() {
  const {setToken}= useContext(TokenContext)
  const navigate =useNavigate()

  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: ''
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('email is required'),
      newPassword: yup.string().required('password is required')
    }),
    onSubmit: (values) => {
      axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
     .then(res => {
          console.log(res.data.token)
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
          navigate('/home')

        })
     .catch(err => {
          console.log(err)
        })
    }
  })

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
                    <input type="email" className="form-control"  {...formik.getFieldProps('email')}/>
                  </div>

                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control" {...formik.getFieldProps('newPassword')} />
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    )
}

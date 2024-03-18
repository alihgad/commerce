import React, { useContext, useEffect, useState } from 'react'
import styles from './Signin.module.css';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TokenContext } from './../../Context/TokenContext';

export default function Signin() {
  let{token,setToken} = useContext(TokenContext)
  setToken(null)
  localStorage.removeItem('token')
  const [errorMesaage,setErrorMessage] = useState('') 
  const [isLoading,SetIsLoading] = useState(false)   
  const [password,SetPassword] = useState('password')   
  const navigate = useNavigate(); 


  const formik = useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: yup.object({
        email : yup.string().email('please enter a avlid email').required('email is requaired'),
        password : yup.string().required('password is requaired')
      })
      ,
      onSubmit : values => {
        SetIsLoading(true)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .then(response => {
        console.log(response.data.token);
        localStorage.setItem('token', response.data.token)
        setToken(response.data.token);
        navigate('/home')
        SetIsLoading(false)
      })
      .catch(e => {
        setErrorMessage(e.response.data.message) 
        SetIsLoading(false)
      
      })
      }
  }) 


  function changeType(){
    if(password === 'password'){
      SetPassword('text')
    }
    else{
      SetPassword('password')
    }
  }


  return (
    <>
      <div  className="container  mt-5">
      <h2 className='text-center'>Sign in</h2>
      {errorMesaage ?  <div className="alert alert-danger w-75 mx-auto mt-3">{errorMesaage}</div> : null}

      <form onSubmit={formik.handleSubmit} className='w-75 mx-auto mt-3'>


        <div className="form-group mb-2 ">
          <label htmlFor="email" >email : </label>
          <input autoComplete='email' id='email' name='email' type="text"  className='form-control ' {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? (<div className='mt-2 p-0 ps-1 alert alert-danger '>{formik.errors.email}</div>) : null}
        </div>

        <div className="form-group mb-2 position-relative ">
          <label htmlFor="password" >password : </label>
          <input id='password' name='password' type={password}  className='form-control ' {...formik.getFieldProps('password')} />
          <div className='position-absolute top-50 end-0 me-3 cursor-pointer' onClick={()=>{changeType()}}><i className='fas fa-eye '></i></div>
        </div>
          {formik.touched.password && formik.errors.password ? (<div className='mt-2 p-0 ps-1 alert alert-danger '>{formik.errors.password}</div>) : null}


        

        <div className="d-flex align-items-center">
        <Link to={'/forget-password'} className={`${styles.link} fw-bold`}>forget password ? </Link>
        <button type='submit' className='btn btn-primary d-block ms-auto my-3' >{isLoading ? <i className='fas fa-spinner fa-pulse'></i> :'Sign in'}</button>
        </div>
      </form>

      </div>
    </>
  )
}

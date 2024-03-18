import React, { useState } from 'react'
import styles from './Register.module.css';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';
import { useContext } from 'react';
import { TokenContext } from '../../Context/TokenContext';



export default function Register() {

  let{token,setToken} = useContext(TokenContext)
  setToken(null)
  localStorage.removeItem('token')

  const [password,SetPassword] = useState('password')   
  const [repassword,SetRePassword] = useState('password')   
  const [errorMesaage,SeterrorMessage] = useState('') 
  const [isLoading,SetIsLoading] = useState(false)   
  const navigate = useNavigate(); 

  const formik = useFormik({
      initialValues: {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: ''
      },
      validationSchema: yup.object({
        name : yup.string().min(3,'minmum length is 10 chracters').max(10,'max length is 10 chracters').required('name is required'),
        email : yup.string().email('please enter a avlid email').required('email is requaired'),
        password : yup.string().matches(/^[A-Z][a-zA-z0-9]{3,18}$/,'password must start with capital letter and bettwen 6-9 chracter length').required('password is requaired'),
        rePassword : yup.string().oneOf([yup.ref('password'), null], 'passwords must match').required('rePassword is requaired'),
        phone : yup.string().matches(/^01[0125][0-9]{8}$/,'please rnter vlaide phone number').required('phone is requaired')
      })
      ,
      onSubmit : values => {
        SetIsLoading(true)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
        .then(response => {
          console.log(response)
          navigate('/signin')
        SetIsLoading(false)

        })
        .catch(e => {
          SeterrorMessage(e.response.data.message)
          console.log(e.response.data.message)
        SetIsLoading(false)

        });
        
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

  function rechangetype(){
    if(repassword === 'password'){
      SetRePassword('text')
    }
    else{
      SetRePassword('password')
    }
  }



  return (
    <>
      <div className="container  mt-5">
      <h2 className='text-center'>Sign up</h2>
      {errorMesaage ?  <div className="alert alert-danger w-75 mx-auto mt-3">{errorMesaage}</div> : null}

      <form onSubmit={formik.handleSubmit} className='w-75 mx-auto mt-3'>

        <div className="form-group mb-2 ">
          <label htmlFor="name" >name : </label>
          <input id='name' name='name' type="text"  className='form-control ' {...formik.getFieldProps('name')} />
          {formik.touched.name && formik.errors.name ? (<div className='mt-2 p-0 ps-1 alert alert-danger '>{formik.errors.name}</div>) : null}
        </div>

        <div className="form-group mb-2 ">
          <label htmlFor="email" >email : </label>
          <input id='email' name='email' type="text"  className='form-control ' {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? (<div className='mt-2 p-0 ps-1 alert alert-danger '>{formik.errors.email}</div>) : null}
        </div>

        <div className="form-group mb-2 position-relative ">
          <label htmlFor="password" >password : </label>
          <input id='password' name='password' type={password}  className='form-control ' {...formik.getFieldProps('password')} />
          <div className='position-absolute top-50 end-0 me-3 cursor-pointer' onClick={()=>{changeType()}}><i className='fas fa-eye '></i></div>

        </div>
          {formik.touched.password && formik.errors.password ? (<div className='mt-2 p-0 ps-1 alert alert-danger '>{formik.errors.password}</div>) : null}

        <div className="form-group mb-2 position-relative ">
          <label htmlFor="rePassword" >rePassword : </label>
          <input id='rePassword' name='rePassword' type={repassword}  className='form-control ' {...formik.getFieldProps('rePassword')} />
          <div className='position-absolute top-50 end-0 me-3 cursor-pointer' onClick={()=>{rechangetype()}}><i className='fas fa-eye '></i></div>

        </div>
          {formik.touched.rePassword && formik.errors.rePassword ? (<div className='mt-2 p-0 ps-1 alert alert-danger '>{formik.errors.rePassword}</div>) : null}

        <div className="form-group mb-2 ">
          <label htmlFor="phone" >phone : </label>
          <input id='phone' name='phone' type="text"  className='form-control ' {...formik.getFieldProps('phone')} />
          {formik.touched.phone && formik.errors.phone ? (<div className='mt-2 p-0 ps-1 alert alert-danger '>{formik.errors.phone}</div>) : null}
        </div>

        

        <button id='signup' type='submit' className='btn btn-primary d-block ms-auto' >{isLoading ? <i className='fas fa-spinner fa-pulse'></i> :'Sign up'}</button>

      </form>

      </div>
    </>
  )
}

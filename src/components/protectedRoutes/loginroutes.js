import React from 'react'
import { Navigate } from 'react-router-dom'

export default function LoginRoutes(props) {
    
  if (localStorage.getItem('token')){
    
    return <Navigate to={'/home'} />

  }else{
    return props.children
  }
}

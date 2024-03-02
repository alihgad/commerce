import React from 'react'
import error from './../../assets/images/error.svg' 
import {ReactComponent as ReactLogo} from './../../assets/images/error.svg';

export default function NotFound() {
  return (
    <>
    <div className="container py-5 my-5 ">
      <h1 className='text-center '>..OOPS its look like you type a wrong path</h1>
      <div className="row py-4 my-4 ">
        <div className="error my-2 py-1  w-100 d-flex justify-content-center">
          <ReactLogo/>
        </div>
      </div>
    </div>
    </>
  )
}

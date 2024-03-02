import React from 'react'
import styles from './Loader.module.css';
import { ThreeCircles } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className="container justify-content-center d-flex my-5 py-5">
      <ThreeCircles 
      visible={true}
      height="100"
      width="100"
      ariaLabel="three-circles-loading"
      middleCircleColor = "#1AFF1A "
      innerCircleColor = '#0c0'
      outerCircleColor='#0aad0a'
      wrapperStyle={{}}
      wrapperClass=""
      />
    </div>
      )

  
}

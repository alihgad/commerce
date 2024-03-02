import React from 'react'
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
    <footer className=' bg-secondary-subtle py-3 fixed-bottom'>
      <div className="container text-center text-capitalize">
        <span>created by <h4 className='d-inline '><Link className='text-main mx-1' to={'https://alihgad.github.io/portoflio'} target='_blank'> ali hassan </Link></h4> &copy;2024 </span>
        
      </div>
    </footer>
    </>
  )
}

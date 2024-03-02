import React from 'react'
import styles from './Products.module.css';
import { Helmet } from 'react-helmet';
import ProductsHome from '../ProductsHome/ProductsHome';

export default function Products() {
  return (
    <>
    <Helmet>
      <title>Products</title>
    </Helmet>
    <ProductsHome/>
    </>
  )
}

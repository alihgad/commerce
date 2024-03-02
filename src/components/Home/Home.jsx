import { Helmet } from 'react-helmet';
import CatPreview from '../CatPreview/CatPreview';
import Gallery from '../Gallery/Gallery';
import ProductsHome from '../ProductsHome/ProductsHome';
import styles from './Home.module.css';




export default function Home() {



  return (
    <>
    <Helmet>
      <title>Home</title>
    </Helmet>


      <div className="container mb-5 pb-3">
       <Gallery/>
       <CatPreview />
       <ProductsHome/>
      </div>
    </>
  )
}

import { useContext, useEffect, useState } from 'react';
import styles from './NavBar.module.css';
import { Link, NavLink } from 'react-router-dom';
import { TokenContext } from './../../Context/TokenContext';
import { CartContexst } from '../../Context/CartContext';
import {ReactComponent as ReactLogo} from './../../assets/images/freshcart-logo.svg';




export default function NavBar() {
  const [quantity,setQuantity] = useState(0)
  const { setToken , name } = useContext(TokenContext);
  let {cartQ} = useContext(CartContexst);
  
  let token = localStorage.getItem('token');


  
  useEffect(()=>{
    setQuantity(cartQ)
  },[cartQ])






  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top ">
  <div className="container">
    <NavLink className="navbar-brand" href="#"><ReactLogo/> </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse text-capitalize" id="navbarSupportedContent">

    { token ? <> <ul className="navbar-nav me-auto mb-2 mb-lg-0">


<li className="nav-item">
  <NavLink className=" nav-link" to={"home"}>home</NavLink>
</li>


<li className="nav-item">
  <NavLink className="nav-link" to={"products"}>products</NavLink>
</li>

<li className="nav-item">
  <NavLink className="nav-link" to={"Categories"}>Categories</NavLink>
</li>

<li className="nav-item">
  <NavLink className="nav-link" to={"brands"}>brands</NavLink>
</li>



<li className="nav-item">
  <NavLink className="nav-link" to={"whichlist"}>whichlist</NavLink>
</li>

<li className="nav-item me-auto">
  <Link className="nav-link position-relative" to={"cart"}> <i className='fas fa-cart-shopping fa-xl'>  </i>  <span className=' bg-info rounded-circle  p-2   '>{quantity}</span> </Link>
</li>

</ul>
<ul className='navbar-nav ms-auto mb-2 mb-lg-0'>

  <li className="nav-item mx-2 d-flex align-items-center">
      <p className='m-0 '>  {name} </p>
  </li>
<li className="nav-item ">
  <NavLink className="btn btn-danger text-capitalize" to={"signin"} onClick={ ()=> {setToken(null) ; localStorage.removeItem('token');}  } >sign Out</NavLink>
</li> 
</ul>
</>
:
<ul className="navbar-nav ms-auto mb-2 mb-lg-0">

        <li className="nav-item">
          <NavLink className="nav-link" to={"register"}>register</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to={"signin"}>sign In</NavLink>
        </li>
        
        
      </ul>
}
      
      
      
    </div>
  </div>
</nav>

    </>
  
}

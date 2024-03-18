import { useContext, useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import { Link, NavLink } from "react-router-dom";
import { TokenContext } from "./../../Context/TokenContext";
import { CartContexst } from "../../Context/CartContext";
import { ReactComponent as Logo } from "./../../assets/images/freshcart-logo.svg";
import user from "./../../assets/images/user.png";

export default function NavBar() {
  const [quantity, setQuantity] = useState(0);
  const { setToken, name, build } = useContext(TokenContext);

  
  let { cartQ } = useContext(CartContexst);
  
  let token = localStorage.getItem("token");

  if (token) {
    build();
  }

  useEffect(() => {
    setQuantity(cartQ);
  }, [cartQ]);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary fixed-top shadow "
        id="nav"
      >
        <div className="container">
          <NavLink className="navbar-brand" href="#">
            <Logo />{" "}
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse text-capitalize"
            id="navbarSupportedContent"
          >
            {token ? (
              <>
                {" "}
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item ">
                    <NavLink className="  ps-md-2 ps-3 nav-link" to={"/home"}>
                      home
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link ps-md-2 ps-3" to={"products"}>
                      products
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link ps-md-2 ps-3"
                      to={"Categories"}
                    >
                      Categories
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link ps-md-2 ps-3" to={"brands"}>
                      brands
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link ps-md-2 ps-3" to={"whichlist"}>
                      whichlist
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link ps-md-2 ps-3" to={"allorders"}>
                      Orders
                    </NavLink>
                  </li>

                  <li className="nav-item me-auto">
                    <Link
                      className="nav-link ps-md-2 ps-3 position-relative"
                      to={"cart"}
                    >
                      <i className="fas fa-cart-shopping fa-xl"> </i>{" "}
                      <span className=" bg-main text-white  rounded-5  p-2   ">
                        {quantity}
                      </span>
                    </Link>
                  </li>
                </ul>
                <div className="btn-group    navbar-nav  mb-2 mb-lg-0 col-4 col-md-3 col-lg-3 col-xl-4 d-flex justify-content-end ">
                  <div
                    className="  cursor-pointer bg-main rounded-5 text-white text-capitalize row row-cols-2 py-1 align-items-center justify-content-lg-center justify-content-between col-xxl-7 col-xl-8   col-12 ms-1"
                    data-bs-toggle="dropdown"
                  >
                    <span className="ms-lg-auto justify-self-end  col-xl-7  col-lg-8 col-8   pe-0 ps-lg-4 ps-3    ">
                      {name}
                    </span>
                    <div className="img ps-0 me-auto col-4 col-md-4 ms-lg-2 ms-xl-0 col-lg-3  ">
                      <img src={user} className="w-75" alt="" />
                    </div>
                  </div>

                  <ul
                    className={`dropdown-menu dropdown-menu-end text-center p-0 ${styles.tra}`}
                  >
                    <NavLink to={"/settings"}>
                      <li className="my-2 dropdown-item">Settings</li>
                    </NavLink>
                    <hr className="my-2" />
                    <NavLink
                      className=" text-capitalize"
                      to={"signin"}
                      onClick={() => {
                        setToken(null);
                        localStorage.removeItem("token");
                      }}
                    >
                      <li className="nav-item my-2 dropdown-item ">sign Out</li>
                    </NavLink>
                  </ul>
                </div>
              </>
            ) : (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to={"register"}>
                    register
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to={"signin"}>
                    sign In
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

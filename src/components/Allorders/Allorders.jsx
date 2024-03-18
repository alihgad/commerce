import React, { useEffect } from "react";
import styles from "./Allorders.module.css";
import { TokenContext } from "./../../Context/TokenContext";
import { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Allorders() {
  const { id, getId } = useContext(TokenContext);
  const [orders, setOrders] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  async function getOrders() {
    if (id) {
      let url = `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`;
      let { data } = await axios.get(url);
      console.log(data);
      setOrders(data);
      setIsLoading(false);
      return data;
    }
  }

  useEffect(() => {
    getOrders();
  }, [id]);

  getId();

  return (
    <>
      <Helmet>
        <title>
          Orders
        </title>
      </Helmet>
      <div className={`container  bg-body-secondary ${styles.mb} py-3`}>
        <div className=" mx-2 ">
          <h1 className="text-center mb-3 ">All orders</h1>

          {isLoading ? (
            <Loader />
          ) : orders.length > 0 ? (
            orders?.map((order) => (
              <div className="row  mb-5" key={order._id}>
                <div className="card py-3 border-black">
                  <div className="container">
                    <div className="row border-bottom pb-4 gy-4">
                      {order?.cartItems.map((item) => (
                        <div key={item._id} className="col-lg-2  col-sm-4">
                          <div className={`card ${styles.item} d-flex`}>
                            <div className="card-imge">
                              <img
                                src={item.product.imageCover}
                                className="w-100"
                                alt=""
                              />
                            </div>
                            <div className="card-body">
                              <h5 className="card-title">
                                {item.product.title
                                  .split(" ")
                                  .splice(0, 4)
                                  .join(" ")}
                              </h5>
                            </div>
                            <div className="container">
                              <p className="mb-1">price : {item.price}</p>
                              <p className="">count : {item.count}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="row mt-4 gy-5 align-items-stretch ">
                      <div className={`col-md-4`}>
                        <div className={`${styles.data} card`}>
                          <div className={` card-body`}>
                            <p>order id : {order.id} </p>
                            <p>
                              order date :{" "}
                              {order.createdAt.split("").splice(0, 10).join("")}{" "}
                            </p>
                            <p>
                              Order Paid :{" "}
                              {order.isPaid ? (
                                <i className="fa-regular fa-check-circle fa-lg text-success"></i>
                              ) : (
                                <i className="fa-regular fa-circle-xmark text-danger fa-lg"></i>
                              )}{" "}
                            </p>
                            <p>
                              Order Deliverd :{" "}
                              {order.isDelivered ? (
                                <i className="fas fa-check fa-lg text-sucsses"></i>
                              ) : (
                                <i className="fa-regular fa-circle-xmark text-danger fa-lg"></i>
                              )}{" "}
                            </p>
                            <p>
                              payment Method :{" "}
                              {order.paymentMethodType === "card" ? (
                                <span className="d-inline">
                                  card{" "}
                                  <i className="fa-brands fa-cc-visa  fa-lg"></i>{" "}
                                </span>
                              ) : (
                                "cash"
                              )}{" "}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className={`col-md-4 `}>
                        <div className={`${styles.data} card `}>
                          <div className={` card-body`}>
                            <ul className="list-unstyled">
                              <li>
                                <h4>shipping adress</h4>
                                <ul className="list-unstyled">
                                  <li className=" my-3 ">
                                    Phone : {order?.shippingAddress?.phone}
                                  </li>
                                  <li className=" my-3 ">
                                    shipping City : {order?.shippingAddress?.city}
                                  </li>
                                  <li className=" my-3 ">
                                    shipping Address :{" "}
                                    {order?.shippingAddress?.details}
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className={`col-md-4 `}>
                        <div className={`${styles.data} card `}>
                          <div className={` card-body`}>
                            <p>
                              products Net Amount :{" "}
                              {order.totalOrderPrice -
                                Math.floor(order.totalOrderPrice * 0.14)}{" "}
                            </p>
                            <p>Shipping Amount : 50 </p>
                            <p>
                              Tax Amount :{" "}
                              {Math.floor(order.totalOrderPrice * 0.14)}{" "}
                            </p>
                            <hr />
                            <p>Total Amount : {order.totalOrderPrice + 50} </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title text-center text-capitalize">
                        no orders till now start <Link className="text-main text-decoration-underline" to={'/products'}> shopping </Link> now 
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

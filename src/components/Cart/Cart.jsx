import styles from "./Cart.module.css";
import { Helmet } from "react-helmet";
import { useContext, useState } from "react";
import { CartContexst } from "../../Context/CartContext";
import Loader from "../Loader/Loader";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  let { displayCart, clearCart, cartCounter, removeItem, updateQuantity } =
    useContext(CartContexst);
  let [data, setData] = useState({});
  let [isLoading, setIsLoading] = useState(true);
  let [countLoading, setCountLoading] = useState(false);

  async function getData() {
    let res = await displayCart();
    console.log(res);
    setIsLoading(false);
    setData(res);
  }

  async function deleteItem(id) {
    setIsLoading(true);
    let res = await removeItem(id);
    console.log(res);
    setIsLoading(false);
    setData(res);
  }

  useEffect(() => {
    getData();
  }, []);

  async function updateItem(id, quantity) {
    if (quantity === 0) {
      deleteItem(id);
    }

    let res = await updateQuantity(id, quantity);
    console.log(res);
    setData(res);
  }

  async function clearData() {
    setIsLoading(true);
    await clearCart();
    getData();
    cartCounter();
  }

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="container mb-5 pb-5">
        <div className=" bg-body-secondary pt-3 text-capitalize w-75 mx-auto px-4 ">
          <div className="d-flex justify-content-between">
            <h3>shop cart :</h3>
            {data?.response?.status === 404 ||
            data?.data?.numOfCartItems === 0 ? null : (
              <div
                className="btn btn-outline-danger  "
                onClick={() => {
                  clearData();
                }}
              >
                clear cart
              </div>
            )}
          </div>
          <p className="text-main">
            {data?.response?.status === 404 ||
            data?.data?.numOfCartItems === 0 ? null : (
              <div>
                {data?.data?.data?.totalCartPrice ? (
                  `total cart price : ${data?.data?.data?.totalCartPrice} EGP`
                ) : (
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-2" />
                  </p>
                )}
              </div>
            )}
          </p>

          {isLoading ? (
            <>
              <Loader />
            </>
          ) : (
            <div>
              {data?.response?.status === 404 ||
              data?.data?.numOfCartItems === 0 ? (
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title text-center">
                          no product in cart
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    {data?.data?.data?.products?.map((prod) => (
                      <div
                        key={prod.product.id}
                        id={prod.product.id}
                        className="row mb-2 border-bottom py-3 align-items-center "
                      >
                        <div className="col-lg-2">
                          <img
                            src={prod?.product?.imageCover}
                            className="w-100"
                            alt={prod?.product?.title}
                          />
                        </div>

                        <div className="col-lg-8 ">
                          <p className="m-0 mb-2"> {prod?.product?.title}</p>
                          <p className="text-main m-0 mb-2">
                            price : {prod.price} EGP{" "}
                          </p>
                          <p>
                            <span
                              className=" btn p-0"
                              onClick={() => {
                                deleteItem(prod.product.id);
                              }}
                            >
                              <i className="fas fa-trash-can text-main me-1 "></i>
                              remove
                            </span>
                          </p>
                        </div>

                        <div className="col-lg-2 d-flex justify-content-end ">
                          <i
                            className="fas fa-plus border border-1 border-black p-1 me-2 cursor-pointer"
                            onClick={(e) => {
                              e.target.nextSibling.innerHTML = `<i class='fas fa-spinner fa-pulse'> </i>`;
                              updateItem(prod.product.id, prod.count + 1);
                            }}
                          ></i>
                          <span>{prod.count}</span>
                          <i
                            className="fas fa-minus border border-1 border-black p-1 ms-2 cursor-pointer"
                            onClick={(e) => {
                              updateItem(prod.product.id, prod.count - 1);
                              e.target.previousSibling.innerHTML = `<i class='fas fa-spinner fa-pulse'> </i>`;
                            }}
                          ></i>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="row ">
                    <div className="col">
                      <Link
                        to={"/checkout"}
                        className="btn bg-main w-100 my-3 text-white"
                      >
                        online payment
                      </Link>
                    </div>
                    <div className="col">
                      <Link
                        to={"/offlinecheckout"}
                        className="btn bg-main w-100 my-3 text-white"
                      >
                        offline payment
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import styles from "./ProductsHome.module.css";
import axios from "axios";
import PriceAndRate from "../PriceAndRate/PriceAndRate";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';


export default function ProductsHome() {
  let [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  let added;

  const displayWhichList = async () => {
    const url = "https://ecommerce.routemisr.com/api/v1/wishlist";
    const headers = {
      token: `${localStorage.getItem("token")} `,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(url, { headers });
      console.log(response?.data?.data);
      setData(response?.data?.data);
      setIsLoading(false);
      return response?.data?.data;
    } catch (error) {
      return error;
    }
  };

  const addTOWhichList = async (id) => {
    const url = "https://ecommerce.routemisr.com/api/v1/wishlist";
    const headers = {
      token: `${localStorage.getItem("token")} `,
      "Content-Type": "application/json",
    };
    const data = {
      productId: id,
    };

    try {
      let res = await axios.post(url, data, { headers });
      toast.success('Product added to whichlist',{position:'top-right'});
      console.log(res);
      displayWhichList()

    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (id) => {
    const url = `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`;
    const headers = {
      token: `${localStorage.getItem("token")} `,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.delete(url, { headers });
      toast.success('Product removed from whichlist');
      console.log(response?.data?.data);
      displayWhichList()
      return response?.data?.data;

    } catch (error) {
      return error;
    }

  }

  useEffect(() => {
    setIsLoading(true);
    displayWhichList();
    // Fetch products from the API
    axios
      .get("https://route-ecommerce.onrender.com/api/v1/products")
      .then((response) => {
        console.log(response?.data?.data);
        setProducts(response?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  let filteredProducts = products;

  if (searchTerm) {
    filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(filteredProducts);
  }

  return (
    <>
      <h4 className="text-capitalize text-center mb-3"> all products</h4>
      <div className="container  ">
        <div className="search">
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="form-control mb-4 "
            name="search"
          />
        </div>
      </div>
      <div className="container mb-5 pb-5">
        <div className="row gy-4">
          {isLoading ? (
            <>
              <div className="col-lg-3">
                <div className="card" aria-hidden="true">
                  <img
                    src="https://placehold.co/600x400"
                    className="card-img-top w-100"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                      <span className="placeholder col-6" />
                    </h5>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7" />
                      <span className="placeholder col-4" />
                      <span className="placeholder col-4" />
                      <span className="placeholder col-6" />
                      <span className="placeholder col-8" />
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="card " aria-hidden="true">
                  <img
                    src="https://placehold.co/600x400"
                    className="card-img-top w-100"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                      <span className="placeholder col-6" />
                    </h5>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7" />
                      <span className="placeholder col-4" />
                      <span className="placeholder col-4" />
                      <span className="placeholder col-6" />
                      <span className="placeholder col-8" />
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="card" aria-hidden="true">
                  <img
                    src="https://placehold.co/600x400"
                    className="card-img-top w-100"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                      <span className="placeholder col-6" />
                    </h5>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7" />
                      <span className="placeholder col-4" />
                      <span className="placeholder col-4" />
                      <span className="placeholder col-6" />
                      <span className="placeholder col-8" />
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="card" aria-hidden="true">
                  <img
                    src="https://placehold.co/600x400"
                    className="card-img-top w-100"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                      <span className="placeholder col-6" />
                    </h5>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-7" />
                      <span className="placeholder col-4" />
                      <span className="placeholder col-4" />
                      <span className="placeholder col-6" />
                      <span className="placeholder col-8" />
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {filteredProducts.map((ele) => (
                <div
                  key={ele.id}
                  id={ele.id}
                  className=" col-md-6   col-lg-4 col-xl-3 "
                >

                  <div className="card product border rounded p-3 hover position-relative">
                    <Link to={`/product/${ele.id}`}>
                      <div className="image mb-3 ">
                        <img
                          src={ele.imageCover}
                          alt={ele.title}
                          className="w-100 "
                        />
                      </div>
                      <div className="card-body px-0  ">
                        <div className="text">
                          <p className="mb-1 text-main">{ele.category.name}</p>
                          <p className="mb-1">
                            {ele.title.split(" ").splice(0, 3).join(" ")}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <div
                      className={`whish-list ms-auto position-absolute end-0 ${styles.which} me-4 cursor-pointer`}
                    >
                      <div
                        className="bg-white border-0"
                        onClick={() => {
                          console.log("cliked");
                        }}
                      >

                        {added = false}

                        
                         {data?.map((prod) =>
                          ele.id === prod.id ? added = true : null
                        )}
                        
                        {added ?
                        (
                          <i
                          style={{ color: "red" }}
                          className="fas fa-heart fs-4 "
                          onClick={(e) => {
                            removeItem(ele.id)

                          }}
                        ></i>
                        ) :(
                          <i
                          className="fas fa-heart fs-4 "
                          onClick={(e) => {
                            addTOWhichList(ele.id);
                            console.log(e.target);

                          }}
                        ></i>
                        )}

                        

                        

                      </div>
                    </div>
                    <PriceAndRate ele={ele} />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

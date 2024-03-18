import React, { useEffect, useState } from "react";
import styles from "./Subproducts.module.css";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import PriceAndRate from "../PriceAndRate/PriceAndRate";
import Loader from "../Loader/Loader";

export default function Subproducts() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState();
  const [products, setProducts] = useState([]);
  let [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
      toast.success("Product added to whichlist", { position: "top-right" });
      console.log(res);
      displayWhichList();
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
      toast.success("Product removed from whichlist");
      console.log(response?.data?.data);
      displayWhichList();
      return response?.data?.data;
    } catch (error) {
      return error;
    }
  };

  const filteredProducts = products?.filter(
    (prod) => prod.subcategory[0]._id === id
  );
  console.log(filteredProducts);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  let filteredSearchProducts = filteredProducts;

  if (searchTerm) {
    filteredSearchProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  useEffect(() => {
    setIsLoading(true);
    displayWhichList();
    // Fetch products from the API
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((response) => {
        console.log(response?.data?.data);
        setProducts(response?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Subproducts</title>
      </Helmet>
      <div className="container py-2 mb-5  ">
        <div className="row mb-5 gy-4">
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

          {isLoading ? (
            <Loader />
          ) : filteredSearchProducts.length > 0 ? (
            filteredSearchProducts?.map((product) => (
              <div
                key={product.id}
                id={product.id}
                className=" col-md-6   col-lg-4 col-xl-3 "
              >
                <div className="card product border rounded p-3 hover position-relative">
                  <Link to={`/product/${product.id}`}>
                    <div className="image mb-3 ">
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-100 "
                      />
                    </div>
                    <div className="card-body px-0  ">
                      <div className="text">
                        <p className="mb-1 text-main">
                          {product.category.name}
                        </p>
                        <p className="mb-1">
                          {product.title.split(" ").splice(0, 3).join(" ")}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div
                    className={`whish-list ms-auto position-absolute end-0 which me-4 cursor-pointer`}
                  >
                    <div className="bg-white border-0">
                      {(added = false)}

                      {data?.map((prod) =>
                        product.id === prod.id ? (added = true) : null
                      )}

                      {added ? (
                        <i
                          style={{ color: "red" }}
                          className="fas fa-heart fs-4 "
                          onClick={(e) => {
                            removeItem(product.id);
                          }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-heart fs-4 "
                          onClick={(e) => {
                            addTOWhichList(product.id);
                          }}
                        ></i>
                      )}
                    </div>
                  </div>
                  <PriceAndRate ele={product} />
                </div>
              </div>
            ))
          ) : (
            <div className="container mt-5 ">
              <div className="row justify-content-center">
                <div className="card mb-3 bg-info">
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      No products to show
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

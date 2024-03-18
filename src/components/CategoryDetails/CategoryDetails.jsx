import React from "react";
import styles from "./CategoryDetails.module.css";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import PriceAndRate from "../PriceAndRate/PriceAndRate";
import toast from "react-hot-toast";

export default function CategoryDetails() {
  let { id } = useParams();
  const [subsLoading, setSubsLoading] = useState(true);
  const [subs, setsubs] = useState(null);
  const [catName, setCatName] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  let [products, setProducts] = useState([]);
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
      displayWhichList()
      return response?.data?.data;

    } catch (error) {
      return error;
    }

  }

  async function getCatDetails() {
    if (id) {
      setSubsLoading(true);
      let data = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
      );
      setsubs(data?.data?.data);
      setSubsLoading(false);

      return data?.data?.data;
    }
  }

  async function getCategoryName() {
    if (id) {
      let res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}`
      );
      setCatName(res?.data?.data?.name);
    }
  }

  async function getProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((response) => {
        setProducts(response?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  useEffect(() => {
    getCatDetails();
    getCategoryName();
    getProducts();
  }, []);

  const filteredProducts = products?.filter((prod) => prod.category._id === id);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  let filteredSearchProducts = filteredProducts;

  if (searchTerm) {
    filteredSearchProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(filteredSearchProducts);
  }

  return (
    <>
      <div className="container mb-5 pb-5">
        
        <div className="row pb-4 border-bottom">
          {subsLoading ? (
            <Loader />
          ) : (
            <>
              <h3 className="text-center text-main mt-5">
                {catName} subcategories
              </h3>
              <div className="row my-3 ">
                {subs?.length ? (
                  <>
                    {subs.map((sub) => (
                      <div className="col-md-6" key={sub._id}>
                        <Link to={'/subcategory/'+sub._id}>
                        <div className={`card p-3 m-2 w-100 hover`}>
                          <h3 className="text-center">{sub.name}</h3>
                        </div>
                        </Link>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <h4 className="text-capitalize text-center text-danger">
                      {" "}
                      no sub Categorys
                    </h4>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        <div className="row">
          <h3 className="text-center text-main mt-5">{catName} Proudcts</h3>

          <div className="row gy-4">

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

      {isLoading? <Loader/> : 
      (
        
      
        filteredSearchProducts.length>0 ? (filteredSearchProducts?.map(product =>


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
                          <p className="mb-1 text-main">{product.category.name}</p>
                          <p className="mb-1">
                            {product.title.split(" ").splice(0, 3).join(" ")}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <div
                      className={`whish-list ms-auto position-absolute end-0 which me-4 cursor-pointer`}
                    >
                      <div
                        className="bg-white border-0"
                      >

                        {added = false}

                        
                         {data?.map((prod) =>
                          product.id === prod.id ? added = true : null
                        )}
                        
                        {added ?
                        (
                          <i
                          style={{ color: "red" }}
                          className="fas fa-heart fs-4 "
                          onClick={(e) => {
                            removeItem(product.id)

                          }}
                        ></i>
                        ) :(
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

    )) : (
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
      ))
          
          
      }

      </div>
        </div>
      </div>
    </>
  );
}

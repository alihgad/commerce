import styles from "./Categorys.module.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";

export default function Categorys() {

  const [catId,setCatId]=useState(null)
  const [catName,setCatName]=useState(null)
  const [subs,setsubs]=useState(null)
  const [subsLoading,setSubsLoading]=useState(true)

  // console.log(catId);

  async function getData() {
    let data = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    return data?.data?.data;
  }


  async function getCategoryName() {
    if(catId){let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${catId}`)
    setCatName(res?.data?.data?.name);
  }

  }




  async function getCatDetails() {
      if(catId){
        setSubsLoading(true)
      let data = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${catId}/subcategories`
      );
      setsubs(data?.data?.data);
      setSubsLoading(false)

      return data?.data?.data;
    }
  }


  useEffect(()=>{
  getCatDetails()
  getCategoryName()

  },[catId])


console.log(subs);



  const { data, isLoading } = useQuery("cat", getData);

  

  return (
    <>
      <Helmet>
        <title>Categorys</title>
      </Helmet>
      <div className="container mb-5 pb-3">
        <div className="row">
          {isLoading ? <Loader/> :
          <>
          
            {data?.map((cat)=>{
              return (
                
              <div key={cat._id} className="col-md-4 col-lg-3">
            <div onClick={()=>{setCatId(cat._id) ;}} className={`card my-3 ${styles.cat} hover cursor-pointer`} >
              <img src={cat.image} className={`card-img-top w-100 `} alt={cat.name} />
              <div className="card-body">
                <div className="card-text">
                  <h4 className="text-main text-center fw-bold">{cat.name}</h4>
                </div>
              </div>
            </div>
          </div>
          
            )}) }

           {catId ? 
           <>
        {subsLoading ? <Loader/>: <>
            <h3 className="text-center text-main mt-5">
              {catName} subcategories
            </h3>
            <div className="row my-3 ">

              {subs?.length? <>
                {subs.map((sub)=>
                  <div className="col-md-6 ">
                    <div className={`card p-3 m-2 w-100 hover`}>
                    <h3 className="text-center">
                    {sub.name}
                    </h3>
                    </div>
                  </div>
                )}
              </> : <>
                  <h4 className="text-capitalize text-center text-danger"> no sub Categorys</h4>
              </>}
           </div>
              </> }

           
           </>
           
           :null} 

          </>
            

          }
        </div>
      </div>
    </>
  );
}

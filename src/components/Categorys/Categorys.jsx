import styles from "./Categorys.module.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

export default function Categorys() {

  const nav = useNavigate()


  async function getData() {
    let data = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    return data?.data?.data;
  }





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
            <div onClick={()=>{  nav("/category/"+cat._id)  ;}} className={`card my-3 ${styles.cat} hover cursor-pointer`} >
              <img src={cat.image} className={`card-img-top w-100 `} alt={cat.name} />
              <div className="card-body">
                <div className="card-text">
                  <h4 className="text-main text-center fw-bold">{cat.name}</h4>
                </div>
              </div>
            </div>
          </div>
          
            )}) }

           

          </>
            

          }
        </div>
      </div>
    </>
  );
}

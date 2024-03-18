import React, { useContext, useEffect } from "react";
import styles from "./Settings.module.css";
import { Helmet } from "react-helmet";
import {  NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Settings() {
  let nav = useNavigate()
  

useEffect(() => {
  nav('/settings/account')

},[])
  return (
    <>
      <Helmet>
        <title>Settings</title>
      </Helmet>

      <section id="settings" className="pt-5 mt-5">
        <div className="container">
          <div className="card">
            <div className="row">
              <div className="col-lg-3 d-flex flex-column mt-2">
              <NavLink className="btn bg-secondary m-2 text-white "  to={'account'}><div>Account Settings</div></NavLink>
               <NavLink className="btn bg-secondary m-2 text-white" to={'privacy'}> <div >Privacy Settings</div></NavLink>
               <NavLink className="btn bg-secondary m-2 text-white" to={'adresses'}> <div >Adresses Settings</div></NavLink>
              </div>
              <div className="col-lg-9">
                <Outlet/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

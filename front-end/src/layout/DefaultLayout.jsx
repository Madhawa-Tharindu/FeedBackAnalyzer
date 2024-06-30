import React from "react";
import AppNavbar from "../components/SystemPanel/AppNavbar";
import AppFooter from "../components/SystemPanel/AppFooter";
import "../assets/appcss/homecss.css";

export default function DefaultLayout(props) {
  return (
    <div className="d-flex flex-column">
      <AppNavbar />
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y mt-4">
          {props.component}
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

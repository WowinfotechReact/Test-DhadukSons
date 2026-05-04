import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "swiper/css/bundle";
import "react-toastify/dist/ReactToastify.css";
import "react-modal-video/css/modal-video.css";
import "react-circular-progressbar/dist/styles.css";
import "react-photo-view/dist/react-photo-view.css";
import "animate.css";

import "../src/assets/css/animate.css";
import "../src/assets/css/font-awesome.css";
import "../src/assets/css/flaticon-set.css";

import "../src/assets/css/validnavs.css";
import "../src/assets/css/helper.css";
import "../src/assets/css/unit-test.css";
import "../src/assets/css/shop.css";
import "../src/assets/css/style.css";

import Dependency from "./components/utilities/Dependency";
import RoutesScrollToTop from "./components/utilities/RoutesScrollToTop";
import Routers from "./Routers";
import ReduxWrapper from "./components/utilities/ReduxWrapper";
import "./assets/css/App.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Context/Context";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { geoLocation, setGeoLocation } = useAuth();

  // useEffect(() => {
  //   const userLogin = localStorage.getItem("Userlogin");
  //   const authUser = localStorage.getItem("authUser");

  //   // ✅ If both logins exist and user tries to access website routes
  //   // if (userLogin && authUser && !location.pathname.startsWith("/admin")) {
  //   //   navigate("/admin/dashboard", { replace: true });
  //   // }
  //   if (userLogin && authUser && !location.pathname.startsWith("/admin")) {
  //     navigate("/admin/dashboard");
  //   }
  // }, [location.pathname, navigate]);

  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     try {
  //       const response = await fetch("https://www.geoplugin.net/json.gp");
  //       // const response = await fetch(
  //       //   "http://www.geoplugin.net/json.gp?ip=8.8.8.8"
  //       // );
  //       const data = await response.json();

  //       setGeoLocation({
  //         country_code: data.geoplugin_countryCode || "IN",
  //         currency_code: data.geoplugin_currencyCode || "INR",
  //       });
  //     } catch (error) {
  //       console.error("Error fetching geoLocation:", error);
  //     }
  //   };

  //   fetchLocation();
  // }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        setGeoLocation({
          country_code: data.country || "IN",
          currency_code: data.currency || "INR",
        });
      } catch (error) {
        console.error("Error fetching geoLocation:", error);
      }
    };

    fetchLocation();
  }, []);

  // console.log(geoLocation);

  //   {
  //     "country_code": "IN",
  //     "currency_code": "INR"
  // }

  return (
    <>
      <ReduxWrapper>
        <Routers />

        <RoutesScrollToTop />
        <Dependency />
      </ReduxWrapper>
    </>
  );
}

export default App;

/* eslint-disable no-unused-vars */

import shape7 from "/assets/img/shape/7.png";
import { Link } from "react-router-dom";
import logoLight from "/assets/img/logo-light.png";
import { toast } from "react-toastify";
import BlogV1Data from "../../assets/jsonData/blog/BlogV1Data.json";
import FooterRecentPost from "./FooterRecentPost";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
interface FormEventHandler {
  (event: React.FormEvent<HTMLFormElement>): void;
}

const FooterV1 = () => {
  const handleForm: FormEventHandler = (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    form.reset();
    toast.success("Thanks For Subscribe");
  };
  const [activePath, setActivePath] = useState("");
  const location = useLocation();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <footer className="bg-dark text-light" style={{}}>
        <div className="container">
          <div className="f-items default-padding main-additional">
            <div className="row">
              <div className="col-lg-3 col-md-6 item">
                <div className="footer-item about">
                  <img className="logo w-auto" src={logoLight} alt="Logo" />
                  <p>
                    We are committed to transforming the future of Indian mango
                    farming by building a fair, sustainable, and empowering
                    ecosystem for growers.
                  </p>
                  <div className="footericon">
                    <ul>
                      <li>
                        <a
                          href="https://www.facebook.com/share/1EABACL58Y/?mibextid=wwXIfr"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      {/* <li>
                        <a
                          href="https://www.x.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li> */}
                      <li>
                        <a
                          href="https://www.youtube.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-youtube"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.linkedin.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.instagram.com/dhaduk_and_sons_farmerllp?igsh=MWtibjM2NWE3bXFvZQ%3D%3D&utm_source=qr"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 col-md-6 item">
                <div className="footer-item link">
                  <h4 className="widget-title">Quick Links</h4>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about-us">About us</Link>
                    </li>
                    {/* <li>
                      <Link to="/">Products</Link>
                    </li> */}
                    <li>
                      <Link to="/gallery">Gallery</Link>
                    </li>
                    <li>
                      <Link to="/blogs">Blogs</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact Us</Link>
                    </li>
                    {/* <li>
                      <Link to="/team-details/1">Volunteers</Link>
                    </li> */}
                  </ul>
                </div>
              </div>

              <div className="col-lg-2 col-md-6 item">
                <div className="footer-item recent-post">
                  <h4 className="widget-title">References</h4>
                  <ul>
                    <li>
                      <Link to="/privacy-policy"> Privacy Policy </Link>
                    </li>
                    <li>
                      <Link to="/disclaimer">Disclaimer</Link>
                    </li>
                    <li>
                      <Link to="/terms-conditions">Terms And Conditions</Link>
                    </li>
                    <li>
                      <Link to="/return-policy">Return Policy</Link>
                    </li>
                    <li>
                      <Link to="/shipping-policies">Shipping Policies</Link>
                    </li>

                    {/* <li>
                      <Link to="/team-details/1">Volunteers</Link>
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-6 item">
                <div className="footer-item recent-post">
                  <h4 className="widget-title">Our Products</h4>
                  <ul>
                    <li>
                      <Link to="/products/freeze-dried-mango">
                        {" "}
                        Freeze Dried{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/dried-mango-powder">
                        Freeze Dried Powder
                      </Link>
                    </li>
                    <li>
                      <Link to="/products/gir-cow-ghee">Ghee</Link>
                    </li>

                    {/* <li>
                      <Link to="/team-details/1">Volunteers</Link>
                    </li> */}
                  </ul>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 item">
                <div className="footer-item contact">
                  <h4 className="widget-title">Contact Info</h4>
                  <ul>
                    <li>
                      <div className="icon">
                        <i className="fas fa-envelope" />
                      </div>
                      <div className="content">
                        <strong>Email:</strong>
                        <a
                          href={
                            activePath === "/canada"
                              ? "mailto:svt5990@gmail.com"
                              : "mailto:dandsfarmerllp@gmail.com"
                          }
                        >
                          {activePath === "/canada"
                            ? "svt5990@gmail.com"
                            : "dandsfarmerllp@gmail.com"}
                        </a>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <i className="fas fa-phone" />
                      </div>
                      <div className="content">
                        <strong>Phone:</strong>
                        <a
                          href={
                            activePath === "/canada"
                              ? "tel:+1(416)-841-7610"
                              : "tel:9601182335"
                          }
                        >
                          {activePath === "/canada"
                            ? "+1(416)-841-7610"
                            : "+91 9601182335"}
                        </a>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <i className="fas fa-home" />
                      </div>
                      <div className="content">
                        <strong>Address:</strong>
                        <p>
                          Block No. 119, Near Main Canal Areth Bodhan Road,
                          Areth, Mandvi, Surat, Gujarat, India, 394170
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom py-3 border-t">
            <div className="container">
              <div className="row items-center">
                {/* Left side */}
                <div className="col-lg-6 text-center text-lg-start">
                  <p className="mb-0 text-sm">
                    &copy; {new Date().getFullYear()} All Rights Reserved by{" "}
                    <a
                      rel="noopener noreferrer"
                      className="font-semibold hover:underline"
                    >
                      Dhaduk And Sons Farmer LLP
                    </a>
                  </p>
                </div>

                {/* Right side */}
                {/* <div className="col-lg-6 text-center text-lg-end mt-2 mt-lg-0">
                  <p className="mb-0 flex justify-center justify-lg-end gap-4 text-sm">
                    <a
                      href="/privacy-policy"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Privacy Policy
                    </a>
                    <span className="opacity-50">|</span>
                    <a
                      href="/disclaimer"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Disclaimer
                    </a>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="shape-right-bottom">
          <img src={shape7} alt="Image Not Found" />
        </div>
      </footer>
    </>
  );
};

export default FooterV1;

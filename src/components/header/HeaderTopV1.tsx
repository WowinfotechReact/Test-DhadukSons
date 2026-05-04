import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HeaderTopV1 = () => {
  const [activePath, setActivePath] = useState('')
  const location = useLocation();

  useEffect(()=>{
    setActivePath(location.pathname);
  },[location.pathname])

  return (
    <>
      <div className="top-bar-area top-bar-style-one bg-dark text-light">
        <div className="container">
          <div className="row align-center">
            <div className="col-lg-8">
              <ul className="item-flex">
                <li>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=dandsfarmerllp@gmail.com"
                    target="_blank"
                  >
                    <i className="fas fa-envelope" />{activePath === '/canada'? 'svt5990@gmail.com':"dandsfarmerllp@gmail.com"}
                  </a>
                </li>
                <li>
                  <a href="tel:+919601182335">
                    <i className="fas fa-phone-alt" />{activePath === '/canada'? '+1(416)-841-7610':"+91 9601182335"} 
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 text-end">
              <div className="social">
                <ul>
                  <li>
                    <a
                      href="https://www.facebook.com/share/1EABACL58Y/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-facebook-f" />
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
                  <li>
                    <a
                      href="https://www.youtube.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-youtube" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderTopV1;

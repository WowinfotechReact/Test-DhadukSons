/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface DataType {
  toggleSubMenu?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  navbarPlacement?: string;
}

const MainMenu = ({ toggleSubMenu, navbarPlacement }: DataType) => {
  const Userlogin = localStorage.getItem("Userlogin");
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("Userlogin");
    navigate("/");
  };

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth <= 768 ? true : false); // mobile ≤768px
    };

    update(); // set on mount
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      <ul
        className={`nav navbar-nav ${navbarPlacement} navbar-right`}
        data-in="fadeInDown"
        data-out="fadeOutUp"
      >
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `dropdown-toggle ${isActive ? "active-nav" : ""}`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `dropdown-toggle ${isActive ? "active-nav" : ""}`
            }
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `dropdown-toggle ${isActive ? "active-nav" : ""}`
            }
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/combo-offer"
            className={({ isActive }) =>
              `dropdown-toggle ${isActive ? "active-nav" : ""}`
            }
          >
            Combo Offer
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `dropdown-toggle ${isActive ? "active-nav" : ""}`
            }
          >
            Gallery
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              `dropdown-toggle ${isActive ? "active-nav" : ""}`
            }
          >
            Blogs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `dropdown-toggle ${isActive ? "active-nav" : ""}`
            }
          >
            Contact Us
          </NavLink>
        </li>
        {isMobile && (
          <>
            <li>
              <NavLink
                to="/Customer-profile"
                className={({ isActive }) =>
                  `dropdown-toggle ${isActive ? "active-nav" : ""}`
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `dropdown-toggle ${isActive ? "active-nav" : ""}`
                }
              >
                My Orders
              </NavLink>
            </li>
          </>
        )}
        <li></li>
        {!Userlogin ? (
          <li className="login-mobile">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `dropdown-toggle ${isActive ? "active-nav" : ""} `
              }
            >
              Login
            </NavLink>
          </li>
        ) : (
          <span
            className="d-block d-lg-none" // 👈 Show only on small screens
            style={{
              color: "#232323",
              fontWeight: "600",
              textTransform: "capitalize",
              background: "transparent",
              padding: "13px 0",
            }}
            onClick={handleLogout}
          >
            logout
          </span>
        )}
      </ul>
    </>
  );
};

export default MainMenu;

import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaUser,
  FaImage,
  FaBlogger,
  FaTags,
  FaBox,
  FaEnvelope,
  FaTachometerAlt,
} from "react-icons/fa";
import "./Sidebar.css";

const menuItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
  { name: "Admin", icon: <FaUser />, path: "/admin/adminList" },
  { name: "Banners", icon: <FaImage />, path: "/admin/bannerList" },
  { name: "Gallery", icon: <FaImage />, path: "/admin/ImageList" },
  { name: "Blogs", icon: <FaBlogger />, path: "/admin/bloglist" },
  // {
  //   name: "Product Category",
  //   icon: <FaTags />,
  //   path: "/admin/product-category",
  // },
  { name: "Products", icon: <FaBox />, path: "/admin/product" },
  { name: "Product Units", icon: <FaBox />, path: "/admin/product-unit" },
  // { name: "Product Size", icon: <FaBox />, path: "/admin/product-size" },
  { name: "Orders", icon: <FaBox />, path: "/admin/order-list" },

  { name: "Enquiries", icon: <FaEnvelope />, path: "/admin/enquiry" },
];

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <button className="sb-mobile-toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <div className={`sb-sidebar ${isOpen ? "sb-expanded" : "sb-collapsed"}`}>
        <div className="sb-header">
          <h2 className="sb-logo">{isOpen ? "Dhaduk & Sons" : "DB"}</h2>
          <button className="sb-desktop-toggle-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className="sb-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="sb-menu-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "sb-menu-link sb-active" : "sb-menu-link"
                }
              >
                {item.icon}
                <span className="sb-menu-text">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

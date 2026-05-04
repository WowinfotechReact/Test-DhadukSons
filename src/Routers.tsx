import { Route, Routes } from "react-router-dom";
import Home1 from "./pages/homePages/Home1";
import Home2 from "./pages/homePages/Home2";
import Home3 from "./pages/homePages/Home3";
import Home4 from "./pages/homePages/Home4";

import Home5 from "./pages/homePages/Home5";

// Inner Pages
import AboutUsPage from "./pages/innerPages/AboutUsPage";
import FarmersPage from "./pages/innerPages/FarmersPage";
import ContactPage from "./pages/innerPages/ContactPage";
import RegisterPage from "./pages/innerPages/RegisterPage";
import LoginPage from "./pages/innerPages/LoginPage";
import FarmerDetailsPage from "./pages/innerPages/FarmerDetailsPage";

// Project Pages
import ProjectPage from "./pages/projectPages/ProjectPage";
import ProjectDetailsPage from "./pages/projectPages/ProjectDetailsPage";

// Services Pages
import ServicesPage from "./pages/servicesPages/ServicesPage";
import Service2Page from "./pages/servicesPages/Service2Page";
import ServiceDetailsPage from "./pages/servicesPages/ServiceDetailsPage";

// Blog Pages
import BlogStandardPage from "./pages/blogPages/BlogStandardPage";
import BlogWithSidebarPage from "./pages/blogPages/BlogWithSidebarPage";
import Blog2ColumnPage from "./pages/blogPages/Blog2ColumnPage";
import Blog3ColumnPage from "./pages/blogPages/Blog3ColumnPage";
import BlogSinglePage from "./pages/blogPages/BlogSinglePage";
import BlogSingleWithSidebarPage from "./pages/blogPages/BlogSingleWithSidebarPage";

// Shop Pages
import ShopPage from "./pages/shopPages/ShopPage";
import ShopSinglePage from "./pages/shopPages/ShopSinglePage";
import ShopSingleThumbPage from "./pages/shopPages/ShopSingleThumbPage";
import CartPage from "./pages/shopPages/CartPage";
import CheckoutPage from "./pages/shopPages/CheckoutPage";

import NotFoundPage from "./pages/innerPages/NotFoundPage";
import Dashboard from "./Admin/Dashboard/Dashboard";
import DashboardLayout from "./components/layouts/Dashboard";
import LoginPageAdmin from "./Admin/LoginAdmin/LoginPageAdmin";
import AdminList from "./Admin/AdminList/AdminList";
import BannerList from "./Admin/BannerList/BannerList";
import ImageList from "./Admin/ImageList/ImageList";
import AdminProfile from "./Admin/ProfilePage/Profile";
import BlogList from "./Admin/BlogList/BlogList";
import EnquiryList from "./Admin/EnquiryList/EnquiryList";
import ProductCategoryList from "./Admin/ProductCategoryList/ProductCategoryList";
import ProductList from "./Admin/ProductList/ProductList";
import ProductImageList from "./Admin/ProductList/Image/ImageList";
import ProductUnitList from "./Admin/ProductUnit/ProductUnitList";
import ProductSizeList from "./Admin/ProductSize/ProductSizeList";
import OrderList from "./Admin/Order/OrderList";
import WishListPage from "./pages/shopPages/WishListPage";
import BlogWithSidebarContent from "./components/blog/BlogWithSidebarContent";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import OrderDetailsSingle from "./pages/OrderDetailsSingle/OrderDetailsSingle";
import PrivacyPolicyPage from "./pages/innerPages/PrivacyPolicyPage";
import DisclaimerPage from "./pages/innerPages/DisclaimerPage";
import TermsAndConditionsPage from "./pages/innerPages/TermsAndConditionsPage";
import ReturnRefundPolicyPage from "./pages/innerPages/ReturnAndRefundPage";
import ShippingPolicyPage from "./pages/innerPages/ShippingPolicyPage";
import ComboOfferPage from "./components/ComboOffer/ComboOfferPage";

const Routers = () => {
  const adminUser = localStorage.getItem("authUser");
  return (
    <>
      <Routes>
        <Route path="/admin/login" element={<LoginPageAdmin />} />{" "}
        <Route path="/admin" element={<LoginPageAdmin />} />{" "}
        {/* /Admin Login */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} /> {/* /dashboard */}
          <Route path="adminList" element={<AdminList />} />
          <Route path="bannerList" element={<BannerList />} />
          <Route path="ImageList" element={<ImageList />} />
          <Route path="bloglist" element={<BlogList />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="product-category" element={<ProductCategoryList />} />
          <Route path="product" element={<ProductList />} />
          <Route path="product-unit" element={<ProductUnitList />} />
          <Route path="product-size" element={<ProductSizeList />} />
          <Route path="order-list" element={<OrderList />} />
          <Route path="product-image" element={<ProductImageList />} />
          <Route path="enquiry" element={<EnquiryList />} />
        </Route>
        <Route path="/" element={<Home1 />}></Route>
        <Route path="/canada" element={<Home2 />}></Route>
        <Route path="/UAE" element={<Home3 />}></Route>
        <Route path="/US" element={<Home4 />}></Route>
        <Route path="/UK" element={<Home5 />}></Route>
        {/* Inner Pages */}
        <Route path="/about-us" element={<AboutUsPage />}></Route>
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />}></Route>
        <Route path="/disclaimer" element={<DisclaimerPage />}></Route>
        <Route
          path="/terms-conditions"
          element={<TermsAndConditionsPage />}
        ></Route>
        <Route
          path="/shipping-policies"
          element={<ShippingPolicyPage />}
        ></Route>
        <Route
          path="/return-policy"
          element={<ReturnRefundPolicyPage />}
        ></Route>
        <Route path="/farmers" element={<FarmersPage />}></Route>
        <Route
          path="/farmer-details/:id"
          element={<FarmerDetailsPage />}
        ></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/gallery" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        {/* Project Pages */}
        <Route path="/project" element={<ProjectPage />}></Route>
        <Route
          path="/project-details/:id"
          element={<ProjectDetailsPage />}
        ></Route>
        {/* Services Page */}
        <Route path="/services" element={<ServicesPage />}></Route>
        <Route path="/Customer-profile" element={<Service2Page />}></Route>
        <Route
          path="/service-details/:id"
          element={<ServiceDetailsPage />}
        ></Route>
        {/* Blog Pages */}
        <Route path="/blog-standard" element={<BlogStandardPage />}></Route>
        <Route
          path="/blog-standard?:page?"
          element={<BlogStandardPage />}
        ></Route>
        <Route
          path="/blog-with-sidebar"
          element={<BlogWithSidebarPage />}
        ></Route>
        <Route
          path="/blog-with-sidebar?:page?"
          element={<BlogWithSidebarPage />}
        ></Route>
        <Route path="/blog-2-column" element={<Blog2ColumnPage />}></Route>
        <Route
          path="/blog-2-column?:page?"
          element={<Blog2ColumnPage />}
        ></Route>
        <Route path="/blogs" element={<Blog3ColumnPage />}></Route>
        <Route path="/blogs?:page?" element={<Blog3ColumnPage />}></Route>
        <Route path="/blog-single/:id" element={<BlogSinglePage />}></Route>
        {/* <Route
          path="/detailed-blog/:id"
          element={<BlogSingleWithSidebarPage />}
        ></Route> */}
        <Route path="/blog/:id" element={<BlogSingleWithSidebarPage />}></Route>
        {/* Shop Page */}
        <Route path="/products" element={<ShopPage />}></Route>
        <Route path="/orders" element={<OrderHistory />}></Route>
        <Route path="/order-details" element={<OrderDetailsSingle />}></Route>
        <Route path="/wishlist" element={<WishListPage />}></Route>
        <Route path="/products?:page?" element={<ShopPage />}></Route>
        <Route path="/products/:id" element={<ShopSinglePage />}></Route>
        <Route
          path="/shop-single-thumb/:id"
          element={<ShopSingleThumbPage />}
        ></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/combo-offer" element={<ComboOfferPage />}></Route>
        <Route path="/checkout" element={<CheckoutPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
};

export default Routers;

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState, useRef } from "react";
import {
  deleteCartProduct,
  getCartDetails,
} from "../../APIServices/AddToCart/AddToCartApi";
import { useAuth } from "../../Context/Context";
import { getWishlistCount } from "../../services/ProductService";
import { Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

// interface CartItem {
//   cartKeyID: string;
//   userKeyID: string;
//   ProductKeyID: string;
//   productTitle: string;
//   productSizeKeyID: string;
//   productSize: string;
//   productUnitKeyID: string;
//   productUnitName: string;
//   productPrice: string;
//   productDiscount: string;
//   quantity: number;
//   totalPrice: string;
//   totalDiscount: string;
//   finalPrice: string;
//   productImage?: string;
// }

const HeaderCart = () => {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0); // wishlist counter
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("Userlogin")
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const {
    isAddUpdateCartDone,
    setIsAddUpdateCartDone,
    cartItems,
    setCartItems,
    geoLocation,
  } = useAuth();
  const dropdownRef = useRef<HTMLLIElement | null>(null);

  const storedUser = localStorage.getItem("Userlogin");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userKeyID = parsedUser?.responseData?.data?.userKeyID;
  const Userlogin = localStorage.getItem("Userlogin");

  // Fetch cart
  const fetchCart = async () => {
    if (!userKeyID) return;
    try {
      const res = await getCartDetails(userKeyID);
      if (res?.statusCode === 200 && res.responseData?.data?.cartItems) {
        const { cartItems, cartSummary } = res.responseData.data;
        setCartItems(cartItems);
        setCartCount(cartItems.length);
        setTotalAmount(
          geoLocation?.currency_code === "INR"
            ? parseFloat(cartSummary?.finalPayableAmount || "0")
            : parseFloat(cartSummary?.finalPayableAmountUSD || "0")
        );
        localStorage.setItem("cartCount", cartItems.length.toString());
      } else {
        setCartItems([]);
        setCartCount(0);
        setTotalAmount(0);
        localStorage.setItem("cartCount", "0");
      }
    } catch {
      toast.error("Failed to fetch cart");
    }
  };

  // Fetch wishlist count
  const fetchWishlist = async () => {
    if (!userKeyID) return;
    try {
      const count = await getWishlistCount(userKeyID);
      setWishlistCount(Number(count) || 0);
    } catch (error) {
      console.error("Failed to fetch wishlist count", error);
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchWishlist();

    // Refresh when storage changes
    const handleStorageChange = () => {
      fetchCart();
      fetchWishlist();
    };
    window.addEventListener("storage", handleStorageChange);

    // If cart/wishlist was updated via context
    if (isAddUpdateCartDone) {
      fetchWishlist();
      setIsAddUpdateCartDone(false); // reset the flag
    }

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [isAddUpdateCartDone]);

  // Delete cart item
  const handleRemove = async (cartKeyID: string) => {
    try {
      const res = await deleteCartProduct(cartKeyID);
      if (res?.statusCode === 200) {
        toast.success("Product removed");
        fetchCart();
      } else {
        toast.error("Failed to remove product");
      }
    } catch {
      toast.error("Error removing product");
    }
  };

  // Logout handlers
  const confirmLogout = () => setShowLogoutModal(true);
  const handleLogout = () => {
    localStorage.removeItem("Userlogin");
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    toast.success("Logged out successfully");
    navigate("/login");
  };
  const cancelLogout = () => setShowLogoutModal(false);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="attr-right ">
      <div className="attr-nav">
        <ul>
          {Userlogin && (
            <>
              {/* WISHLIST */}
              <li className="dropdown mobile-header-cart">
                <Link to="/wishlist" className="dropdown-toggle">
                  <i className="far fa-heart" />
                  <span className="badge">{wishlistCount}</span>
                </Link>
              </li>

              {/* CART */}
              <li className="dropdown">
                <Link to="#" className="dropdown-toggle">
                  <i className="far fa-shopping-cart" />
                  <span className="badge">{cartCount}</span>
                </Link>

                <ul className="dropdown-menu cart-list">
                  {cartItems.length > 0 ? (
                    <>
                      <ul>
                        {cartItems.map((item) => (
                          <li key={item.cartKeyID} className="cart-item">
                            <div className="thumb">
                              <span className="photo">
                                <img
                                  src={
                                    item.productImage ||
                                    `/assets/img/products/default.jpg`
                                  }
                                  alt={item.productTitle}
                                />
                              </span>
                            </div>

                            <div className="info">
                              <h6>
                                {item.productTitle}-{item.productSize}{" "}
                                {item.productUnitName}
                              </h6>
                              <p>
                                {item.quantity}x -{" "}
                                <span className="price">
                                  {geoLocation?.currency_code === "INR"
                                    ? `₹${item.finalPrice}`
                                    : `$${item.finalPriceUSD}`}
                                </span>
                              </p>
                            </div>

                            <Link
                              to="#"
                              className="remove-product"
                              onClick={() => handleRemove(item.cartKeyID)}
                            >
                              <i className="fas fa-times" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <li className="total">
                        <span className="pull-right">
                          <strong>Total</strong>:{" "}
                          {geoLocation?.currency_code === "INR" ? `₹` : "$"}
                          {totalAmount.toFixed(2)}
                        </span>
                        <Link to="/cart" className="btn btn-default btn-cart">
                          Cart
                        </Link>
                        <Link
                          to="/checkout"
                          className="btn btn-default btn-cart"
                        >
                          Checkout
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li className="total">
                      <p>Your cart is empty.</p>
                    </li>
                  )}
                </ul>
              </li>
            </>
          )}

          {/* LOGIN / PROFILE DROPDOWN */}
          {/* <li className="button user-menu" ref={dropdownRef}>
            {isLoggedIn ? (
              <div className="dropdown">
                <button
                  className="dropdown-toggle"
                  onClick={toggleDropdown}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className="fas fa-user-circle"
                    style={{ fontSize: "1.8rem" }}
                  />
                </button>

                {dropdownOpen && (
                  <ul
                    className="dropdown-menu cart-list"
                    style={{
                      display: "block",
                      position: "absolute",
                      right: 0,
                      background: "#fff",
                      boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                      padding: "10px",
                      listStyle: "none",
                      zIndex: 999,
                    }}
                  >
                    <li>
                      <button
                        onClick={() => navigate("/Customer-profile")}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          gap: "5px",
                        }}
                      >
                        <i className="fas fa-user" /> Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={confirmLogout}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          gap: "5px",
                        }}
                      >
                        <i className="fas fa-sign-out-alt" /> Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link to="/login">
                <i className="fas fa-user" /> Login
              </Link>
            )}
          </li> */}

          {Userlogin ? (
            <div className="mobile-header-cart" style={{ marginLeft: "25px" }}>
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="span"
                  id="dropdown-basic"
                  style={{ cursor: "pointer", color: "black" }}
                >
                  <FaUserCircle size={32} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate("/Customer-profile")}>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/orders")}>
                    My Orders
                  </Dropdown.Item>
                  <Dropdown.Item onClick={confirmLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <button
              className="mobile-header-cart"
              style={{
                padding: "10px 30px",
                marginLeft: "20px",

                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <Link to="/login" className="hover-operate">
                <i className="fas fa-user" /> Login
              </Link>
            </button>
          )}
        </ul>
      </div>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cancelLogout}
                ></button>
              </div>
              <div className="modal-body">Are you sure you want to logout?</div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cancelLogout}>
                  No
                </button>
                <button className="btn btn-primary" onClick={handleLogout}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderCart;

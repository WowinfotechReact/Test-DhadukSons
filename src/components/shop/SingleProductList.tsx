import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { toast } from "react-toastify";
import { RootState } from "../../store/store";
import { Product } from "../../services/ProductService";
import { addToWishListApi } from "../../services/WishListService";
import { useAuth } from "../../Context/Context";

const SingleProductList = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  // Get first size option for price calculation
  const { setIsAddUpdateCartDone } = useAuth();
  const firstSize = product.productSizes?.[0];
  const price = firstSize ? parseFloat(firstSize.productPrice) : 0;
  const discount = firstSize ? parseFloat(firstSize.productDiscount) : 0;
  const finalPrice = price - discount;
  const storedUser = localStorage.getItem("Userlogin");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userKeyID = parsedUser?.responseData?.data?.userKeyID;
  const handleAddToCart = () => {
    const alreadyInCart = cartItems.some(
      (item) => item.id === product.productID
    );

    if (alreadyInCart) {
      toast.warning("Product already in cart");
    } else {
      dispatch(
        addToCart({
          id: product.productID,
          title: product.productTitle,
          price: finalPrice,
          thumb: product.imageUrl ?? "",
          quantity: 1,
        })
      );
      toast.success("Product added successfully");
    }
  };
  const handleAddToWishList = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await addToWishListApi(product.productKeyID, userKeyID);
      if (response.statusCode === 200) {
        setIsAddUpdateCartDone(true);
        toast.success(response.message || "Added to wishlist successfully");
      } else {
        toast.error(response.message || "Failed to add to wishlist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while adding to wishlist");
    }
  };
  return (
    <div className="product">
      <div className="product-contents">
        <div className="row align-center">
          <div className="col-lg-5 col-md-5">
            <div className="product-image">
              {discount > 0 && <span className="onsale">Sale!</span>}
              <Link to={`/products/${product.productKeyID}`}>
                <img
                  src={
                    product.imageUrl
                      ? product.imageUrl
                      : "/assets/img/products/default.png"
                  }
                  alt={product.productTitle}
                />
              </Link>
              <div className="shop-action">
                <ul>
                  <li className="cart">
                    <Link to="#" onClick={handleAddToCart}>
                      <span>Add to cart</span>
                    </Link>
                  </li>
                  <li className="wishlist">
                    <Link to="#" onClick={handleAddToWishList}>
                      <span>Add to wishlist</span>
                    </Link>
                  </li>
                  {/* <li className="quick-view">
                                        <Link to="#"><span>Quick view</span></Link>
                                    </li> */}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-md-7">
            <div className="product-caption">
              {/* You can add product category/tags from API here if available */}
              <h4 className="product-title">
                <Link to={`/products/${product.productKeyID}`}>
                  {product.productTitle}
                </Link>
              </h4>
              <p>{product.productDescription}</p>
              <div className="price">
                {discount > 0 && (
                  <span className="me-1">
                    <del>₹{price.toFixed(2)}</del>
                  </span>
                )}
                <span>₹{finalPrice.toFixed(2)}</span>
              </div>
              <Link to="#" className="cart-btn" onClick={handleAddToCart}>
                <i className="fas fa-shopping-bag" /> Add to cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductList;

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../store/store";
import { addToCart } from "../../store/slices/cartSlice";
import {
  GetProductDetailsForWeb,
  Product,
  productSize,
  productSizeHome,
} from "../../services/ProductService";
import { addToWishListApi } from "../../services/WishListService"; // ✅ your wishlist API service
import { useAuth } from "../../Context/Context";
import { useEffect, useState } from "react";
import { addToCartApi } from "../../APIServices/AddToCart/AddToCartApi";

const SingleProductCategoryV2 = ({
  productSize,
}: {
  productSize: productSizeHome;
}) => {
  const dispatch = useDispatch();
  if (!productSize) return null; // or a loader/fallback UI
  if (!productSize.productKeyID) return null; // optional
  // const cartItems = useSelector((state: RootState) => state.cart.items);
  const { setIsAddUpdateCartDone } = useAuth();
  const storedUser = localStorage.getItem("Userlogin");
  const { geoLocation } = useAuth();
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userKeyID = parsedUser?.responseData?.data?.userKeyID;
  // first size (price + discount)
  // const firstSize = productSize;
  const [productInfo, setProductInfo] = useState({});
  const price = productSize
    ? parseFloat(
        geoLocation?.currency_code === "INR"
          ? productSize.productPrice
          : productSize.productPriceUSD
      )
    : undefined;
  // const priceUSD = productSize
  //   ? parseFloat(productSize.productPriceUSD)
  //   : undefined;
  const [loading, setLoading] = useState(true);
  const discount = productSize
    ? parseFloat(
        geoLocation?.currency_code === "INR"
          ? productSize.productDiscount
          : productSize.productDiscountUSD
      )
    : 0;
  const navigate = useNavigate();

  const finalPrice =
    price !== undefined && discount !== undefined
      ? price - price * (discount / 100)
      : undefined;

  console.log("productSize", productSize);

  // const finalPriceUSD =
  //   priceUSD !== undefined && discountUSD !== undefined
  //     ? priceUSD - priceUSD * (discountUSD / 100)
  //     : undefined;

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       if (!id) return;
  //       try {
  //         setLoading(true);
  //         const res = await GetProductDetailsForWeb(id);
  //         if ("responseData" in res) {
  //           setProductInfo(res.responseData);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching product details", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchData();
  //   }, [id]);

  const imageSrc = productSize?.imageUrl ?? "/assets/img/products/default.png";

  // ✅ Add to cart
  //   const handleAddToCart = (e: React.MouseEvent) => {
  //     e.preventDefault();

  //     debugger;

  //     if (!storedUser) {
  //       toast.warning("Please login to proceed");
  //       return;
  //     }

  //     const alreadyInCart = cartItems.some(
  //       (item) => item.id === product.productID
  //     );

  //     if (alreadyInCart) {
  //       toast.warning("Product already in cart");
  //     } else if (finalPrice !== undefined) {
  //       dispatch(
  //         addToCart({
  //           id: product.productID,
  //           title: product.productTitle,
  //           price: finalPrice,
  //           thumb: imageSrc,
  //           quantity: 1,
  //         })
  //       );
  //       toast.success("Product added successfully");
  //     } else {
  //       toast.error("Price information unavailable for this product");
  //     }
  //   };

  const handleAddToCart = async (sizeKeyID: string, qty: number) => {
    if (qty < 1) {
      toast.warning("Please enter a valid quantity");
      return;
    }

    if (!userKeyID) {
      toast.error("Please log in to add items to your cart");
      navigate("/login");
      return;
    }

    if (!sizeKeyID) {
      toast.error("Invalid product size");
      return;
    }

    try {
      const payload = {
        cartKeyID: null,
        userKeyID,
        productKeyID: productSize.productKeyID,
        productSizeKeyID: sizeKeyID,
        quantity: qty,
      };

      const res = await addToCartApi(payload);

      if (res?.statusCode === 200) {
        // const selectedSize = productSize.ProductSizeKeyID;
        // const selectedSize = productSize?.find(
        //   (s) => s.ProductSizeKeyID === sizeKeyID
        // );

        const originalPrice = parseFloat(productSize?.productPrice || "0");
        const discount = parseFloat(productSize?.productDiscount || "0");
        const discountedPrice =
          originalPrice - (originalPrice * discount) / 100;

        // dispatch(
        //   addToCart({
        //     id: Number(productInfo.data.productKeyID),
        //     title: productInfo.data.productTitle,
        //     price: discountedPrice,
        //     thumb:
        //       productInfo.data.imageUrl || "/assets/img/products/default.png",
        //     quantity: qty,
        //   })
        // );
        setIsAddUpdateCartDone(true);
        toast.success("Product added to cart");
      } else {
        toast.error(res?.message || "Failed to add product to cart");
      }
    } catch (err) {
      console.error("Add to cart error", err);
      toast.error("Something went wrong");
    }
  };

  // ✅ Add to wishlist
  const handleAddToWishList = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!storedUser) {
      toast.warning("Please login to proceed");
      return;
    }

    try {
      const response = await addToWishListApi(
        productSize.productKeyID,
        userKeyID
      );
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

  //   console.log("product", product);

  return (
    <div className="product">
      <div className="product-contents">
        <div className="product-image">
          {discount > 0 && <span className="onsale">Sale!</span>}
          <Link to={`/products/${productSize.slug}`}>
            <img src={imageSrc} alt={productSize.productTitle} />
          </Link>
          <div className="shop-action">
            <ul>
              <li className="cart">
                <Link
                  to="#"
                  onClick={() =>
                    handleAddToCart(productSize.productSizeKeyID, 1)
                  }
                >
                  <span>Add to cart</span>
                </Link>
              </li>
              <li className="wishlist">
                <Link to="#" onClick={handleAddToWishList}>
                  <span>Add to wishlist</span>
                </Link>
              </li>
              <li className="quick-view">
                <Link to="#">
                  <span>Quick view</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="product-caption">
          <h4 className="product-title">
            <Link to={`/products/${productSize.slug}`}>
              {productSize.productTitle}
              {/* {productSize.productTitle.length > 20
                ? productSize.productTitle.substring(0, 20) + "..."
                : productSize.productTitle} */}
            </Link>
          </h4>
          <h6>
            {productSize.productSize} {productSize.productUnitName}
          </h6>
          {finalPrice !== undefined && (
            <div className="price">
              {discount > 0 && (
                <span className="me-1">
                  <del>
                    {geoLocation?.currency_code === "INR" ? "₹" : "$"}
                    {price?.toFixed(2)}
                  </del>
                </span>
              )}
              <span>
                {geoLocation?.currency_code === "INR" ? "₹" : "$"}
                {finalPrice.toFixed(2)}
              </span>
            </div>
          )}

          <Link to={`/products/${productSize.slug}`} className="cart-btn">
            <i className="fas fa-eye"></i> View Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCategoryV2;

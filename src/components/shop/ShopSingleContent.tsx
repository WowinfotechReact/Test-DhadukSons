import ShopSingleTab from "./ShopSingleTab";
import { Link, useNavigate } from "react-router-dom";
import RatingsStar from "../utilities/RatingsStar";
import ProductCarousel from "../products/ProductCarousel";
import RelatedProducts from "../products/RelatedProducts";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { Product } from "../../services/ProductService";
import { addToCartApi } from "../../APIServices/AddToCart/AddToCartApi";
import { addToCart } from "../../store/slices/cartSlice";
import { useAuth } from "../../Context/Context";
import { Helmet } from "react-helmet-async";

interface ProductResponse {
  data: Product;
}

const ShopSingleContent = ({
  productInfo,
  productID,
}: {
  productInfo: ProductResponse;
  productID: any;
}) => {
  const dispatch = useDispatch();
  const { setIsAddUpdateCartDone, cartItems, geoLocation } = useAuth();

  const storedUser = localStorage.getItem("Userlogin");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userKeyID = parsedUser?.responseData?.data?.userKeyID;

  const navigate = useNavigate();

  // Function to handle Add to Cart for a specific size
  const handleAddToCart = async (sizeKeyID: string, qty: number) => {
    // debugger;
    if (qty < 1) {
      toast.warning("Please enter a valid quantity");
      return;
    }

    if (!userKeyID) {
      toast.error("Please log in to add items to your cart");
      // navigate("/login");
      navigate("/login", { state: { from: location.pathname } });
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
        productKeyID: productInfo.data.productKeyID,
        productSizeKeyID: sizeKeyID,
        quantity: qty,
      };

      const res = await addToCartApi(payload);

      if (res?.statusCode === 200) {
        const selectedSize = productInfo.data.productSizes?.find(
          (s) => s.ProductSizeKeyID === sizeKeyID,
        );

        const originalPrice = parseFloat(selectedSize?.productPrice || "0");
        const discount = parseFloat(selectedSize?.productDiscount || "0");
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
        // toast.success("Product added to cart");
      } else {
        toast.error(res?.message || "Failed to add product to cart");
      }
    } catch (err) {
      console.error("Add to cart error", err);
      toast.error("Something went wrong");
    }
  };
  console.log("Product Info in ShopSingleContent:", productID);
  return (
    <div className="validtheme-shop-single-area default-padding">
      {productID === "gir-cow-ghee" ? (
        <Helmet>
          {/* Basic Meta Tags */}
          <title>Pure A2 Gir Cow Ghee in India | Dhaduk & Sons</title>
          <meta
            name="description"
            content="Dhaduk & Sons offers Pure A2 Gir Cow Ghee in India, made from Gir cow milk using the traditional bilona method. Order premium desi ghee today."
          />
          <link
            rel="canonical"
            href="https://www.dhadukandsonsfpc.com/products/gir-cow-ghee"
          />

          {/* Open Graph Meta Tags */}
          <meta property="og:title" content="Buy Organic A2 Gir Cow Ghee | Premium Bilona Method Ghee at Best Price" />
          <meta property="og:site_name" content="Dhaduk and Sons" />
          <meta property="og:url" content="https://www.dhadukandsonsfpc.com/products/gir-cow-ghee" />
          <meta property="og:description" content="Dhaduk and Sons offers premium Organic A2 Gir Cow Ghee made using the Bilona method. Pure, natural, and rich in nutrients. Buy online today." />
          <meta property="og:type" content="product" />
          <meta property="og:image" content="https://api.dhadhuksons.wowinfosolutions.com/uploads/product-images/1a923517-7a7e-11f0-a465-bc2411520d0d_1759558378789.jpeg" />


          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Buy Organic A2 Gir Cow Ghee | Premium Bilona Method Ghee at Best Price" />
          <meta name="twitter:description" content="Dhaduk and Sons offers premium USDA Organic freeze dried Kesar mango powder in India, made from natural ingredients for rich taste and nutrition. Shop now!" />
          <meta name="twitter:image" content="https://api.dhadhuksons.wowinfosolutions.com/uploads/product-images/1a923517-7a7e-11f0-a465-bc2411520d0d_1759558378789.jpeg" />

          {/* Product Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: "Buy Organic A2 Gir Cow Ghee | Premium Bilona Method Ghee at Best Price",
              image: "https://api.dhadhuksons.wowinfosolutions.com/uploads/product-images/1a923517-7a7e-11f0-a465-bc2411520d0d_1759558378789.jpeg",
              description: "Dhaduk and Sons offers premium Organic A2 Gir Cow Ghee made using the Bilona method. Pure, natural, and rich in nutrients. Buy online today.",
              brand: {
                "@type": "Brand",
                "name": "Dhaduk and Sons"
              },
              aggregateRating: {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "0",
                "ratingCount": "112"
              }

            })}
          </script>
          {/* Product Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "http://schema.org",
              "@type": "WebPage",
              name: "Buy Organic A2 Gir Cow Ghee | Premium Bilona Method Ghee at Best Price",
              url: "https://www.dhadukandsonsfpc.com/products/gir-cow-ghee",
              description: "Dhaduk and Sons offers premium Organic A2 Gir Cow Ghee made using the Bilona method. Pure, natural, and rich in nutrients. Buy online today",
              publisher: {
                "@type": "Organization",
                name: "Dhaduk and Sons"
              }


            })}
          </script>

          {/* Breadcrumb Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.dhadukandsonsfpc.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Products",
                  item: "https://www.dhadukandsonsfpc.com/products",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Gir Cow Ghee",
                  item: "https://www.dhadukandsonsfpc.com/products/gir-cow-ghee",
                },
              ],
            })}
          </script>

          {/* FAQ Schema */}
          <script type="application/ld+json">
            {JSON.stringify({

              "@context": "https://schema.org",
              "@type": "FAQPage",
              "@id": "https://www.dhadukandsonsfpc.com/blog/7-things-to-check-before-buying-a2-gir-cow-ghee#faq",
              inLanguage: "en-IN",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is A2 Gir Cow Ghee?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A2 Gir Cow Ghee is made from milk of Gir cows containing A2 protein, which is easier to digest and rich in nutrients."
                  }
                },
                {
                  "@type": "Question",
                  name: "What is Bilona Cow Ghee?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Bilona Cow Ghee is prepared using the traditional Bilona method, ensuring authentic taste, aroma, and nutritional value."
                  }
                },
                {
                  "@type": "Question",
                  name: "How can I use A2 Gir Cow Ghee?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "It can be used for cooking, frying, baking, or consumed daily as a healthy supplement."
                  }
                },
                {
                  "@type": "Question",
                  name: "Is A2 Gir Cow Ghee good for digestion?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, it supports better digestion and nutrient absorption."
                  }
                },
                {
                  "@type": "Question",
                  name: "Can kids consume this ghee?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, it is healthy for both kids and adults, providing essential vitamins and healthy fats."
                  }
                }
              ]

            })}
          </script>
        </Helmet>
      ) : productID === "freeze-dried-mango-slices" ? (
        <Helmet>
          {/* Basic Meta Tags */}
          <title>Organic Freeze Dried Mango Slices in India | Dhaduk and Sons</title>
          <meta
            name="description"
            content="Dhaduk and Sons offers Organic Freeze Dried Mango Slices in India made from premium mangoes for healthy snacking. Order now for natural taste."
          />
         <link rel="canonical" href="https://www.dhadukandsonsfpc.com/products/freeze-dried-mango-slices" />

          <meta property="og:title" content="Natural Dried Mango Slices – Order Healthy Snacks Online" />
          <meta property="og:site_name" content="Dhaduk and Sons" />
          <meta property="og:url" content="https://www.dhadukandsonsfpc.com/products/freeze-dried-mango-slices" />
          <meta property="og:description" content="Dhaduk and Sons offers premium dried mango slices made from real mangoes, naturally processed for great taste and nutrition. Buy online today!" />
          <meta property="og:type" content="product" />
          <meta property="og:image" content="https://api.dhadhuksons.wowinfosolutions.com/uploads/product-images/eb9ce5bf-818e-11f0-a465-bc2411520d0d_1771491919743.jpeg" />


          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Natural Dried Mango Slices – Order Healthy Snacks Online" />
          <meta name="twitter:description" content="Dhaduk and Sons offers premium dried mango slices made from real mangoes, naturally processed for great taste and nutrition. Buy online today!" />
          <meta name="twitter:image" content="https://api.dhadhuksons.wowinfosolutions.com/uploads/product-images/eb9ce5bf-818e-11f0-a465-bc2411520d0d_1771491919743.jpeg" />


          {/* WebPage Schema */}
          <script type="application/ld+json">
            {JSON.stringify({

              "@context": "http://schema.org",
              "@type": "WebPage",
              name: "Natural Dried Mango Slices – Order Healthy Snacks Online",
              url: "https://www.dhadukandsonsfpc.com/products/freeze-dried-mango-slices",
              description: "Dhaduk and Sons offers premium dried mango slices made from real mangoes, naturally processed for great taste and nutrition. Buy online today!",
              publisher: {
                "@type": "Organization",
                name: "Dhaduk and Sons"
              }

            })}
          </script>

          {/* FAQ Schema */}
          <script type="application/ld+json">
            {JSON.stringify({

              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [{
                "@type": "Question",
                name: "1. Are freeze-dried mangoes healthy?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Freeze-dried mango keeps most of the fruit’s natural vitamins, fibre, and antioxidants without added sugar or preservatives."
                }
              }, {
                "@type": "Question",
                name: "2. Is freeze-dried mango better than fresh mango?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Freeze-dried mango offers similar nutrition to fresh mango but lasts longer and is easier to carry and store."
                }
              }, {
                "@type": "Question",
                name: "3. Does freeze-dried mango contain added sugar?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Pure freeze-dried mango is naturally sweet and contains no added sugar."
                }
              }, {
                "@type": "Question",
                name: "4. Can kids eat freeze-dried mango?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. It is a safe, natural, and healthy snack for kids when made from mango."
                }
              }]

            })}
          </script>

          {/* FAQ Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: "Natural Dried Mango Slices – Order Healthy Snacks Online",
              image: "https://api.dhadhuksons.wowinfosolutions.com/uploads/product-images/eb9ce5bf-818e-11f0-a465-bc2411520d0d_1771491919743.jpeg",
              description: "Dhaduk and Sons offers premium dried mango slices made from real mangoes, naturally processed for great taste and nutrition. Buy online today!",
              brand: {
                "@type": "Brand",
                name: "Dhaduk and Sons"
              },
              aggregateRating: {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "0",
                "ratingCount": "106"
              }

            })}
          </script>
        </Helmet>
      ) : productID === "freeze-dried-mango-powder" ? (
        <Helmet>
          {/* Basic Meta Tags */}
          <title>Buy USDA Organic freeze dried Kesar Mango Powder in India</title>
          <meta
            name="description"
            content="Dhaduk and Sons offers premium USDA Organic freeze dried Kesar mango powder in India, made from natural ingredients for rich taste and nutrition. Shop now!"
          />
          <link
            rel="canonical"
            href="https://www.dhadukandsonsfpc.com/products/freeze-dried-mango-slices-powder"
          />

          {/* Open Graph Meta Tags */}
          <meta property="og:title" content="Buy USDA Organic freeze dried Kesar Mango Powder in India" />
          <meta property="og:site_name" content="Dhaduk and Sons" />
          <meta property="og:url" content="https://www.dhadukandsonsfpc.com/products/freeze-dried-mango-slices-powder" />
          <meta property="og:description" content="Dhaduk and Sons offers premium USDA Organic freeze dried Kesar mango powder in India, made from natural ingredients for rich taste and nutrition. Shop now!" />
          <meta property="og:type" content="product" />
          <meta property="og:image" content="https://api.dhadhuksons.wowinfosolutions.com/uploads/product-images/fc0dce60-7a7f-11f0-a465-bc2411520d0d_1771493066237.jpeg" />


          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Buy USDA Organic freeze dried Kesar Mango Powder in India" />
          <meta name="twitter:description" content="Dhaduk and Sons offers premium USDA Organic freeze dried Kesar mango powder in India, made from natural ingredients for rich taste and nutrition. Shop now!" />
          <meta name="twitter:image" content="https://api.dhadhuksons.wowinfosolutions.com/uploads/product-images/fc0dce60-7a7f-11f0-a465-bc2411520d0d_1771493066237.jpeg" />


          {/* WebPage Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "http://schema.org",
              "@type": "WebPage",
              name: "Buy USDA Organic freeze dried Kesar Mango Powder in India",
              url: "https://www.dhadukandsonsfpc.com/products/freeze-dried-mango-slices-powder",
              description: "Dhaduk and Sons offers premium USDA Organic freeze dried Kesar mango powder in India, made from natural ingredients for rich taste and nutrition. Shop now!",
              publisher: {
                "@type": "Organization",
                name: "Dhaduk and Sons"
              }

            })}
          </script>

          {/* Product Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: "Buy USDA Organic freeze dried Kesar Mango Powder in India",
              image: "https://api.dhadhuksons.wowinfosolutions.com/uploads/product-images/fc0dce60-7a7f-11f0-a465-bc2411520d0d_1771493066237.jpeg",
              description: "Dhaduk and Sons offers premium USDA Organic freeze dried Kesar mango powder in India, made from natural ingredients for rich taste and nutrition. Shop now!",
              brand: {
                "@type": "Brand",
                name: "Dhaduk and Sons"
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                bestRating: "5",
                worstRating: "0",
                ratingCount: "132"
              }


            })}
          </script>

          {/* Breadcrumb Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "BreadcrumbList",
              itemListElement: [{
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.dhadukandsonsfpc.com/"
              }, {
                "@type": "ListItem",
                position: 2,
                name: "Products",
                item: "https://www.dhadukandsonsfpc.com/products"
              }, {
                "@type": "ListItem",
                position: 3,
                name: "USDA Organic Kesar Mango Powder",
                item: "https://www.dhadukandsonsfpc.com/products/freeze-dried-mango-slices-powder"
              }]

            })}
          </script>

          {/* FAQ Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Are freeze-dried mangoes healthy?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Freeze-dried mango keeps most of the fruit’s natural vitamins, fibre, and antioxidants without added sugar or preservatives.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is freeze-dried mango better than fresh mango?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Freeze-dried mango offers similar nutrition to fresh mango but lasts longer and is easier to carry and store.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does freeze-dried mango contain added sugar?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Pure freeze-dried mango is naturally sweet and contains no added sugar.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can kids eat freeze-dried mango?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. It is a safe, natural, and healthy snack for kids when made from mango.",
                  },
                },
              ],
            })}
          </script>
        </Helmet>
      ) : (
        ""
      )}
      <div className="container">
        <div className="product-details">
          <div className="row">
            {/* Product Images */}
            <div className="col-lg-6">
              <div className="product-thumb">
                <div
                  id="timeline-carousel"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <ProductCarousel productInfo={productInfo.data} />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="col-lg-6">
              <div className="single-product-contents">
                <h1 className="product-title">
                  {productInfo.data.productTitle}
                </h1>

                <div className="product-stock validthemes-in-stock">
                  <span>In Stock</span>
                </div>

                <p>{productInfo.data.productDescription}</p>
                {productID === "gir-cow-ghee" ? (
                  <div>
                    <h5 className="mb-3">Features</h5>
                    <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                      <li>● Traditional bilona method using cultured butter</li>
                      <li>
                        ● Milk sourced from Gir cows under controlled farm
                        conditions
                      </li>
                      <li>
                        ● Small-batch preparation with batch-level traceability
                      </li>
                      <li>
                        ● Naturally rich in vitamins (A, D, E, K), healthy fats,
                        and minerals
                      </li>
                      <li>
                        ● Preservative-free, unblended, and transparently
                        produced
                      </li>
                    </ul>
                  </div>
                ) : (
                  ""
                )}

                {/* Product Sizes */}
                <div className="col-lg-12">
                  <label className="form-label">
                    <h6>Choose Your Pack Size</h6>
                  </label>

                  <div className="product-sizes-list d-flex flex-wrap gap-2">
                    {productInfo.data.productSizes
                      .filter((item) => item.Status === 1)
                      ?.map((size) => {
                        const originalPrice = parseFloat(
                          geoLocation?.currency_code === "INR"
                            ? size.productPrice || "0"
                            : size.productPriceUSD || "0",
                        );
                        const discount = parseFloat(
                          geoLocation?.currency_code === "INR"
                            ? size.productDiscount || "0"
                            : size.productDiscountUSD || "0",
                        );
                        const discountedPrice =
                          originalPrice - (originalPrice * discount) / 100;

                        const cartItem = cartItems.find(
                          (item) =>
                            item.ProductKeyID ===
                            productInfo.data.productKeyID &&
                            item.ProductSizeKeyID === size.ProductSizeKeyID,
                        );

                        const [sizeQuantity, setSizeQuantity] = useState(
                          cartItem?.quantity || 0,
                        );

                        const updateCart = (qty: number) => {
                          setSizeQuantity(qty);
                          if (qty > 0) {
                            handleAddToCart(size.ProductSizeKeyID, qty); // update cart with new quantity
                          }
                        };

                        const handleIncrement = () =>
                          updateCart(sizeQuantity + 1);
                        const handleDecrement = () =>
                          updateCart(Math.max(sizeQuantity - 1, 0));
                        const handleAddToCartClick = () => updateCart(1);

                        return (
                          <div
                            key={size.ProductSizeKeyID}
                            className="product-size-card d-flex justify-content-between align-items-center p-2 border rounded"
                            style={{ minWidth: "320px", flex: "1 1 320px" }}
                          >
                            <div className="d-flex flex-column flex-grow-1 gap-2">
                              <div className="size-info">
                                <strong>
                                  {size.ProductSize} {size.productUnitName} -{" "}
                                  {geoLocation?.currency_code === "INR"
                                    ? `₹`
                                    : "$"}
                                  {discountedPrice.toFixed(2)}
                                </strong>
                                {discount > 0 && (
                                  <span className="discount-info">
                                    {" "}
                                    (
                                    <s>
                                      {" "}
                                      {geoLocation?.currency_code === "INR"
                                        ? `₹`
                                        : "$"}
                                      {originalPrice}
                                    </s>{" "}
                                    - {discount}% Off)
                                  </span>
                                )}
                              </div>
                            </div>
                            {sizeQuantity > 0 && (
                              <div className="quantity-controls d-flex align-items-center gap-1">
                                <button
                                  type="button"
                                  style={{
                                    padding: "5px 10px",
                                    border: "1px solid #ccc",
                                    background: "#f0f0f0",
                                    cursor: "pointer",
                                  }}
                                  onClick={handleDecrement}
                                >
                                  −
                                </button>
                                <input
                                  type="text"
                                  min={0}
                                  readOnly
                                  value={sizeQuantity}
                                  onChange={(e) => {
                                    const val = parseInt(e.target.value) || 0;
                                    updateCart(val);
                                  }}
                                  className="form-control"
                                  style={{
                                    width: "30px",
                                    fontSize: "0.8rem",
                                    padding: "0",
                                    textAlign: "center",
                                    border: "none",
                                  }}
                                />
                                <button
                                  type="button"
                                  style={{
                                    padding: "5px 10px",
                                    border: "1px solid #ccc",
                                    background: "#f0f0f0",
                                    cursor: "pointer",
                                  }}
                                  onClick={handleIncrement}
                                >
                                  +
                                </button>
                              </div>
                            )}
                            {sizeQuantity === 0 && (
                              <div className="d-flex align-items-center">
                                <button
                                  className="btn btn-theme btn-sm"
                                  style={{
                                    fontSize: "0.85rem",
                                    whiteSpace: "nowrap",
                                  }}
                                  onClick={handleAddToCartClick}
                                >
                                  <i className="fas fa-shopping-cart" /> Add to
                                  cart
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {productID === "gir-cow-ghee" ? (
              <div
                className="product-description-section"
                style={{ marginTop: "30px" }}
              >
                {/* Description */}
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                  <h2
                    style={{
                      position: "relative",
                      display: "inline-block",
                      fontWeight: 600,
                      paddingBottom: "10px",
                    }}
                  >
                    Description
                    <span
                      style={{
                        position: "absolute",
                        left: "50%",
                        bottom: "0",
                        transform: "translateX(-50%)",
                        width: "50px",
                        height: "3px",
                        backgroundColor: "#f4b400",
                        borderRadius: "2px",
                        display: "block",
                      }}
                    />
                  </h2>
                </div>

                <p>
                  A2 Gir Cow Ghee is prepared using milk from Gir cows through a
                  slow, traditional bilona process that values quality over
                  yield. Around 25-30 litres of milk are required to produce one
                  litre of ghee, making sure the natural aroma, granular
                  texture, and authentic character are preserved.
                </p>
                <p>
                  Free from blending and high-yield industrial shortcuts, this
                  ghee reflects responsible farming, real milk economics, and
                  honest production, delivering genuine taste and nourishment in
                  every spoon.
                </p>

                {/* Benefits */}
                <h2>Benefits</h2>
                <ul className="list-unstyled">
                  <li style={{ color: "black" }}>
                    <i className="fas fa-check text-success me-2" /> Made using
                    the traditional bilona method
                  </li>
                  <li style={{ color: "black" }}>
                    <i className="fas fa-check text-success me-2" /> Requires
                    higher milk input for superior quality
                  </li>
                  <li style={{ color: "black" }}>
                    <i className="fas fa-check text-success me-2" /> No
                    additives, preservatives, or industrial processing
                  </li>
                  <li style={{ color: "black" }}>
                    <i className="fas fa-check text-success me-2" /> Naturally
                    aromatic with a rich, granular texture
                  </li>
                  <li style={{ color: "black" }}>
                    <i className="fas fa-check text-success me-2" /> Supports
                    digestion, immunity, and daily nourishment
                  </li>
                  <li style={{ color: "black" }}>
                    <i className="fas fa-check text-success me-2" />{" "}
                    Batch-traceable and transparently produced
                  </li>
                </ul>

                {/* Comparison */}
                <h2 style={{ marginTop: "20px" }}>
                  Bilona Gir Cow Ghee vs Industrial Ghee
                </h2>

                <div className="comparison-section">
                  <p>
                    <strong>Source</strong>
                    <br />
                    <strong>● Bilona Gir Cow Ghee:</strong> Made from Gir cow
                    milk with controlled sourcing and batch traceability
                    <br />
                    <strong>● Industrial Ghee:</strong> Made from pooled milk or
                    market cream
                  </p>

                  <p>
                    <strong>Process</strong>
                    <br />
                    <strong>● Bilona:</strong> Cultured, hand-churned butter,
                    slow-cooked in small batches
                    <br />
                    <strong>● Industrial:</strong> Cream is separated and
                    directly heated for fast production
                  </p>

                  <p>
                    <strong>Milk Requirement</strong>
                    <br />
                    <strong>● Bilona:</strong> Uses more milk (25-30 litres per
                    litre of ghee)
                    <br />
                    <strong>● Industrial:</strong> Uses less milk (18-20 litres
                    per litre)
                  </p>

                  <p>
                    <strong>Aroma & Texture</strong>
                    <br />
                    <strong>● Bilona:</strong> Natural grainy texture with a
                    rich, nutty aroma
                    <br />
                    <strong>● Industrial:</strong> Smooth, uniform texture with
                    mild or neutral aroma
                  </p>

                  <p>
                    <strong>Quality Focus</strong>
                    <br />
                    <strong>● Bilona:</strong> Lower yield, higher authenticity
                    <br />
                    <strong>● Industrial:</strong> Higher yield, cost-focused
                  </p>

                  <p>
                    <strong>Transparency</strong>
                    <br />
                    <strong>● Bilona:</strong> Small-batch, traceable,
                    traditionally made
                    <br />
                    <strong>● Industrial:</strong> Large-scale, volume-driven
                  </p>
                </div>
              </div>
            ) : productID === "freeze-dried-mango-powder" ? (
              <div
                className="product-description-section"
                style={{ marginTop: "30px" }}
              >
                {/* Description */}
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                  <h2
                    style={{
                      position: "relative",
                      display: "inline-block",
                      fontWeight: 600,
                      paddingBottom: "10px",
                    }}
                  >
                    Description
                    <span
                      style={{
                        position: "absolute",
                        left: "50%",
                        bottom: "0",
                        transform: "translateX(-50%)",
                        width: "50px",
                        height: "3px",
                        backgroundColor: "#f4b400",
                        borderRadius: "2px",
                        display: "block",
                      }}
                    />
                  </h2>
                </div>

                <p>
                  Experience the rich and authentic taste of Organic Kesar Mango in our premium USDA Organic Freeze Dried Kesar Mango Powder. Made from organically grown Kesar mangoes, the fruit is carefully freeze-dried from fresh pulp to preserve its natural flavour, colour, and nutrients. With no chemicals, no preservatives, and no added sugar, it delivers pure mango goodness in every spoon.

                </p>
                <p>
                  This fine mango powder captures the original sweetness and aroma of Kesar mango, making it perfect for smoothies, desserts, baby food, and beverages. It is a healthy and convenient way to enjoy mango all year round.
                </p>
                <h4>Why Customers Love This Product</h4>
                <ul className="list-unstyled mb-2">
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Real mango taste in convenient powder form</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> No chemicals or artificial flavors</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Easy to use in multiple recipes</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Healthy option for daily consumption</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Long shelf life – no refrigeration required</li>
                </ul>

                <h4>Perfect For</h4>
                <ul className="list-unstyled mb-2">
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Cooking and seasoning</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Chutneys and pickles</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Beverages and juices</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Smoothies and shakes</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Snacks and street food flavoring</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Bulk use for food processing industries</li>
                </ul>

                <h4>What Makes Our Dried Mango Powder Better?</h4>
                <ul className="list-unstyled mb-2">
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Directly sourced from farmers</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Hygienically processed</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Retains original nutrients and flavor</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Available in bulk quantities</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Consistent quality every time</li>
                </ul>

                <h4>Health Benefits</h4>
                <ul className="list-unstyled mb-2">
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Rich in Vitamin A & C</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Supports digestion</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Boosts immunity</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Natural source of antioxidants</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i>  Helps enhance taste naturally</li>
                </ul>



                {/* Benefits */}
                <h4>Benefits</h4>
                <ul className="list-unstyled">
                  <li style={{ color: "black" }}>
                    <i className="fas fa-check text-success me-2" /> Organic
                    Kesar Dry Mango Powder
                  </li>
                  <li style={{ color: "black" }}>
                    <i className="fas fa-check text-success me-2" /> No
                    preservatives or additives
                  </li>
                  <li style={{ color: "black" }}>
                    <i className="fas fa-check text-success me-2" /> Rich in
                    vitamins, antioxidants & fibre
                  </li>
                  <li style={{ color: "black" }}>
                    <i className="fas fa-check text-success me-2" /> Naturally
                    tangy and aromatic
                  </li>
                  <li style={{ color: "black" }}>
                    <i className="fas fa-check text-success me-2" /> Ideal for
                    cooking, seasoning, and healthy snacking
                  </li>
                </ul>

                <p className="mt-3">
                  <strong>Get the Best Price for Dried Mango Powder Today</strong>
                  <p>Enquire now for bulk pricing, samples, and delivery details.</p>
                </p>
              </div>
            ) : productID === "freeze-dried-mango-slices" ? (
              <div
                className="product-description-section"
                style={{ marginTop: "30px" }}
              >
                {/* Description */}
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                  <h2
                    style={{
                      position: "relative",
                      display: "inline-block",
                      fontWeight: 600,
                      paddingBottom: "10px",
                    }}
                  >
                    Description
                    <span
                      style={{
                        position: "absolute",
                        left: "50%",
                        bottom: "0",
                        transform: "translateX(-50%)",
                        width: "50px",
                        height: "3px",
                        backgroundColor: "#f4b400",
                        borderRadius: "2px",
                        display: "block",
                      }}
                    />
                  </h2>
                </div>

                <p>
                  Experience the true richness of Organic Kesar Mango, crafted into light and crispy freeze dried slices that deliver unmatched flavour and aroma. Sourced from premium, organically grown mangoes, each slice is carefully processed using advanced freeze-drying technology to preserve its natural taste, color, and nutritional value.

                </p>
                <p>
                  This product offers pure, clean-label indulgence. With its naturally sweet taste, superior texture, and high nutritional value, it is an ideal choice for health-conscious consumers, gourmet brands, and premium food applications.

                </p>

                <h4 >Why Customers Love This Product</h4>
                <ul style={{ listStyleType: "disc", color: "black", marginLeft: "20px" }}>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Real mango taste with crispy texture</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> No chemicals or artificial flavors</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Healthy snack for kids & adults</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Perfect for daily use or business needs</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Long shelf life – no refrigeration required</li>
                </ul>

                <h4>Perfect For</h4>
                <ul style={{ listStyleType: "disc", color: "black", marginLeft: "20px" }}>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Healthy snacking at home</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Kids lunch boxes</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Gym & fitness diet</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Baking & dessert making</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Smoothies and shakes</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Bulk use for food businesses</li>
                </ul>

                <h4>What Makes Our Freeze-Dried Mango Better?</h4>
                <ul style={{ listStyleType: "disc", color: "black", marginLeft: "20px" }}>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Directly sourced from farmers</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Hygienically processed</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Maintains original nutrients</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Available in bulk quantities</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Consistent quality every time</li>
                </ul>

                <h4>Health Benefits</h4>
                <ul style={{ listStyleType: "disc", color: "black", marginLeft: "20px" }}>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Rich in Vitamin A & C</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Boosts immunity</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Good for digestion</li>
                  <li style={{ color: "black" }}> <i className="fa fa-angle-right text-success me-2"></i> Natural energy snack</li>
                </ul>

                {/* Benefits */}
                <h4>Benefits</h4>
                <ul className="list-unstyled">
                  <li style={{ color: "black" }}>
                    <i className="fas fa-check text-success me-2" /> Organic
                    Kesar Freeze Dried Mango
                  </li>
                  <li style={{ color: "black" }}>
                    <i className="fas fa-check text-success me-2" /> No added
                    sugar
                  </li>
                  <li style={{ color: "black" }}>
                    <i className="fas fa-check text-success me-2" /> No
                    preservatives
                  </li>
                  <li style={{ color: "black" }}>
                    <i className="fas fa-check text-success me-2" /> Rich in
                    vitamins, fibre & antioxidants
                  </li>
                  <li style={{ color: "black" }}>
                    <i className="fas fa-check text-success me-2" /> Healthy
                    snack for kids & adults
                  </li>
                </ul>

                <p className="mt-2">
                  <strong>Get the Best Price for Freeze-Dried Mango Today</strong>
                  <p>Enquire now for bulk pricing, samples, and delivery details.</p>
                </p>
              </div>
            ) : (
              ""
            )}

            {/* FAQ */}
            {productID === "gir-cow-ghee" ? (
              <section className="faq-section default-padding">
                <div className="container">
                  <div className="section-title text-center">
                    <h2>Frequently Asked Questions</h2>
                  </div>

                  <div className="faq-list">
                    <div className="faq-item">
                      <h5 className="faq-question">What is A2 Gir Cow Ghee?</h5>
                      <p className="faq-answer">
                        A2 Gir Cow Ghee is made from milk of Gir cows containing
                        A2 protein, which is easier to digest and rich in
                        nutrients.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h5 className="faq-question">What is Bilona Cow Ghee?</h5>
                      <p className="faq-answer">
                        Bilona Cow Ghee is prepared using the traditional Bilona
                        method, making sure authentic taste, aroma, and
                        nutritional value.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h5 className="faq-question">
                        How can I use A2 Gir Cow Ghee?
                      </h5>
                      <p className="faq-answer">
                        It can be used for cooking, frying, baking, or consumed
                        daily as a healthy supplement.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h5 className="faq-question">
                        Is A2 Gir Cow Ghee good for digestion?
                      </h5>
                      <p className="faq-answer">
                        Yes, it supports better digestion and nutrient
                        absorption.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h5 className="faq-question">
                        Can kids consume this ghee?
                      </h5>
                      <p className="faq-answer">
                        Absolutely, it is healthy for kids and adults, providing
                        essential vitamins and healthy fats.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ) : productID === "freeze-dried-mango-powder" ? (
              <section className="faq-section default-padding">
                <div className="container">
                  <div className="section-title text-center">
                    <h2 style={{ marginBottom: "35px" }}>
                      Frequently Asked Questions
                    </h2>
                  </div>

                  <div className="faq-list">
                    <div className="faq-item">
                      <h5 className="faq-question">
                        What is Organic Freeze-Dry Mango Powder?
                      </h5>
                      <p className="faq-answer">
                        It is a natural mango powder made from organic mangoes
                        that are freeze-dried to keep their original taste,
                        aroma, and nutrients.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h5 className="faq-question">
                        Is this mango powder the same as regular amchur?
                      </h5>
                      <p className="faq-answer">
                        No. Freeze-drying helps retain more flavour, colour, and
                        nutrients compared to regular sun-dried amchur.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h5 className="faq-question">
                        Does this product contain preservatives or additives?
                      </h5>
                      <p className="faq-answer">
                        No. It is organic and free from preservatives,
                        chemicals, colours, or additives.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h5 className="faq-question">
                        How can I use this mango powder?
                      </h5>
                      <p className="faq-answer">
                        You can use it in curries, chutneys, marinades, salads,
                        snacks, or sprinkle it over fruits and chaat for a tangy
                        taste.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h5 className="faq-question">
                        Is this mango powder healthy?
                      </h5>
                      <p className="faq-answer">
                        Yes. It is rich in vitamins, antioxidants, and fibre,
                        making it a healthy way to add natural tanginess to your
                        food.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ) : productID === "freeze-dried-mango-slices" ? (
              <section className="faq-section default-padding">
                <div className="container">
                  <div className="section-title text-center">
                    <h2>Frequently Asked Questions</h2>
                  </div>

                  <div className="faq-list">
                    <div className="faq-item">
                      <h5 className="faq-question">
                        Are freeze-dried mangoes healthy?
                      </h5>
                      <p className="faq-answer">
                        Yes. Freeze-dried mango keeps most of the fruit’s
                        natural vitamins, fibre, and antioxidants without added
                        sugar or preservatives.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h5 className="faq-question">
                        Is freeze-dried mango better than fresh mango?
                      </h5>
                      <p className="faq-answer">
                        Freeze-dried mango offers similar nutrition to fresh
                        mango but lasts longer and is easier to carry and store.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h5 className="faq-question">
                        Does freeze-dried mango contain added sugar?
                      </h5>
                      <p className="faq-answer">
                        No. Pure freeze-dried mango is naturally sweet and
                        contains no added sugar.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h5 className="faq-question">
                        Can kids eat freeze-dried mango?
                      </h5>
                      <p className="faq-answer">
                        Yes. It is a safe, natural, and healthy snack for kids
                        when made from mango.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts />
      </div>
    </div>
  );
};

export default ShopSingleContent;

import illustration14 from "/assets/img/illustration/14.png";
import { Link } from "react-router-dom";
import ProductCategoryV2Data from "../../assets/jsonData/products/ProductCategoryV2Data.json";
import SingleProductCategoryV2 from "./SingleProductCategoryV2";
import ProductFeatureData from "../../assets/jsonData/products/ProductFeatureData.json";
import ProductFeature from "./ProductFeature";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Keyboard,
  Pagination,
  Navigation,
  Autoplay,
  EffectFade,
} from "swiper/modules";

const ProductCategoryV2 = () => {
  return (
    <>
      <div className="cat-pro-area default-padding">
        <div className="container">
          <div className="row align-center">
            <div className="col-xl-5 col-lg-12 pr-80 pr-md-15 pr-xs-15">
              <div className="product-cat-highlight-info bg-cover text-light text-center">
                <h2>
                  Organic <strong> Fresh Fruit</strong>{" "}
                </h2>
                <h6>Save 20% and free delivery</h6>
                <div className="button">
                  <Link
                    className="btn btn-theme btn-md radius animation"
                    to="/products"
                  >
                    All Products
                  </Link>
                </div>
                <img src={illustration14} alt="Image Not Found" />
              </div>
            </div>
            <div className="col-xl-7 col-lg-12">
              <div className="product-cat-carousel-items vt-products">
                <ul className="product-features">
                  {ProductFeatureData.map((feature) => (
                    <ProductFeature feature={feature} key={feature.id} />
                  ))}
                </ul>

                <Swiper
                  className="pro-cat-carousel"
                  loop={true}
                  slidesPerView={1}
                  spaceBetween={30}
                  autoplay={true}
                  pagination={{
                    el: ".product-pagination",
                    clickable: true,
                  }}
                  // Navigation arrows
                  navigation={{
                    nextEl: ".product-button-next",
                    prevEl: ".product-button-prev",
                  }}
                  breakpoints={{
                    768: {
                      slidesPerView: 2,
                    },
                    992: {
                      slidesPerView: 2,
                      spaceBetween: 55,
                    },
                  }}
                  modules={[
                    Navigation,
                    Pagination,
                    Autoplay,
                    Keyboard,
                    EffectFade,
                  ]}
                >
                  {/* {ProductCategoryV2Data.map(product =>
                                        <SwiperSlide key={product.id}>
                                            <SingleProductCategoryV2 product={product} />
                                        </SwiperSlide>
                                    )} */}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCategoryV2;

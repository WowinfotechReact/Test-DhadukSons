import ProductTypeData from "../../assets/jsonData/products/ProductTypeData.json";
import SingleProductType from "./SingleProductType";

const ProductType = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="site-heading text-center main-aditional">
              <h5 className="sub-title">Our Commitment to Excellence</h5>
              <h2 className="title">Vision, Mission and Core Values</h2>
              {/* <div className="decorative-line"></div> */}
            </div>
          </div>
        </div>
      </div>

      <div
        className="product-type-area text-center default-padding mt--30 product-type-attractive"
        style={{ backgroundImage: "url(/assets/img/shape/31.png)" }}
      >
        <div className="container">
          <div className="row">
            {ProductTypeData.map((product) => (
              <div
                className="col-xl-4 col-lg-6 col-md-6 product-type-single product-type-card"
                key={product.id}
              >
                <div className="card-inner">
                  <SingleProductType product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductType;

import { Link } from "react-router-dom";

const ProductSpeciality = () => {
  return (
    <>
      <div
        className="product-speciality-arae bg-cover"
        style={{ backgroundImage: "url(/assets/img/shape/banner-1.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-md-6">
              <div className="product-speciality-info default-padding-bottom">
                <div className="product-badge">
                  <h2>
                    USDA Certified<strong>Organic</strong>
                  </h2>
                </div>
                <br />
                <h4 className="sub-title">About us</h4>
                <h2>Shaping a Mango-Filled Future</h2>
                <p>
                  Dhaduk and Sons Farmer LLP and Shree Hari Nursery share one
                  story grown from the soil, shaped by farmers, and perfected
                  through technology.
                </p>
                <ul className="item-list mb-2">
                  <li>Sustainable Farming Practices</li>
                  <li>Transparent Supply Chain</li>
                </ul>
                <Link
                  className="btn btn-dark btn-md radius animation"
                  to="/about-us"
                >
                  Know More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSpeciality;

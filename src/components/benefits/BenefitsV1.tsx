import VideoBg1 from "../videos/VideoBg1";
import illustration8 from "/assets/img/illustration/8.png";

const BenefitsV1 = () => {
  return (
    <div
      className="benifits-area default-padding-top video-bg-live bg-cover relative mt--50 mt-md-0 mt-xs-0"
      style={{ backgroundImage: "url(/assets/img/banner/16.jpg)" }}
    >
      {/* Background Video */}
      <VideoBg1 />

      {/* Overlay shape */}
      <div
        className="shape-top-center"
        style={{ backgroundImage: "url(/assets/img/shape/10.png)" }}
      />

      {/* Foreground content */}
      {/* <div className="container relative z-10">
        <div className="row">
          <div className="col-xl-5 col-lg-7">
            <div className="benifit-items text-light">
              <div className="shape">
                <img src={illustration8} alt="Image Not Found" />
              </div>
              <h2 className="title video section-title">Why Choose Us</h2>
              <p className="vedio-section-paragraph">
                At Dhaduk and Sons Farmer, we specialize in bringing you the
                authentic taste of Keshar Mangoes straight from our farms. With
                generations of farming experience, we ensure every mango and
                mango-based product is naturally grown, free from chemicals, and
                full of sweetness.
              </p>
              <ul className="list-standard vedio-section-ul">
                <li className="vedio-li">100% Organic: Chemical-free and naturally grown.</li>
                <li className="vedio-li">Authenticity: Genuine Keshar Mango taste.</li>
                <li className="vedio-li">
                  Sustainability: Protecting nature while delivering quality.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BenefitsV1;

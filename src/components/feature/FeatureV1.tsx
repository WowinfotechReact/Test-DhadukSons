import FeatureV1Data from '../../assets/jsonData/feature/FeatureV1Data.json';
import thumb1 from "/assets/img/thumb/1.jpg";
import SingleFeatureV1 from './SingleFeatureV1';
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typewriter from "typewriter-effect";
import { useEffect } from 'react';

const FeatureV1 = () => {
   useEffect(() => {
  AOS.init({
    duration: 800,
    once: true,
  });

  setTimeout(() => AOS.refresh(), 100); // Ensure new elements are picked up
}, []);
    return (
        <>
           <div className="feature-style-one-area default-padding" >
  <div className="container">
    <div className="row align-center">
      
      <div className="col-xl-5 col-lg-6" data-aos="fade-right">
        <div className="feature-style-one-item">
          <img src={thumb1} alt="Image Not Found" className="h-auto" />
        </div>
      </div>

      <div
        className="col-xl-5 col-lg-6 pl-20 pr-20 pl-md-15 pr-md-15 pl-xs-15 pr-xs-15"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="feature-style-one-info">
          <h4 className="sub-title">About us</h4>
          <h2 className="title">Shaping a Sustainable Future</h2>
          <p>
           Dhaduk and Sons Farmer LLP is a pioneering platform that empowers small and marginal farmers to earn better returns for their organic, certified produce by the USDA and India Organic....
          </p>
          <ul className="item-list">
            <li>Sustainable Farming Practices</li>
            <li>Transparent Supply Chain</li>
          </ul>
          <Link
            className="btn btn-theme mt-30 btn-md radius animation"
            to="/about-us"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            Discover More
          </Link>
        </div>
      </div>

      <div className="col-xl-2 col-lg-12" data-aos="fade-left" data-aos-delay="300">
        <div className="featured-product">
          {FeatureV1Data.map((feature) => (
            <SingleFeatureV1 feature={feature} key={feature.id} />
          ))}
        </div>
      </div>
      
    </div>
  </div>
</div>

        </>
    );
};

export default FeatureV1;
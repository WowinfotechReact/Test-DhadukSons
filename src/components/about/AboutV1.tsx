import about1 from "/assets/img/about/1.jpg";
import illustration1 from "/assets/img/illustration/1.png";
import AboutV1ListData from "../../assets/jsonData/about/AboutV1ListData.json";
import AboutV1List from "./AboutV1List";
import Counter from "../counter/Counter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);

const AboutV1 = () => {
  useEffect(() => {
    // Set initial position
    gsap.set(".animation-shape", {
      yPercent: 10,
    });

    // Create the animation
    gsap.to(".animation-shape", {
      yPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: ".animation-shape",
        scrub: 1,
      },
    });
  }, []);

  return (
    <>
      <div className="about-style-one-area default-padding overflow-hidden">
        <div className="container">
          <div className="row align-center">
            <div className="col-xl-6 col-lg-6">
              <div className="about-style-one-thumb">
                <img src={about1} alt="Image Not Found" />
              </div>
            </div>
            <div className="col-xl-6  col-lg-6 ">
              <div className="about-style-one-info">
                <h2 className="sub-title">About us</h2>
                <h3 className="title">Shaping a Mango-Filled Future.</h3>
                <p>
                  Dhaduk and Sons Farmer LLP and Shree Hari Nursery share one
                  story grown from the soil, shaped by farmers, and perfected
                  through technology. Shree Hari Nursery, a third-generation
                  mango plant nursery, lays the foundation by supplying strong
                  mango plants and guiding farmers in cow-based organic farming
                  and certification.
                  <p />
                  <p>
                    When the mangoes reach peak ripeness, Dhaduk and Sons Farmer
                    LLP takes the journey forward, transforming these
                    organically grown fruits into premium freeze-dried mango
                    slices and powders.
                  </p>
                  <p>
                    Through an assured buy-back program, farmers are protected,
                    quality is preserved, and every mango remains fully
                    traceable from orchard to final pack. Freeze-drying gently
                    removes moisture without heat, locking in natural taste,
                    aroma, color, and nutrition, with no added sugar or
                    preservatives. Together, both companies operate in
                    compliance with the USDA National Organic Program,
                    delivering certified organic mango products built on trust,
                    transparency, and farmer-first values.
                  </p>
                </p>
                {/* <div className="fun-fact-style-flex mt-35">
                                    <div className="counter">
                                        <div className="timer"><Counter end={25} /></div>
                                        <div className="operator">M</div>
                                    </div>
                                    <span className="medium">Growth Tonns <br /> of Harvest</span>
                                </div> */}
                {/* <ul className="top-feature">
                                    {AboutV1ListData.map(list =>
                                        <AboutV1List key={list.id} list={list} />
                                    )}
                                </ul> */}
                                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutV1;

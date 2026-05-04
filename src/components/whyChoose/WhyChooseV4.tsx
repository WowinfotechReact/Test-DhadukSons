import ChooseListV4Data from "../../assets/jsonData/whyChoose/ChooseListV4Data.json"
import SingleChooseV4 from "./SingleChooseV4";
import illustration18 from "/assets/img/illustration/18.png"
import illustration20 from "/assets/img/illustration/20.png"
import shape29 from "/assets/img/shape/29.png"
import Counter from "../counter/Counter";
import Typewriter from "typewriter-effect";
const WhyChooseV4 = () => {
    return (
        <>
            <div className="choose-us-style-four-area default-padding">
                <div className="container">
                      <div className="col-lg-8 offset-lg-2">
                                  <div
                                    className="site-heading text-center"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                  >
                                    <h5 className="sub-title">From Farm to Pack – Naturally Better</h5>
                                    <h2 className="title">
                                      <Typewriter
                                        options={{
                                          strings: ["The Goodness Inside Every Pack"],
                                          autoStart: true,
                                          loop: true, // set to true if you want it to repeat
                                          delay: 75, // typing speed
                                          deleteSpeed: 40,
                                        }}
                                      />
                                    </h2>
                                  </div>
                                </div>
                    <div className="row align-center">
                        {/* <div className="col-xl-3 col-lg-12">
                            <div className="feature-style-three-item">
                                <ul>
                                    {ChooseListV4Data.slice(0, 2).map(list =>
                                        <SingleChooseV4 list={list} key={list.id} />
                                    )}
                                </ul>
                            </div>
                        </div> */}
<div className="col-xl-12 col-lg-12">
  <div className="thumb-style-three">
    {/* Desktop Image */}
    <img
      className="animate desktop-img"
      data-animate="pulse"
      src={illustration18}
      alt="Image Not Found"
    />

    {/* Mobile Image */}
    <img
      className="animate mobile-img"
      data-animate="pulse"
      src={illustration20}
      alt="Image Not Found"
    />

    <div
      className="ex-badge animated animate"
      data-animate="fadeInUp"
    ></div>
  </div>
</div>


                        {/* <div className="col-xl-3 col-lg-12">
                            <div className="feature-style-three-item text-end">
                                <ul>
                                    {ChooseListV4Data.slice(2, 4).map(list =>
                                        <SingleChooseV4 list={list} key={list.id} />
                                    )}
                                </ul>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default WhyChooseV4;
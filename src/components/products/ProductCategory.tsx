import ChooseListV4Data from "../../assets/jsonData/whyChoose/ChooseListV4Data.json";
import SingleChooseV4 from "../whyChoose/SingleChooseV4";
import illustration18 from "/assets/img/illustration/19.png";
import shape29 from "/assets/img/shape/29.png";
import Counter from "../counter/Counter";
import Typewriter from "typewriter-effect";

const ProductCategory = () => {
  return (
    <>
      <div className="choose-us-style-four-area default-padding bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div
                className="site-heading text-center ghee-section"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h5 className="sub-title">
                  Experience the richness of organic
                </h5>
                <h2 className="title" style={{ marginBottom: "20px" }}>
                  <Typewriter
                    options={{
                      strings: ["Benefits of Organic Gir Cow Ghee"],
                      autoStart: true,
                      loop: true, // set to true if you want it to repeat
                      delay: 75, // typing speed
                      deleteSpeed: 40,
                    }}
                  />
                </h2>
              </div>
            </div>
          </div>
          <div className="row align-center">
            <div className="col-xl-3 col-lg-12">
              <div className="feature-style-three-item">
                <ul>
                  {ChooseListV4Data.slice(0, 2).map((list) => (
                    <SingleChooseV4 list={list} key={list.id} />
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-xl-6 col-lg-12">
              <div className="thumb-style-three main-thumb-style">
                <img
                  className="animate"
                  data-animate="pulse"
                  src={illustration18}
                  alt="Image Not Found"
                />
                <div
                  className="ex-badge animated animate"
                  data-animate="fadeInUp"
                >
                  <img src={shape29} alt="Image Not Found" />
                  {/* <div className="fun-fact">
                                        <div className="counter">
                                            <div className="timer"><Counter end={150} /></div>
                                            <div className="operator">+</div>
                                        </div>
                                        <span className="medium">Dairy Products</span>
                                    </div> */}
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-12">
              <div className="feature-style-three-item text-start">
                <ul>
                  {ChooseListV4Data.slice(2, 4).map((list) => (
                    <SingleChooseV4 list={list} key={list.id} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCategory;

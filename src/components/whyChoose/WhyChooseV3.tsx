import illustration17 from "/assets/img/illustration/17.png";
import SingleProgressV2 from "../progress/SingleProgressV2";
import ProgressV2Data from "../../assets/jsonData/progress/ProgressV2Data.json";

const WhyChooseV3 = () => {
  return (
    <>
      <div className="choose-us-style-three-area default-padding text-light bg-gray owner-padding">
        <div
          className="shape"
          style={{ backgroundImage: "url(/assets/img/about/3.jpg)" }}
        />
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-6 pl-10 pl-md-15 pl-xs-15">
              {/* <h4 className="sub-title">Founder</h4> */}
              <h2 className="title text-black">
                Meet Our Young Co-Founder: Malhar Dhaduk
              </h2>
              <p className="slot text-blac">
                Dhaduk and Sons Farmer LLP began with the farming background of
                Malhar Dhaduk, a third-generation mango plant nursery owner from
                Shree Hari Nursery. Growing up around mango orchards, he
                developed a strong bond with farming and a deep respect for
                India’s many mango varieties. While studying in Helsinki,
                Finland, Malhar noticed a rising global demand for freeze-dried
                fruits, especially mangoes. After tasting mangoes from other
                countries, he strongly felt that Indian mangoes are sweeter and
                more flavourful. This belief led to the creation of Dhaduk and
                Sons Farmer LLP, a venture that brings together traditional
                Indian farming, modern food processing, and global markets.
                Today, Malhar works closely with organic farmers, helping them
                reach premium markets and gain recognition for Indian mangoes
                worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      {/* <div className="col-lg-5 offset-lg-1" data-aos="fade-left">
        <div className="faq-style-one-info">
          <h2 className="sub-title" data-aos="fade-up" data-aos-delay="100">
            Frequently Asked Questions
          </h2>
          <h2 className="title" data-aos="fade-up" data-aos-delay="200">
            Learn More About the Growing Process
          </h2>

          <div
            className="accordion accordion-regular mt-35 mt-xs-15"
            id="faqAccordion"
          >
            <div
              className="faq-style-one"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  1. Who can work with Dhaduk and Sons Farmer LLP?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p>
                    Certified organic farmers who follow clean and responsible
                    farming practices can work with us.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="faq-style-one"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  2. What type of products does the company offer?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p>
                    We offer premium freeze-dried mango slices and mango powder
                    made from organically grown mangoes.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="faq-style-one"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  3. Where are the mangoes sourced from?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p>
                    Our mangoes are sourced from trusted organic farmers
                    connected with Shree Hari Nursery in Gujarat, India.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="faq-style-one"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  4. How does the company support organic farmers?
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p>
                    The company connects organic farmers with premium markets
                    and helps them get fair value for their produce.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="faq-style-one"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <h2 className="accordion-header" id="headingFive">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseFive"
                >
                  5. What makes Dhaduk and Sons Farmer LLP different?
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                aria-labelledby="headingFive"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p>
                    It combines traditional Indian farming knowledge with modern
                    processing and global market access.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="faq-style-one"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <h2 className="accordion-header" id="headingSix">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSix"
                  aria-expanded="false"
                  aria-controls="collapseSix"
                >
                  6. Why does this matter to consumers?
                </button>
              </h2>
              <div
                id="collapseSix"
                className="accordion-collapse collapse"
                aria-labelledby="headingSix"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p>
                    It means authentic organic integrity, reliable taste,
                    transparent sourcing, and a product that supports farmers
                    rather than disconnected processing factories.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default WhyChooseV3;

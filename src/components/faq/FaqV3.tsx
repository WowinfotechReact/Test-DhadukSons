import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import thumb7 from "/assets/img/thumb/7.jpg";
import { Helmet } from "react-helmet-async";

interface DataType {
  sectionClass?: string;
}

const FaqV3 = ({ sectionClass }: DataType) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <div
        className={`feq-style-one-area default-padding ${sectionClass || ""}`}
      >
        <div className="container">
          <div className="row align-center">
            {/* Image Section */}
            <div className="col-lg-5" data-aos="fade-right">
              <div className="thumb-style-two">
                <img
                  src={thumb7}
                  alt="Image Not Found"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                />
                {/* <h2 data-aos="fade-up" data-aos-delay="200">
                  <strong>F</strong>AQ
                </h2> */}
              </div>
            </div>

            {/* FAQ Content */}
            <div className="col-lg-5 offset-lg-1" data-aos="fade-left">
              <div className="faq-style-one-info">
                <h2
                  className="sub-title"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  Frequently Asked Questions
                </h2>
                <h2 className="title" data-aos="fade-up" data-aos-delay="200">
                  Learn More About the Growing Process
                </h2>

                <div
                  className="accordion accordion-regular mt-35 mt-xs-15"
                  id="faqAccordion"
                >
                  {/* FAQ 1 */}
                  <div
                    className="faq-style-one"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <h3 className="accordion-header" id="headingOne">
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
                    </h3>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        <p>
                          Certified organic farmers who follow clean and
                          responsible farming practices can work with us.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* FAQ 2 */}
                  <div
                    className="faq-style-one"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <h3 className="accordion-header" id="headingTwo">
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
                    </h3>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        <p>
                          We offer premium freeze-dried mango slices and mango
                          powder made from organically grown mangoes.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* FAQ 3 */}
                  <div
                    className="faq-style-one"
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    <h3 className="accordion-header" id="headingThree">
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
                    </h3>
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
                  {/* FAQ 4 */}
                  <div
                    className="faq-style-one"
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    <h3 className="accordion-header" id="headingFour">
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
                    </h3>
                    <div
                      id="collapseFour"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        <p>
                          The company connects organic farmers with premium
                          markets and helps them get fair value for their
                          produce.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* FAQ 5 */}
                  <div
                    className="faq-style-one"
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    <h3 className="accordion-header" id="headingFive">
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
                    </h3>
                    <div
                      id="collapseFive"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFive"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        <p>
                          It combines traditional Indian farming knowledge with
                          modern processing and global market access.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* FAQ 6 */}
                  {/* <div
                    className="faq-style-one"
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    <h3 className="accordion-header" id="headingSix">
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
                    </h3>
                    <div
                      id="collapseSix"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingSix"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        <p>
                          It means authentic organic integrity, reliable taste,
                          transparent sourcing, and a product that supports
                          farmers rather than disconnected processing factories.
                        </p>
                      </div>
                    </div>
                  </div> */}
                </div>
                {/* End Accordion */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqV3;

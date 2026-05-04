import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import thumb7 from "/assets/img/thumb/7.jpg";
import { Helmet } from "react-helmet-async";

interface DataType {
  sectionClass?: string;
}

const FaqV1 = ({ sectionClass }: DataType) => {
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
                        1. Are freeze-dried mangoes healthy?
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
                          Yes. Our freeze-dried mangoes retain most of their
                          natural vitamins, minerals, and fibre because they are
                          processed gently after being grown under controlled
                          organic farming practices.
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
                        2. Is it safe to eat freeze-dried mango every day?
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
                          Yes. When enjoyed in moderation, they make a wholesome
                          daily snack sourced from mangoes grown and handled
                          responsibly from plantation to processing.
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
                        3. Is this product made from real organic mangoes?
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
                          Yes. The mangoes come from organically grown plants
                          developed at Shree Hari Nursery and cultivated by
                          trained farmers under USDA National Organic Program
                          standards.
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
                        4. Does the dried mango contain added sugar or
                        preservatives?
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
                          No. Our mangoes contain no added sugar, colours, or
                          preservatives, only naturally ripened fruit processed
                          within our farmer-linked ecosystem.
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
                        5. How is your supply chain different from other brands?
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
                          Unlike conventional brands that buy mangoes from open
                          markets, we work directly with farmers from nursery
                          plants to harvest to processing, ensuring full
                          traceability, ethical sourcing, and consistent
                          quality.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* FAQ 6 */}
                  <div
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
                  </div>
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

export default FaqV1;

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import HistoryData from "../../assets/jsonData/history/HistoryData.json";
import HistoryInfo from "./HistoryInfo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation, Autoplay } from "swiper/modules";

const History = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <div
        className="history-area default-padding bg-gray"
        style={{ backgroundImage: "url(/assets/img/shape/brush-down.png)" }}
        data-aos="fade-up"
      >
        <div className="container">
          <div className="row">
            <div
              className="col-lg-10 offset-lg-1"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="text-center mb-60 mb-md-40 mb-xs-40">
                 <h5 className="sub-title" data-aos="fade-up" data-aos-delay="100">
                 Quality Check and Packaging
                </h5>
                <h2
                  className="mask-text large"
                  style={{ backgroundImage: "url(/assets/img/banner/18.jpg)" }}
                >
                  5 Steps to Make Mango Product
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="history-items">
            <div className="row">
              <div
                className="col-lg-12"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div
                  className="carousel slide"
                  data-ride="carousel"
                  id="timeline-carousel"
                  data-interval={5000000}
                >
                  {/* Carousel Indicators with Swiper */}
                  <ol className="carousel-indicators text-center">
                    <Swiper
                      className="timeline-carousel"
                      loop={true}
                      freeMode={true}
                      grabCursor={true}
                      slidesPerView={1}
                      spaceBetween={30}
                      autoplay={false}
                      navigation={{
                        nextEl: ".timeline-button-next",
                        prevEl: ".timeline-button-prev",
                      }}
                      breakpoints={{
                        768: {
                          slidesPerView: 2,
                        },
                        992: {
                          slidesPerView: 3,
                        },
                        1400: {
                          slidesPerView: 5,
                        },
                      }}
                      modules={[
                        Navigation,
                        Pagination,
                        Autoplay,
                        Keyboard,
                      ]}
                    >
                      {HistoryData.listData.map((slider) => (
                        <SwiperSlide key={slider.id}>
                          <li
                            data-bs-target="#timeline-carousel"
                            data-bs-slide-to={slider.dataSlideTo}
                            className={slider.activeClass}
                            aria-current="true"
                            aria-label={slider.ariaLabel}
                          >
                            <h4>{slider.year}</h4>
                          </li>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    {/* Navigation buttons */}
                    <div className="timeline-navigation">
                      <div className="timeline-button-prev" />
                      <div className="timeline-button-next" />
                    </div>
                  </ol>

                  {/* Carousel Content (Step Details) */}
                  <div
                    className="carousel-inner"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    {HistoryData.infoData.map((history) => (
                      <HistoryInfo history={history} key={history.id} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;

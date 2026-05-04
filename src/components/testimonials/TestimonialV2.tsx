import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import TestimonialV2Data from "../../assets/jsonData/testimonial/TestimonialV2Data.json";
import SingleTestimonialV2 from "./SingleTestimonialV2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const TestimonialV2 = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <div
        className="testimonial-area default-padding bg-gray"
        style={{ backgroundImage: "url(/assets/img/shape/13.png)" }}
        data-aos="fade-up"
      >
        <div className="container">
          <div className="row">
            <div
              className="col-lg-8 offset-lg-2"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="site-heading text-center">
                <h5 className="sub-title">Customers Review</h5>
                <h2 className="title">What People Say?</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-lg-12"
              data-aos="zoom-in-up"
              data-aos-delay="400"
            >
              <Swiper
                className="testimonial-style-two-carousel text-center"
                direction={"horizontal"}
                loop={true}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                slidesPerView={3} // Show 3 testimonials
                spaceBetween={30} // Space between slides
                // centeredSlides={true}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 1, // Mobile
                  },
                  768: {
                    slidesPerView: 2, // Tablet
                  },
                  1024: {
                    slidesPerView: 3, // Desktop
                  },
                }}
                modules={[Navigation, Pagination, Autoplay, Keyboard]}
              >
                {TestimonialV2Data.map((testimonial) => (
                  <SwiperSlide key={testimonial.id}>
                    <SingleTestimonialV2 testimonial={testimonial} />
                  </SwiperSlide>
                ))}
                <div className="swiper-pagination" />
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialV2;

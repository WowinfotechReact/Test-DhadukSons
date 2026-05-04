import illustration13 from '/assets/img/illustration/13.png';
import CallToActionData from '../../assets/jsonData/cta/CallToActionData.json'
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation, Autoplay } from 'swiper/modules';

const CallToAction = () => {
    return (
        <>
            <div className="call-to-action-area overflow-hidden default-padding-top bg-gray" style={{ backgroundImage: 'url(/assets/img/shape/24.png)' }}>
                <div className="shape">
                    <img src={illustration13} alt="Image Not Found" />
                </div>
                <div className="container">
                    <div className="row">
                        {/* <div className="col-xl-6 col-lg-12">
                            <div className="callto-action text-light">
                                <h2 className="title">Trusted by Farmers & Industry Leaders</h2>
                                <p>
                                  We proudly serve a wide range of clients — from dedicated mango farmers and cooperative groups to renowned export houses, food processors, and retail chains. Our commitment to quality, fairness, and sustainability has earned the trust of those who value ethical sourcing and long-term partnerships. Together, we are shaping a better future for Indian mango farming.
                                </p>
                          
                            </div>
                        </div> */}
                        <div className="col-xl-12 col-lg-12">
                            <div className="brand">
                                <Swiper
                                    className="brand-style-one-carousel"
                                    loop={true}
                                    slidesPerView={2}
                                    spaceBetween={15}
                                    autoplay={true}
                                    breakpoints={{
                                        768: {
                                            slidesPerView: 3,
                                            spaceBetween: 30,
                                        },
                                        992: {
                                            slidesPerView: 3,
                                            spaceBetween: 30,
                                        }
                                    }}
                                    modules={[Navigation, Pagination, Autoplay, Keyboard]}
                                >
                                    {CallToActionData.map(brand =>
                                        <SwiperSlide key={brand.id}>
                                            <img src={`/assets/img/brand/${brand.thumb}`} alt="Thumb" />
                                        </SwiperSlide>
                                    )}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default CallToAction;
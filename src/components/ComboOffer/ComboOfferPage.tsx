import React, { useState } from "react";
import LayoutV1 from "../../components/layouts/LayoutV1";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const ComboOfferPage = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const productImages = [
       "https://api.dhadhuksons.wowinfosolutions.com/uploads/product-images/eb9ce5bf-818e-11f0-a465-bc2411520d0d_1764491704863.jpeg",
    "https://api.dhadhuksons.wowinfosolutions.com/uploads/product-images/eb9ce5bf-818e-11f0-a465-bc2411520d0d_1771491919743.jpeg", 
    "https://api.dhadhuksons.wowinfosolutions.com/uploads/product-images/eb9ce5bf-818e-11f0-a465-bc2411520d0d_1771492227164.jpeg",
    "https://api.dhadhuksons.wowinfosolutions.com/uploads/product-images/eb9ce5bf-818e-11f0-a465-bc2411520d0d_1764491704863.jpeg"
    ];

    return (
        <LayoutV1>
            <style>
                {`
          /* Gallery Container - Fixed Height to prevent long scrolling */
          .gallery-wrapper {
            height: 550px; 
            display: flex;
            gap: 15px;
          }

          /* Thumbnails Styling (Left Side) */
          .thumb-container {
            width: 120px; /* Thumbs chi width thodi mothi keli aahe */
            height: 100%;
          }

          .myThumbs .swiper-slide {
            height: 110px !important; /* Fixed thumb height */
            border-radius: 12px;
            overflow: hidden;
            cursor: pointer;
            transition: 0.3s;
            border: 2px solid transparent;
          }

          .myThumbs .swiper-slide-thumb-active {
            opacity: 1;
            border-color: #ffc107;
            transform: scale(0.95);
          }

          /* Main Image Styling */
          .main-slider-container {
            flex: 1;
            height: 100%;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          }

          .main-img {
            width: 100%;
            height: 100%;
            object-fit: cover; /* Image stretch honar nahi ani overflow cut karel */
          }

          /* General Design */
          .content-section {
            padding-left: 30px;
          }
          
          .btn-buy {
            background: #000;
            color: #fff;
            border-radius: 100px;
            padding: 16px;
            font-weight: 700;
            border: none;
            transition: 0.3s;
          }
          .btn-buy:hover { background: #333; transform: translateY(-2px); }
          .ingredients-box {
            background: linear-gradient(135deg, #fffcf0 0%, #fff 100%);
            border-left: 5px solid #f39c12;
            border-radius: 12px;
                padding-left: 15px;
          }
        `}
        
            </style>

            <div className="container py-5">
                <div className="row">
                    {/* --- LEFT SIDE: FIXED HEIGHT GALLERY --- */}
                    <div className="col-lg-7 col-md-12">
                        <div className="gallery-wrapper">

                            {/* Vertical Thumbs Slider */}
                            <div className="thumb-container d-none d-sm-block">
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    direction={'vertical'}
                                    slidesPerView={4.5}
                                    spaceBetween={10}
                                    mousewheel={true}
                                    modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
                                    className="myThumbs h-100"
                                >
                                    {productImages.map((img, i) => (
                                        <SwiperSlide key={i}>
                                            <img src={img} alt="thumb" className="w-100 h-100" style={{ objectFit: 'cover' }} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            {/* Main Image View */}
                            <div className="main-slider-container">
                                <Swiper
                                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="h-100"
                                >
                                    {productImages.map((img, i) => (
                                        <SwiperSlide key={i}>
                                            <img src={img} alt="Mango Slices" className="main-img" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT SIDE: CONTENT --- */}
                    <div className="col-lg-5 col-md-12 content-section mt-4 mt-lg-0">
                       
                        <h1 className="fw-bold mb-3" style={{ fontSize: '2.4rem' }}>USDA Organic Mango Slices</h1>

                        {/* <div className="d-flex align-items-center gap-3 mb-4">
                            <h2 className=" fw-bold mb-0">₹499</h2>
                            <span className="text-muted text-decoration-line-through">₹799</span>
                            <span className="badge bg-danger">Save 40%</span>
                        </div> */}

                        <p className=" mb-4">
                            Enjoy the natural taste of real fruit with Organic Mango Slices. Made from carefully selected mangoes, these slices are gently dried or freeze-dried to preserve their natural sweetness, flavour, and nutrients - without added sugar or preservatives. Light, crunchy, and convenient, they offer a healthy snacking option anytime, anywhere.

                        </p>

                        <div className="bg-light  rounded-4 mb-4">
                            <h6 className="fw-bold small mb-2 text-uppercase">Highlights</h6>
                            <div className="row g-2">
                                <div className="col-6 small">✔ 100% Natural Mango
                                </div>
                                <div className="col-6 small">✔ Rich in Vitamins & Antioxidants
                                </div>
                                <div className="col-6 small">✔ Light, Crunchy & Easy to Carry
                                </div>
                                <div className="col-6 small">✔ Supports Digestion
                                </div>
                            </div>
                        </div>
                         <div className="bg-light  rounded-4 mb-4">
                            <h6 className="fw-bold small mb-2 text-uppercase">Benefits</h6>
                            <div className="row g-2">
                                <div className="col-6 small">✔ Made from organic mangoes with clean ingredients

                                </div>
                                <div className="col-6 small">✔ Naturally sweet and satisfying snack option

                                </div>
                                <div className="col-6 small">✔ Easy to carry and store without refrigeration

                                </div>
                                <div className="col-6 small">✔ A healthier alternative to processed snacks
                                </div>
                            </div>
                        </div>

                          {/* Ingredients Section */}
            <div className="ingredients-box p-3 mb-4 shadow-sm">
                <span className="fw-bold d-block mb-1 small text-uppercase">Ingredients:</span>
                <p className="mb-0 fw-medium">100% Organic Kesar Mango Slices (Freeze-Dried)</p>
            </div>
                    </div>
                </div>

                {/* --- EXCLUSIVE OFFERS SECTION (NO CHANGES) --- */}
                <div className="mt-5 pt-5 border-top">
    <h3 className="fw-bold text-center mb-5" style={{ letterSpacing: '-1px' }}>Exclusive Combo Offers</h3>
    <div className="row g-4 justify-content-center">
        {[
            
            { 
                title: 'Mango Slices Pack',
                size: 'Pack of 5 (40g each)', 
                price: '₹1,750', 
                tag: 'BEST VALUE',
                offer: 'SAVE ₹245' 
            },
            { 
                title: 'Mango Slices Pack',
                size: 'Pack of 10 (40g each)', 
                price: '₹3,200', 
                tag: 'MOST POPULAR',
                offer: 'SAVE ₹790' 
            }
        ].map((item, i) => (
            <div className="col-md-4" key={i}>
                <div className={`card border-2 ${i === 2 ? 'border-dark shadow-lg' : 'border-warning'} rounded-5 p-4 text-center h-100 transition-all`} 
                     style={{ transition: '0.3s', cursor: 'pointer' }}>
                    
                    <span className={`badge ${i === 2 ? 'bg-dark text-white' : 'bg-warning text-dark'} align-self-center mb-3 px-3 py-2 rounded-pill small fw-bold`}>
                        {item.tag}
                    </span>
                    
                    <p className="text-muted small mb-1 fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>{item.title}</p>
                    <h4 className="fw-bold mb-2">{item.size}</h4>
                    
                    <div className="my-3">
                        <h2 className="fw-extrabold mb-0" style={{ fontWeight: '800' }}>{item.price}</h2>
                    </div>

                    <div className="mt-auto">
                        <h6 className="text-success fw-bold bg-success bg-opacity-10 py-2 rounded-3">
                            {item.offer}
                        </h6>
                        <button className={`btn ${i === 2 ? 'btn-dark' : 'btn-outline-dark'} rounded-pill w-100 mt-3 py-2 fw-bold`}>
                            Select Pack
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>

                {/* --- SECTION 3: LIFESTYLE & CONSUMPTION (Modern Two-Column) --- */}
<div className="row my-5 g-4">
    {/* When to Take */}
    <div className="col-md-6">
        <div className="p-5 h-100 rounded-5 shadow-sm" style={{ background: '#1a1a1a', color: '#fff' }}>
            <h3 className="fw-bold mb-4 text-warning">When to Enjoy 🥭</h3>
            <div className="d-flex flex-column gap-3">
                {[
                    "Mid-morning snack for focus",
                    "During work to beat hunger",
                    "Before/After workouts for energy",
                    "While traveling or on-the-go",
                    "Light evening snack",
                    "Healthy sweet cravings"
                ].map((text, i) => (
                    <div key={i} className="d-flex align-items-center gap-3 border-bottom border-secondary pb-2">
                        <span className="text-warning">✔</span>
                        <span className="fs-6 opacity-90">{text}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>

    {/* How to Consume */}
    <div className="col-md-6">
        <div className="p-5 h-100 rounded-5 border bg-white shadow-sm">
            <h3 className="fw-bold mb-4">How To Consume 🥣</h3>
            <div className="vertical-steps">
                <div className="step-item mb-4 d-flex gap-3">
                    <div className="step-number bg-warning rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px', flexShrink: 0 }}>1</div>
                    <p className="mb-0 fw-medium"><strong>Direct Snack:</strong> Eat directly as a ready-to-eat crispy snack.</p>
                </div>
                <div className="step-item mb-4 d-flex gap-3">
                    <div className="step-number bg-warning rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px', flexShrink: 0 }}>2</div>
                    <p className="mb-0 fw-medium"><strong>Mix It Up:</strong> Add to cereals, yogurt, or smoothies for extra crunch.</p>
                </div>
                <div className="step-item d-flex gap-3">
                    <div className="step-number bg-warning rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px', flexShrink: 0 }}>3</div>
                    <p className="mb-0 fw-medium"><strong>Toppings:</strong> Perfect as a topping for desserts or fresh salads.</p>
                </div>
            </div>
            <p className="mt-4 p-3 bg-light rounded-3 small italic text-muted">"Enjoy straight from the pack for a healthy, fruity crunch anytime."</p>
        </div>
    </div>
</div>

{/* --- SECTION 4: PRODUCT SPECIFICATION TABLE --- */}
<div className="py-5">
    <div className="text-center mb-5">
        <h2 className="fw-bold">Product Specifications</h2>
        <p className="text-muted">Choose the right pack for your needs</p>
    </div>
    <div className="table-responsive rounded-4 shadow-sm border">
        <table className="table table-hover mb-0 text-center align-middle">
            <thead className="table-dark">
                <tr>
                    <th className="py-3">FEATURE</th>
                    <th className="py-3">40g PACK</th>
                    <th className="py-3">70g PACK</th>
                    <th className="py-3">150g PACK</th>
                </tr>
            </thead>
            <tbody>
                <tr><td className="fw-bold text-start ps-4">Calories</td><td>~150 kcal</td><td>~260 kcal</td><td>~550 kcal</td></tr>
                <tr><td className="fw-bold text-start ps-4">Added Sugar</td><td className="text-success fw-bold">0g</td><td className="text-success fw-bold">0g</td><td className="text-success fw-bold">0g</td></tr>
                <tr><td className="fw-bold text-start ps-4">Ingredients</td><td>100% Organic Mango</td><td>100% Organic Mango</td><td>100% Organic Mango</td></tr>
                <tr><td className="fw-bold text-start ps-4">Best For</td><td>Light snacking</td><td>Regular snacking</td><td>Family pack/sharing</td></tr>
                <tr><td className="fw-bold text-start ps-4">Convenience</td><td>Pocket-friendly</td><td>Easy to carry</td><td>Value pack</td></tr>
                <tr><td className="fw-bold text-start ps-4">Benefit</td><td>Quick natural energy</td><td>Balanced healthy snack</td><td>Long-lasting healthy option</td></tr>
            </tbody>
        </table>
    </div>
</div>

{/* --- SECTION 5: CUSTOMER TESTIMONIALS --- */}
<div className="py-5 overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fcf8f0 100%)' }}>
  <div className="container py-4">
    {/* Section Header */}
    <div className="text-center mb-5">
     
      <h2 className="display-5 fw-black mb-2" style={{ fontWeight: 900, letterSpacing: '-1.5px' }}>
        What Our Community Says
      </h2>
      <p className="text-muted">Trusted by 10,000+ mango lovers across India</p>
    </div>

    <div className="row g-4">
      {[
        { name: "Riya S.", text: "Absolutely delicious and naturally sweet. Perfect healthy snack without any guilt.", color: "#FFB300" },
        { name: "Amit P.", text: "Crispy, fresh, and full of real mango flavour. My kids love it!", color: "#4CAF50" },
        { name: "Neha K.", text: "Great quality and no added sugar makes it my go-to snack every day.", color: "#2196F3" },
        { name: "Rahul M.", text: "Perfect for travel. Light, tasty, and much better than processed snacks.", color: "#9C27B0" }
      ].map((item, i) => (
        <div className="col-lg-3 col-md-6" key={i}>
          <div className="testimonial-card h-100">
            <div className="card-top-accent" style={{ background: item.color }}></div>
            <div className="quote-icon">“</div>
            
            <div className="stars mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: '#FFB300', fontSize: '1.2rem' }}>★</span>
              ))}
            </div>

            <p className="testimonial-text mb-4">
              {item.text}
            </p>

            <div className="d-flex align-items-center gap-3 mt-auto pt-3 border-top">
              <div className="avatar-circle" style={{ background: `${item.color}20`, color: item.color }}>
                {item.name.charAt(0)}
              </div>
              <div>
                <h6 className="fw-bold mb-0 text-dark">{item.name}</h6>
                <small className="text-muted">Verified Buyer</small>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  <style>
    {`
      .fw-black { font-weight: 900; }
      
      .testimonial-card {
        background: #ffffff;
        border-radius: 24px;
        padding: 35px 30px;
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(0,0,0,0.03);
        box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        display: flex;
        flex-direction: column;
      }

      .testimonial-card:hover {
        transform: translateY(-12px);
        box-shadow: 0 25px 50px rgba(255, 179, 0, 0.12);
        border-color: rgba(255, 179, 0, 0.2);
      }

      .card-top-accent {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        opacity: 0.6;
      }

      .quote-icon {
        position: absolute;
        top: 10px;
        right: 25px;
        font-size: 5rem;
        font-family: serif;
        color: rgba(0,0,0,0.03);
        line-height: 1;
      }

      .testimonial-text {
        font-size: 1rem;
        line-height: 1.6;
        color: #4a4a4a;
        font-style: italic;
        position: relative;
        z-index: 1;
      }

      .avatar-circle {
        width: 45px;
        height: 45px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 1.1rem;
      }

      .testimonial-card:hover .avatar-circle {
        transform: rotate(5deg) scale(1.1);
        transition: 0.3s;
      }
    `}
  </style>
</div>

{/* --- SECTION 6: FAQ --- */}
<div className="container py-5 my-5">
  <div className="row justify-content-center">
    <div className="col-lg-9">
      {/* --- Section Header --- */}
      <div className="text-center mb-5">
        <h2 className="display-5 fw-black mt-2" style={{ fontWeight: 900, letterSpacing: '-1.5px' }}>
          Frequently Asked Questions
        </h2>
        <div className="mx-auto mt-3" style={{ width: '50px', height: '4px', background: '#ffb300', borderRadius: '10px' }}></div>
      </div>

      {/* --- Modern Interactive List --- */}
      <div className="faq-wrapper">
        {[
          { q: "Are organic mango slices a healthy snack?", a: "Yes, they retain natural nutrients such as vitamins, fiber, and antioxidants without added sugar or preservatives." },
          { q: "How do they compare to fresh mangoes?", a: "They offer similar nutrition but are more convenient, with a longer shelf life and no refrigeration required." },
          { q: "Do these mango slices contain any added sugar?", a: "No, they are naturally sweet and made from pure mangoes without any added sugar." },
          { q: "Are these mango slices suitable for children?", a: "Yes, they are a safe, natural snack option for kids when consumed in appropriate portions." },
          { q: "How are freeze-dried mango slices different?", a: "Freeze-drying preserves more nutrients and gives a light, crispy texture without using added sugars or chemicals." }
        ].map((item, i) => (
          <div 
            key={i} 
            className="faq-item mb-3 transition-all shadow-sm"
            style={{ 
              borderRadius: '24px', 
              background: '#ffffff', 
              border: '1px solid #f0f0f0',
              overflow: 'hidden'
            }}
          >
            <div className="accordion-header">
              <button 
                className="accordion-button collapsed py-4 px-4 fw-bold d-flex justify-content-between align-items-center w-100 border-0 bg-transparent" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target={`#faq-collapse-${i}`}
                style={{ fontSize: '1.15rem', color: '#1d1d1f' }}
              >
                <span className="pe-3">{item.q}</span>
                <i className="bi bi-plus-lg fs-5 text-warning"></i>
              </button>
            </div>
            <div 
              id={`faq-collapse-${i}`} 
              className="accordion-collapse collapse" 
              data-bs-parent="#mangoFAQ"
            >
              <div 
                className="accordion-body px-4 pb-4 pt-0 text-secondary"
                style={{ fontSize: '1.05rem', lineHeight: '1.6' }}
              >
                <div className="pt-2 border-top">
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    
    </div>
  </div>

  <style>
    {`
      .faq-item {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .faq-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.05) !important;
        border-color: #ffb300 !important;
      }
      .accordion-button:not(.collapsed) {
        color: #ffb300 !important;
        box-shadow: none !important;
      }
      .accordion-button::after {
        display: none; /* Default icon kadhun takla */
      }
      /* Custom Icon Animation */
      .accordion-button:not(.collapsed) i {
        transform: rotate(45deg);
        color: #ffb300 !important;
      }
      .accordion-button i {
        transition: transform 0.3s ease;
      }
      .fw-black { font-weight: 900; }
    `}
  </style>
</div>
            </div>
        </LayoutV1>
    );
};

export default ComboOfferPage;
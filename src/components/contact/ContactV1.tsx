import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import shape16 from "/assets/img/shape/16.png";
import illustration10 from "/assets/img/illustration/10.png";
import { toast } from "react-toastify";
import { addUpdateEnquiry } from "../../APIServices/Enquiry/Enquiry";
import { EnquiryData } from "../../APIServices/Enquiry/EnquiryInteface";

import { useLocation } from "react-router-dom";
interface FormEventHandler {
  (event: React.FormEvent<HTMLFormElement>): void;
}

const ContactV1 = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleForm: FormEventHandler = async (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const data: EnquiryData = {
      firstName: formData.get("firstName")?.toString() || "",
      lastName: formData.get("lastName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phoneNumber: formData.get("phoneNumber")?.toString() || "",
      message: formData.get("message")?.toString() || "",
      enquiryKeyID: null,
    };

    if (!/^\d{10}$/.test(data.phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      const response = await addUpdateEnquiry(data);

      if (response?.statusCode === 200) {
        toast.success(response.message || "Thanks for your message");
        form.reset();
      } else {
        toast.error(response?.message || "Failed to submit enquiry");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  };
const [activePath, setActivePath] = useState('')
  const location = useLocation();

  useEffect(()=>{
    setActivePath(location.pathname);
  },[location.pathname])

  return (
    <>
      <div className="contact-area overflow-hidden bg-gray default-padding">
        <div className="container">
          <div className="row align-center">
            {/* Contact Form */}
            <div
              className="col-tact-stye-one col-xl-6 col-lg-7"
              data-aos="fade-right"
            >
              <div className="contact-form-style-one mb-md-50">
                <img
                  src={illustration10}
                  alt="Image Not Found"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                />
                <h5
                  className="sub-title"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  Have Questions?
                </h5>
                <h2 className="heading" data-aos="fade-up" data-aos-delay="400">
                  Send us a message
                </h2>

                <form
                  className="contact-form"
                  onSubmit={handleForm}
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          placeholder="First name*"
                          type="text"
                          required
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          placeholder="Last name*"
                          type="text"
                          required
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Email*"
                          type="email"
                          required
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          className="form-control no-arrows"
                          id="phone"
                          name="phoneNumber"
                          placeholder="Phone *"
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          maxLength={10}
                          title="Please enter a valid 10-digit phone number"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group comments">
                        <textarea
                          className="form-control"
                          id="comments"
                          name="message"
                          placeholder="Enter your questions here *"
                          required
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <button type="submit" name="submit" id="submit">
                        <i className="fa fa-paper-plane" /> Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div
              className="col-tact-stye-one col-xl-5 offset-xl-1 col-lg-5"
              data-aos="fade-left"
            >
              <div className="contact-style-one-info text-light">
                <h2 data-aos="fade-up" data-aos-delay="200">
                  <span>
                    Contact us
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 500 150"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M14.4,111.6c0,0,202.9-33.7,471.2,0c0,0-194-8.9-397.3,24.7c0,0,141.9-5.9,309.2,0"
                        style={{ animationPlayState: "running" }}
                      />
                    </svg>
                  </span>
                </h2>
                {/* <p data-aos="fade-up" data-aos-delay="300">
                  Plan upon yet way get cold spot its week. Almost do am or
                  limits hearts. Resolve parties but why she shewing.
                </p> */}
                <ul>
                  <li data-aos="fade-up" data-aos-delay="400">
                    <div className="content icon-row">
                      <div className="icon">
                        <i className="fas fa-phone"></i>
                      </div>
                      <div>
                        <h5 className="title">Contact No</h5>
                        <a href={activePath === '/canada'?"tel:+1(416)-841-7610":"tel:9601182335"}>{activePath === '/canada'? '+1(416)-841-7610':"+91 9601182335"}</a>
                      </div>
                    </div>
                  </li>

                  <li data-aos="fade-up" data-aos-delay="500">
                    <div className="info icon-row">
                      <div className="icon">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div>
                        <h5 className="title">Official Email</h5>
                        <a href={activePath === '/canada'?"mailto:svt5990@gmail.com":"mailto:dandsfarmerllp@gmail.com"}>
                        {activePath === '/canada'? 'svt5990@gmail.com':"dandsfarmerllp@gmail.com"}
                        </a>
                      </div>
                    </div>
                  </li>

                  <li data-aos="fade-up" data-aos-delay="600">
                    <div className="info icon-row">
                      <div className="icon">
                        <i className="fas fa-home"></i>
                      </div>
                      <div>
                        <h5 className="title">Our Location</h5>
                        <p>
                          Block No. 119, Near Main Canal Areth Bodhan Road,
                          Areth, Mandvi, Surat, Gujarat, India, 394170
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactV1;

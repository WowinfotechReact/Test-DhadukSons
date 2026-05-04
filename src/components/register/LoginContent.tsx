/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addUpdateUserData,
  loginUser,
  register,
  verifyOtp,
} from "../../APIServices/UserLoginApi/UserLoginApi";
import Select from "react-select";
import { countryOptions } from "../MiddleWare/Enum";

type OptionType = {
  value: number;
  label: string;
};

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: "38px", // match bootstrap input height
    height: "38px",
    borderRadius: "0.375rem", // rounded corners like bootstrap
    borderColor: state.isFocused ? "#86b7fe" : "#ced4da",
    boxShadow: state.isFocused ? "0 0 0 0.25rem rgba(13,110,253,.25)" : "none",
    "&:hover": {
      borderColor: state.isFocused ? "#86b7fe" : "#ced4da",
    },
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: "0 6px",
  }),
  input: (base: any) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
  indicatorsContainer: (base: any) => ({
    ...base,
    height: "38px",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    padding: "4px",
  }),
  clearIndicator: (base: any) => ({
    ...base,
    padding: "4px",
  }),
};

const LoginContent = () => {
  const navigate = useNavigate();

  const [showOtpField, setShowOtpField] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState(false);
  const [countryCode, setCountryCode] = useState(countryOptions[0]);

  const otpRefs = useRef<HTMLInputElement[]>([]);
  const location = useLocation();

  const isValidPhone = (val: string) => {
    const regex = /^\d+$/; // one or more digits only
    return regex.test(val);
  };

  const validateEmail = (value: string) => {
    // Simple regex for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  // Handle OTP input auto-focus
  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, "");
    setOtp(newOtp);

    // Auto move to next box
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(true);

    // ✅ Email required check
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    // ✅ Email format validation
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!showOtpField) {
      // Send OTP
      if (!phone.trim()) {
        toast.error("Phone number is required");
        return;
      }

      if (!isValidPhone(phone)) {
        toast.error("Please enter a valid 10-digit phone number");
        return;
      }

      try {
        const response = await loginUser({
          phone,
          email,
          user_country: countryCode.label, // ✅ matches interface
        });
        // 👈 also send email if required
        if (response?.statusCode === 200) {
          toast.success(response?.message || "OTP sent successfully");
          setShowOtpField(true);
          setTimer(60);
        } else if (
          response?.response?.data?.errorMessage === "User not found"
        ) {
          // Register new user
          try {
            const registerRes = await register({
              userKeyID: "",
              firstName: "",
              lastName: "",
              email: email, // 👈 save email
              phone: phone,
              address: "",
              user_country: countryCode.label,
            });

            if (registerRes?.statusCode === 200) {
              const retryRes = await loginUser({
                phone,
                email,
                user_country: countryCode.label,
              });
              if (retryRes?.statusCode === 200) {
                toast.success(retryRes?.message || "OTP sent successfully");
                setShowOtpField(true);
                setTimer(60);
              } else {
                toast.error(
                  retryRes?.errorMessage ||
                    "Failed to send OTP after registration"
                );
              }
            } else {
              toast.error(
                registerRes?.errorMessage ||
                  "The mobile number you entered is incorrect. Please check and try again"
              );
            }
          } catch (error: any) {
            toast.error(
              error?.message || "Something went wrong while creating user"
            );
          }
        } else {
          toast.error(response?.errorMessage || "Failed to send OTP");
        }
      } catch (error: any) {
        toast.error(error?.message || "Something went wrong while sending OTP");
      }
    } else {
      // Verify OTP
      const otpValue = otp.join("");
      if (otpValue.length !== 4) {
        toast.error("Please enter a valid 4-digit OTP");
        return;
      }

      try {
        const otpResponse = await verifyOtp({
          phone,
          otp: otpValue,
          email,
          user_country: countryCode.label,
        });
        if (otpResponse?.statusCode === 200) {
          toast.success("OTP verified successfully");
          localStorage.removeItem("authUser");
          localStorage.setItem("Userlogin", JSON.stringify(otpResponse));

          const from = location.state?.from || "/";
          navigate(from, { replace: true });
        } else {
          toast.error(otpResponse?.errorMessage || "Invalid OTP");
        }
      } catch (error: any) {
        toast.error(
          error?.message || "Something went wrong during OTP verification"
        );
      }
    }
  };

  const resendOtp = async () => {
    try {
      const response = await loginUser({
        phone,
        email,
        user_country: countryCode.label,
      });
      if (response?.statusCode === 200) {
        toast.success("OTP resent successfully");
        setOtp(["", "", "", ""]);
        otpRefs.current[0]?.focus();
        setTimer(60);
      } else {
        toast.error(response?.errorMessage || "Failed to resend OTP");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong while resending OTP");
    }
  };

  const renderError = (value: string, customMessage?: string) =>
    error &&
    !value.trim() && (
      <span style={{ color: "red" }}>
        {customMessage || "This field is required"}
      </span>
    );

  const handleCountryChange = (selectedOption: any) => {
    setCountryCode(selectedOption);
  };

  console.log(countryCode);

  return (
    <div className="login-area main-login">
      <div className="container">
        <div className="login-items login-size">
          <div className="row">
            <div className="col-lg-12 login-col">
              <div className="login-forms">
                <h2>{showOtpField ? "Verify OTP" : "Login"}</h2>
                {showOtpField && (
                  <div className="alert alert-info text-center">
                    Please enter the OTP sent to phone number <b>({phone})</b>
                  </div>
                )}
                <form onSubmit={handleForm}>
                  <div className="form-group">
                    <input
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                      type="email"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={showOtpField}
                    />
                    {renderError(email)}
                  </div>

                  {/* Phone with React Select country code */}
                  <div className="form-group d-flex">
                    <div style={{ width: "150px", marginRight: "8px" }}>
                      <Select
                        options={countryOptions}
                        value={countryCode}
                        onChange={handleCountryChange}
                        styles={customStyles}
                        isClearable={false} // remove the X button
                        classNamePrefix="country-select"
                        menuPortalTarget={document.body} // <-- render menu in body
                        menuPosition="fixed"
                      />
                    </div>
                    <input
                      className="form-control no-arrows"
                      id="phone"
                      name="phone"
                      placeholder="Phone"
                      type="text"
                      maxLength={countryCode.value === 1 ? 10 : 20}
                      autoComplete="off"
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 10 && countryCode.value === 1)
                          setPhone(value);
                        else if (value.length <= 15 && countryCode.value !== 1)
                          setPhone(value);
                      }}
                      disabled={showOtpField}
                    />
                  </div>
                  {<div>{renderError(phone)}</div>}

                  {showOtpField && (
                    <>
                      <div className="d-flex justify-content-center align-items-center mb-3">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                              handleOtpChange(e.target.value, index)
                            }
                            onKeyDown={(e) => {
                              if (
                                e.key === "Backspace" &&
                                !otp[index] &&
                                index > 0
                              ) {
                                const newOtp = [...otp];
                                newOtp[index - 1] = "";
                                handleOtpChange("", index - 1);
                                otpRefs.current[index - 1].focus();
                              }
                            }}
                            ref={(el) => {
                              if (el) otpRefs.current[index] = el;
                            }}
                            className="form-control text-center main-otp"
                            style={{
                              width: "49px",
                              fontSize: "20px",
                              marginRight: "11px",
                              height: "49px",
                              padding: "15px",
                            }}
                          />
                        ))}
                      </div>

                      <div className="text-center mb-3">
                        <button
                          type="button"
                          className="btn btn-link p-0 send-otp"
                          onClick={resendOtp}
                          disabled={timer > 0}
                        >
                          {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                        </button>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="w-100 btn btn-primary send-otp"
                  >
                    {showOtpField ? "Verify OTP" : "Send OTP"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContent;

import React, { useState, useEffect, FormEventHandler } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  getUserProfile,
  addUpdateUserData,
} from "../../APIServices/UserLoginApi/UserLoginApi";
interface DataType {
  sectionClass?: string;
}

const ProfileContent = ({ sectionClass }: DataType) => {
  const navigate = useNavigate();

  const [userKeyID, setUserKeyID] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState(false);

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isValidPhone = (val: string) => /^[0-9]{10}$/.test(val);

  useEffect(() => {
    const storedData = localStorage.getItem("Userlogin"); // or your token storage key

    if (storedData) {
      const parsed = JSON.parse(storedData);
      console.log("Stored User Data:", parsed.responseData.data.userKeyID);
      if (parsed.responseData.data.userKeyID) {
        setUserKeyID(parsed.responseData.data.userKeyID);
        fetchProfile(parsed.responseData.data.userKeyID);
      } else {
        toast.error("User ID not found in local storage");
      }
    } else {
      toast.error("No user session found");
      navigate("/login");
    }
  }, []);

  const fetchProfile = async (id: string) => {
    try {
      const profile = await getUserProfile({ userKeyID: id }); // Pass ID to API
      if (profile?.statusCode === 200) {
        setFirstName(profile.responseData.data.FirstName || "");
        setLastName(profile.responseData.data.LastName || "");
        setEmail(profile.responseData.data.Email || "");
        setPhone(profile.responseData.data.Phone || "");
        setAddress(profile.responseData.data.Address || "");
      } else {
        toast.error(profile?.errorMessage || "Failed to load profile");
      }
    } catch (err) {
      toast.error("Something went wrong loading profile");
    }
  };

  const handleForm: FormEventHandler = async (event) => {
    event.preventDefault();
    setError(true);

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim()
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Invalid email address");
      return;
    }
    if (!isValidPhone(phone)) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    try {
      const response = await addUpdateUserData({
        userKeyID,
        firstName,
        lastName,
        email,
        phone,
        address,
        user_country: "🇮🇳 +91",
      });

      if (response?.statusCode === 200) {
        toast.success("Profile updated successfully");
        navigate("/");
      } else {
        toast.error(response?.errorMessage || "Profile update failed");
      }
    } catch (err) {
      toast.error("Something went wrong updating profile");
    }
  };

  const renderError = (value: string, customMessage?: string) =>
    error &&
    !value.trim() && (
      <span style={{ color: "red" }}>
        {customMessage || "This field is required"}
      </span>
    );

  return (
    <div className="login-area">
      <div className="container">
        <div className="login-items main-function">
          <div className="row">
            <div className="col-lg-12">
              <div className="login-forms">
                <h2>My Profile</h2>
                <p>Update your personal information</p>

                <form onSubmit={handleForm}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="First name"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        {renderError(firstName)}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Last name"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        {renderError(lastName)}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {renderError(email)}
                        {error && email.trim() && !isValidEmail(email) && (
                          <span style={{ color: "red" }}>
                            Invalid email format
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          className="form-control no-arrows"
                          placeholder="Phone"
                          type="text"
                          maxLength={10}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        {renderError(phone)}
                        {error && phone.trim() && !isValidPhone(phone) && (
                          <span style={{ color: "red" }}>
                            Phone must be exactly 10 digits
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="Street, City/Town, Postcode/Zip, State/Country"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {renderError(address)}
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <button type="submit">Save Changes</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;

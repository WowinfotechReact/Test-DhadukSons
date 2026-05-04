import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
// import {
//   addUpdateBannerAPI,
//   getBannerByIDAPI,
// } from "../../APIServices/BannerAPI/BannerAPI";
import SuccessPopUP from "../../components/SuccessPopUp";
import {
  addUpdateBannerAPI,
  getBannerByIDAPI,
} from "../../APIServices/BannerAPI/BannerAPI";
import { useLoader } from "../../Context/Context";

interface BannerData {
  bannerKeyID: string | null;
  bannerTitle: string;
  bannerSubTitle: string;
  bannerImage: string;
  status: string;
}

interface AddUpdateBannerModalProps {
  show: boolean;
  onHide: () => void;
  modalRequestData: {
    Action: string | null;
    bannerKeyID: string | null;
  };
  setAddUpdateActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultBannerData: BannerData = {
  bannerKeyID: null,
  bannerTitle: "",
  bannerSubTitle: "",
  bannerImage: "",
  status: "Active",
};

const AddUpdateBannerModal: React.FC<AddUpdateBannerModalProps> = ({
  show,
  onHide,
  modalRequestData,
  setAddUpdateActionDone,
}) => {
  const [formData, setFormData] = useState<BannerData>(defaultBannerData);
  const [error, setError] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const { setLoader } = useLoader();

  //   useEffect(() => {
  //     if (modalRequestData.bannerKeyID) {
  //       getBannerDataByID(modalRequestData.bannerKeyID);
  //     } else {
  //       setFormData(defaultBannerData); // reset when adding new
  //     }
  //   }, [modalRequestData.bannerKeyID]);

  useEffect(() => {
    if (modalRequestData?.bannerKeyID) {
      getBannerDataByID(modalRequestData.bannerKeyID);
    } else {
      setFormData(defaultBannerData); // reset when adding new
    }
  }, [modalRequestData]);

  const handleChange = (e: ChangeEvent<any>) => {
    setError(false);
    const { name, value } = e.target;

    let newValue = value;

    // Restrict Banner Title to only two words
    if (name === "bannerTitle") {
      // 1. Prevent empty space as first character
      if (newValue.startsWith(" ")) {
        newValue = newValue.trimStart();
      }

      // 2. Allow only letters and spaces (no digits/special chars)
      newValue = newValue.replace(/[^a-zA-Z\s]/g, "");

      // 3. Restrict to only two words
      // const words = newValue.trim().split(/\s+/);
     if (name === "bannerSubTitle") {
      if (newValue.startsWith(" ")) {
        newValue = newValue.trimStart();
      }
    }
      // 2. Allow only letters and spaces (no digits/special chars)
      newValue = newValue.replace(/[^a-zA-Z\s]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = () => {
    // debugger;
    let isValid = false;

    const bannerTitleWords = formData.bannerTitle.trim().split(/\s+/);
    // if (bannerTitleWords.length > 2) {
    //   setError(true);
    //   return;
    // }

    if (
      formData.bannerTitle === "" ||
      formData.bannerTitle === null ||
      formData.bannerTitle === undefined ||
      formData.bannerSubTitle === "" ||
      formData.bannerSubTitle === null ||
      formData.bannerSubTitle === undefined ||
      formData.bannerImage === "" ||
      formData.bannerImage === null ||
      formData.bannerImage === undefined ||
      formData.status === "" ||
      formData.status === null ||
      formData.status === undefined
    ) {
      isValid = true;
      setError(true);
      return;
    }

    const params = {
      bannerKeyID: modalRequestData.bannerKeyID,
      bannerTitle: formData.bannerTitle,
      bannerSubTitle: formData.bannerSubTitle,
      bannerImage: formData.bannerImage,
      // status: formData.status,
    };

    if (!isValid) {
      addUpdateBannerData(params);
    }
  };

  const addUpdateBannerData = async (params: any) => {
    setLoader(true);
    try {
      const res = await addUpdateBannerAPI(params);
      if (res.statusCode === 200) {
        setLoader(false);
        setAddUpdateActionDone(true);
        setShowSuccessPopUp(true);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const getBannerDataByID = async (bannerKeyID: string | null) => {
    // debugger;
    if (!bannerKeyID) return;
    setLoader(true);
    try {
      const res = await getBannerByIDAPI(bannerKeyID);
      if (res.statusCode === 200) {
        setLoader(false);
        const modalData = res.responseData.data;
        setFormData({
          bannerKeyID: modalData.bannerKeyID,
          bannerTitle: modalData.bannerTitle,
          bannerSubTitle: modalData.bannerSubTitle,
          bannerImage: modalData.bannerImage,
          status: modalData.status,
        });
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const closeAll = () => {
    setShowSuccessPopUp(false);
    onHide();
  };

  const setInitial = () => {
    setError(false);
    setFormData(defaultBannerData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024) {
        alert("Image size must be less than 500KB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          bannerImage: reader.result as string, // base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      bannerImage: "",
    }));
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header>
        <Modal.Title>
          {modalRequestData.bannerKeyID ? "Update Banner" : "Add Banner"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Banner Title <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="bannerTitle"
                  value={formData.bannerTitle}
                  onChange={handleChange}
                  placeholder="Enter banner title"
                  maxLength={255}
                />
                {error &&
                (formData.bannerTitle === "" ||
                  formData.bannerTitle === null ||
                  formData.bannerTitle === undefined) ? (
                  <span style={{ color: "red" }}>This field is required</span>
                ) : (
                  ""
                )}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Banner Sub Title <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="bannerSubTitle"
                  value={formData.bannerSubTitle}
                  onChange={handleChange}
                  placeholder="Enter banner sub title"
                  maxLength={255}
                />
                {error &&
                (formData.bannerSubTitle === "" ||
                  formData.bannerSubTitle === null ||
                  formData.bannerSubTitle === undefined) ? (
                  <span style={{ color: "red" }}>This field is required</span>
                ) : (
                  ""
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Banner Image <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="file"
                  name="bannerImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ lineHeight: "2.5" }}
                />
                {error &&
                (formData.bannerImage === "" ||
                  formData.bannerImage === null ||
                  formData.bannerImage === undefined) ? (
                  <span style={{ color: "red" }}>This field is required</span>
                ) : (
                  ""
                )}
                {formData.bannerImage && (
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                      marginTop: "10px",
                    }}
                  >
                    {/* Cross icon */}
                    <span
                      onClick={handleRemoveImage}
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        backgroundColor: "white",
                        border: "1px solid #ccc",
                        borderRadius: "50%",
                        cursor: "pointer",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "bold",
                        zIndex: 1,
                      }}
                      title="Remove Image"
                    >
                      ✖
                    </span>

                    {/* Image preview */}
                    <img
                      src={formData.bannerImage}
                      alt="Preview"
                      style={{
                        width: "120px",
                        height: "auto",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                )}
              </Form.Group>
              {/* Note below upload field */}
              <div style={{ fontSize: "12px", color: "#666" }}>
                * Allowed size: up to 500KB
              </div>
            </Col>
          </Row>
        </Form>
        {/* {error && (
          <p style={{ color: "red" }}>Please fill all the required fields.</p>
        )} */}
      </Modal.Body>

      <Modal.Footer>
        <button
          // style={{
          //   backgroundColor: "#2e7d32",
          //   color: "white",
          //   borderRadius: "0.375rem",
          //   padding: "10px 0",
          //   whiteSpace: "nowrap",
          // }}
          className="custom-button"
          onClick={() => {
            onHide();
            setInitial();
          }}
        >
          Close
        </button>
        <button
          // style={{
          //   backgroundColor: "#2e7d32",
          //   color: "white",
          //   borderRadius: "0.375rem",
          //   padding: "10px 0",
          //   whiteSpace: "nowrap",
          // }}
          className="custom-button"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </Modal.Footer>

      <SuccessPopUP
        show={showSuccessPopUp}
        onHide={() => {
          closeAll();
          setInitial();
        }}
        message={
          modalRequestData.bannerKeyID === null
            ? "Banner Added successfully!"
            : "Banner Updated successfully!"
        }
      />
    </Modal>
  );
};

export default AddUpdateBannerModal;

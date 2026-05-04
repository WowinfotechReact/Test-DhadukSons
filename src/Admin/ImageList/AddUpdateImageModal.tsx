import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import SuccessPopUP from "../../components/SuccessPopUp";
import {
  addUpdateImageAPI,
  getImageByIDAPI,
} from "../../APIServices/ImageAPI/ImageAPI";
import { useLoader } from "../../Context/Context";

interface ImageData {
  imageKeyID: string | null;
  imageTitle: string;
  image: string;
  status: string;
}

interface AddUpdateImageModalProps {
  show: boolean;
  onHide: () => void;
  modalRequestData: {
    Action: string | null;
    imageKeyID: string | null;
  };
  setAddUpdateActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultImageData: ImageData = {
  imageKeyID: null,
  imageTitle: "",
  image: "",
  status: "Active",
};

const AddUpdateImageModal: React.FC<AddUpdateImageModalProps> = ({
  show,
  onHide,
  modalRequestData,
  setAddUpdateActionDone,
}) => {
  const [formData, setFormData] = useState<ImageData>(defaultImageData);
  const [error, setError] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const { setLoader } = useLoader();

  useEffect(() => {
    if (modalRequestData?.imageKeyID) {
      getImageDataByID(modalRequestData.imageKeyID);
    } else {
      setFormData(defaultImageData); // reset when adding new
    }
  }, [modalRequestData]);

  const handleChange = (e: ChangeEvent<any>) => {
    setError(false);
    const { name, value } = e.target;

    let newValue = value;

    if (name === "imageTitle") {
      if (newValue.startsWith(" ")) {
        newValue = newValue.trimStart();
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
    let isValid = false;

    if (
      // formData.imageTitle === "" ||
      // formData.imageTitle === null ||
      // formData.imageTitle === undefined ||
      formData.image === "" ||
      formData.image === null ||
      formData.image === undefined ||
      formData.status === "" ||
      formData.status === null ||
      formData.status === undefined
    ) {
      isValid = true;
      setError(true);
      return;
    }

    const params = {
      imageKeyID: modalRequestData.imageKeyID,
      imageTitle: formData.imageTitle,
      image: formData.image,
      status: formData.status,
    };

    if (!isValid) {
      addUpdateImageData(params);
    }
  };

  const addUpdateImageData = async (params: any) => {
    setLoader(true);
    try {
      const res = await addUpdateImageAPI(params);
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

  const getImageDataByID = async (imageKeyID: string | null) => {
    if (!imageKeyID) return;
    setLoader(true);
    try {
      const res = await getImageByIDAPI(imageKeyID);
      if (res.statusCode === 200) {
        setLoader(false);
        const modalData = res.responseData.data;
        setFormData({
          imageKeyID: modalData.imageKeyID,
          imageTitle: modalData.imageTitle,
          image: modalData.image,
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
    setFormData(defaultImageData);
  };

  const [imageError, setImageError] = useState<string>("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024) {
        setImageError("Image size must be less than 500KB");
        return;
      } else {
        setImageError(""); // clear error if valid
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string, // base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide;
        setInitial();
      }}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          {modalRequestData.imageKeyID ? "Update Image" : "Add Image"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Image Title</Form.Label>
                <Form.Control
                  type="text"
                  name="imageTitle"
                  value={formData.imageTitle}
                  onChange={handleChange}
                  placeholder="Enter image title"
                  maxLength={255}
                />
                {/* {error &&
                (formData.imageTitle === "" ||
                  formData.imageTitle === null ||
                  formData.imageTitle === undefined) ? (
                  <span style={{ color: "red" }}>This field is required</span>
                ) : (
                  ""
                )} */}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Image <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ lineHeight: "2.5" }}
                />

                {error &&
                (formData.image === "" ||
                  formData.image === null ||
                  formData.image === undefined) ? (
                  <span style={{ color: "red" }}>This field is required</span>
                ) : null}

                {imageError && (
                  <span style={{ color: "red" }}>{imageError}</span>
                )}

                {formData.image && !imageError && (
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                      marginTop: "10px",
                    }}
                  >
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

                    <img
                      src={formData.image}
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
              <div
                style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}
              >
                * Allowed size: up to 500KB
              </div>
            </Col>
          </Row>

          {/* <Row></Row> */}
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
        onHide={closeAll}
        message={
          modalRequestData.imageKeyID === null
            ? "Image Added successfully!"
            : "Image Updated successfully!"
        }
      />
    </Modal>
  );
};

export default AddUpdateImageModal;

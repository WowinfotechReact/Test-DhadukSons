import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";

import { useLoader } from "../../../Context/Context";
import SuccessPopUP from "../../../components/SuccessPopUp";
import {
  addUpdateProductImage,
  getProductImage,
} from "../../../APIServices/ProductImageApi/ProductImageApi";

interface ImageData {
  productImageKeyID: string | null;
  productKeyID: string;
  imageUrl: string;
  imageUrlBack: string;
}

interface AddUpdateImageModalProps {
  show: boolean;
  onHide: () => void;
  modalRequestData: {
    Action: string | null;
    productImageKeyID: string | null;
    productKeyID: string;
  };
  setAddUpdateActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUpdateProductImage: React.FC<AddUpdateImageModalProps> = ({
  show,
  onHide,
  modalRequestData,
  setAddUpdateActionDone,
}) => {
  const defaultImageData: ImageData = {
    productImageKeyID: null,
    productKeyID: modalRequestData.productKeyID,
    imageUrl: "",
    imageUrlBack: "",
  };

  const [formData, setFormData] = useState<ImageData>(defaultImageData);
  const [error, setError] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const { setLoader } = useLoader();

  useEffect(() => {
    if (modalRequestData?.productImageKeyID) {
      getImageDataByID(modalRequestData.productImageKeyID);
    } else {
      setFormData({
        productImageKeyID: null,
        productKeyID: modalRequestData.productKeyID,
        imageUrl: "",
        imageUrlBack: "",
      });
    }
  }, [show]); // 👈 Only run when modal is shown

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // ✅ Check file size (2MB = 2 * 1024 * 1024 bytes)
      if (file.size > 2 * 1024 * 1024) {
        setError(true);
        setFormData((prev) => ({
          ...prev,
          imageUrl: "",
        }));
        return;
      } else {
        setError(false);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUploadBack = (e: React.ChangeEvent<HTMLInputElement>) => {
    debugger;
    const file = e.target.files?.[0];
    if (file) {
      // ✅ Check file size (2MB = 2 * 1024 * 1024 bytes)
      if (file.size > 2 * 1024 * 1024) {
        setError(true);
        setFormData((prev) => ({
          ...prev,
          imageUrlBack: "",
        }));
        return;
      } else {
        setError(false);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageUrlBack: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));
  };

  const handleRemoveImageBack = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrlBack: "",
    }));
  };

  const handleSubmit = () => {
    if (!formData.imageUrl) {
      setError(true);
      return;
    }

    if (!formData.imageUrlBack) {
      setError(true);
      return;
    }

    const params = {
      productImageKeyID: modalRequestData.productImageKeyID,
      productKeyID: modalRequestData.productKeyID,
      imageUrl: formData.imageUrl,
      imageUrlBack: formData.imageUrlBack,
    };

    addUpdateImageData(params);
  };

  const addUpdateImageData = async (params: any) => {
    setLoader(true);
    try {
      const res = await addUpdateProductImage(params);
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

  const convertImageUrlToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const getImageDataByID = async (productImageKeyID: string | null) => {
    if (!productImageKeyID) return;
    setLoader(true);
    try {
      const res = await getProductImage(productImageKeyID);
      if (res.statusCode === 200) {
        const modalData = res.responseData.data;
        const base64Front = await convertImageUrlToBase64(modalData.imageUrl);
        const base64Back = await convertImageUrlToBase64(
          modalData.imageUrlBack
        );
        setFormData({
          productImageKeyID: modalData.productImageKeyID,
          productKeyID: modalRequestData.productKeyID,
          imageUrl: base64Front,
          imageUrlBack: base64Back,
        });
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const closeAll = () => {
    setShowSuccessPopUp(false);
    setFormData(defaultImageData);
    onHide();
  };

  return (
    <Modal show={show} onHide={closeAll} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {modalRequestData.productImageKeyID ? "Update Image" : "Add Image"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Front Image <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="file"
                  name="imageUrl"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {error && (
                  <span style={{ color: "red" }}>
                    {formData.imageUrl ? "File size should not exceed 2MB" : ""}
                  </span>
                )}

                {error && !formData.imageUrl && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}

                {formData.imageUrl && (
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
                      src={formData.imageUrl}
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
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Back Image <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="file"
                  name="imageUrl-back"
                  accept="image/*"
                  onChange={handleImageUploadBack}
                />
                {error && (
                  <span style={{ color: "red" }}>
                    {formData.imageUrlBack
                      ? "File size should not exceed 2MB"
                      : ""}
                  </span>
                )}

                {error && !formData.imageUrlBack && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}

                {formData.imageUrlBack && (
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                      marginTop: "10px",
                    }}
                  >
                    <span
                      onClick={handleRemoveImageBack}
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
                      src={formData.imageUrlBack}
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
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <button className="custom-button" onClick={closeAll}>
          Close
        </button>
        <button className="custom-button" onClick={handleSubmit}>
          Save Changes
        </button>
      </Modal.Footer>

      <SuccessPopUP
        show={showSuccessPopUp}
        onHide={closeAll}
        message={
          modalRequestData.productImageKeyID
            ? "Image Updated successfully!"
            : "Image Added successfully!"
        }
      />
    </Modal>
  );
};

export default AddUpdateProductImage;

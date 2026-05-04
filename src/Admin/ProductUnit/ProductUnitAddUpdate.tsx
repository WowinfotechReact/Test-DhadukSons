import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import SuccessPopUP from "../../components/SuccessPopUp";

import {
  addUpdateProdCatAPI,
  getProdCatByIDAPI,
} from "../../APIServices/ProdCatAPI/ProdCatAPI";
import { useLoader } from "../../Context/Context";
import {
  addUpdateProductUnit,
  getProductUnitDetails,
} from "../../APIServices/ProductUnitApi/ProductUnitApi";

interface ProdCatData {
  productUnitKeyID: string;
  productUnitName: string;
  status: string;
}

interface AddUpdateImageModalProps {
  show: boolean;
  onHide: () => void;
  modalRequestData: {
    Action: string | null;
    productUnitKeyID: string | null;
  };
  setAddUpdateActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultImageData: ProdCatData = {
  productUnitKeyID: "",
  productUnitName: "",
  status: "",
};

const ProductUnitAddUpdate: React.FC<AddUpdateImageModalProps> = ({
  show,
  onHide,
  modalRequestData,
  setAddUpdateActionDone,
}) => {
  const [formData, setFormData] = useState<ProdCatData>(defaultImageData);
  const [error, setError] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const { setLoader } = useLoader();

  useEffect(() => {
    if (show && modalRequestData.productUnitKeyID) {
      getProdCatDataByID(modalRequestData.productUnitKeyID);
    } else if (show && !modalRequestData.productUnitKeyID) {
      setFormData(defaultImageData);
    }
  }, [modalRequestData.productUnitKeyID, show]);

  const handleChange = (e: ChangeEvent<any>) => {
    setError(false);
    const { name, value } = e.target;
    let newValue = value;

    // Restrict Banner Title to only two words
    if (name === "productUnitName") {
      // 1. Prevent empty space as first character
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
      formData.productUnitName === "" ||
      formData.productUnitName === null ||
      formData.productUnitName === undefined
    ) {
      isValid = true;
      setError(true);
      return;
    }

    const params = {
      productUnitKeyID: modalRequestData.productUnitKeyID,
      productUnitName: formData.productUnitName,
      //   status: formData.status,
    };

    if (!isValid) {
      addUpdateProdCatData(params);
    }
  };

  const addUpdateProdCatData = async (params: any) => {
    setLoader(true);
    try {
      const res = await addUpdateProductUnit(params);
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

  const getProdCatDataByID = async (productUnitKeyID: string | null) => {
    if (!productUnitKeyID) return;
    try {
      const res = await getProductUnitDetails(productUnitKeyID);
      if (res.statusCode === 200) {
        const modalData = res.responseData.data;
        setFormData({
          productUnitKeyID: modalData.productUnitKeyID,
          productUnitName: modalData.productName,
          status: modalData.status,
        });
      }
    } catch (error) {
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
    >
      <Modal.Header>
        <Modal.Title>
          {modalRequestData.productUnitKeyID
            ? "Update Product Unit"
            : "Add Product Unit"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Product Unit <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="productUnitName"
                  value={formData.productUnitName}
                  onChange={handleChange}
                  placeholder="Enter Product Unit"
                  maxLength={255}
                />
                {error &&
                (formData.productUnitName === "" ||
                  formData.productUnitName === null ||
                  formData.productUnitName === undefined) ? (
                  <span style={{ color: "red" }}>This field is required</span>
                ) : (
                  ""
                )}
              </Form.Group>
            </Col>

            {/* <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Activate">Activate</option>
                  <option value="Deactivate">Deactivate</option>
                </Form.Select>
              </Form.Group>
            </Col> */}
          </Row>

          {/* <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ lineHeight: "2.5" }}
                />

                {formData.image && (
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
            </Col>
          </Row> */}

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
          type="submit"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </Modal.Footer>

      <SuccessPopUP
        show={showSuccessPopUp}
        onHide={closeAll}
        message={
          modalRequestData.productUnitKeyID === null
            ? "Product Unit Added successfully!"
            : "Product Unit Updated successfully!"
        }
      />
    </Modal>
  );
};

export default ProductUnitAddUpdate;

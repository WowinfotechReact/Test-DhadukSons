import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import SuccessPopUP from "../../components/SuccessPopUp";
import {
  addUpdateImageAPI,
  getImageByIDAPI,
} from "../../APIServices/ImageAPI/ImageAPI";
import {
  addUpdateProdCatAPI,
  getProdCatByIDAPI,
} from "../../APIServices/ProdCatAPI/ProdCatAPI";
import { useLoader } from "../../Context/Context";

interface ProdCatData {
  productCatKeyID: string;
  productCatName: string;
  status: string;
}

interface AddUpdateImageModalProps {
  show: boolean;
  onHide: () => void;
  modalRequestData: {
    Action: string | null;
    productCatKeyID: string | null;
  };
  setAddUpdateActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultImageData: ProdCatData = {
  productCatKeyID: "",
  productCatName: "",
  status: "",
};

const AddUpdateProdCatModal: React.FC<AddUpdateImageModalProps> = ({
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
    if (modalRequestData?.productCatKeyID) {
      getProdCatDataByID(modalRequestData.productCatKeyID);
    } else {
      setFormData(defaultImageData); // reset when adding new
    }
  }, [modalRequestData]);

  const handleChange = (e: ChangeEvent<any>) => {
    setError(false);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    let isValid = false;

    if (
      formData.productCatName === "" ||
      formData.productCatName === null ||
      formData.productCatName === undefined
    ) {
      isValid = true;
      setError(true);
      return;
    }

    const params = {
      productCatKeyID: modalRequestData.productCatKeyID,
      productCatName: formData.productCatName,
      //   status: formData.status,
    };

    if (!isValid) {
      addUpdateProdCatData(params);
    }
  };

  const addUpdateProdCatData = async (params: any) => {
    setLoader(true);
    try {
      const res = await addUpdateProdCatAPI(params);
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

  const getProdCatDataByID = async (productCatKeyID: string | null) => {
    if (!productCatKeyID) return;
    try {
      const res = await getProdCatByIDAPI(productCatKeyID);
      if (res.statusCode === 200) {
        const modalData = res.responseData.data;
        setFormData({
          productCatKeyID: modalData.productCatKeyID,
          productCatName: modalData.productCatName,
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
          {modalRequestData.productCatKeyID
            ? "Update Product Category"
            : "Add Product Category"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Product Category <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="productCatName"
                  value={formData.productCatName}
                  onChange={handleChange}
                  placeholder="Enter Product Category"
                  maxLength={255}
                />
                {error &&
                (formData.productCatName === "" ||
                  formData.productCatName === null ||
                  formData.productCatName === undefined) ? (
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
          modalRequestData.productCatKeyID === null
            ? "Product Category Added successfully!"
            : "Product Category Updated successfully!"
        }
      />
    </Modal>
  );
};

export default AddUpdateProdCatModal;

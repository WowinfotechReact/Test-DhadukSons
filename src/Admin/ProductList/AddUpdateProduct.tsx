import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import { useLoader } from "../../Context/Context";
import {
  addUpdateProduct,
  getProductDetails,
} from "../../APIServices/ProductApi/ProductApi";
import SuccessPopUP from "../../components/SuccessPopUp";

interface AdminData {
  productKeyID: string | null;
  productTitle: string;
  productDescription: string;
  slug: string;
}

interface AddUpdateAdminModalProps {
  show: boolean;
  onHide: () => void;
  modalRequestData: {
    Action: string | null;
    productKeyID: string | null;
  };
  setAddUpdateActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultAdminData: AdminData = {
  productKeyID: null,
  productTitle: "",
  productDescription: "",
  slug: "",
};

const AddUpdateProduct: React.FC<AddUpdateAdminModalProps> = ({
  show,
  onHide,
  modalRequestData,
  setAddUpdateActionDone,
}) => {
  const [formData, setFormData] = useState<AdminData>(defaultAdminData);
  const [error, setError] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const { setLoader } = useLoader();

  useEffect(() => {
    if (show && modalRequestData.productKeyID) {
      GetAdminDataByID(modalRequestData.productKeyID);
    } else if (show && !modalRequestData.productKeyID) {
      setFormData(defaultAdminData);
    }
  }, [modalRequestData.productKeyID, show]);

  const handleChange = (e: any) => {
    setError(false);
    const { name, value } = e.target;
    let newValue = value;

    // Restrict Banner Title to only two words
    if (name === "productTitle") {
      // 1. Prevent empty space as first character
      if (newValue.startsWith(" ")) {
        newValue = newValue.trimStart();
      }

      // 2. Allow only letters and spaces (no digits/special chars)
      newValue = newValue.replace(/[^a-zA-Z\s]/g, "");
    } else if (name === "productDescription") {
      if (newValue.startsWith(" ")) {
        newValue = newValue.trimStart();
      }
    } else if (name === "slug") {
      // 1. Prevent empty space as first character
      if (newValue.startsWith(" ")) {
        newValue = newValue.trimStart();
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = () => {
    let isValid = false;

    if (
      formData.productTitle === "" ||
      formData.productTitle === null ||
      formData.productTitle === undefined ||
      formData.productDescription === "" ||
      formData.productDescription === null ||
      formData.productDescription === undefined ||
      formData.slug === "" ||
      formData.slug === null ||
      formData.slug === undefined
    ) {
      isValid = true;
      setError(true);
    }

    const params = {
      productKeyID: modalRequestData.productKeyID,
      productTitle: formData.productTitle,
      productDescription: formData.productDescription,
      slug: formData.slug,
    };

    if (!isValid) {
      AddUpdateAdminData(params);
    }
  };

  const AddUpdateAdminData = async (params: any) => {
    try {
      const res = await addUpdateProduct(params);

      if (res.statusCode === 200) {
        setAddUpdateActionDone(true);
        setShowSuccessPopUp(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetAdminDataByID = async (productKeyID: string | null) => {
    if (!productKeyID) return;
    setLoader(true);
    try {
      const res = await getProductDetails(productKeyID);

      if (res.statusCode === 200) {
        setLoader(false);

        const modalData = res.responseData?.data; // direct object

        if (modalData) {
          setFormData({
            productKeyID: modalData.productKeyID || null,
            productTitle: modalData.productTitle || "",
            productDescription: modalData.productDescription || "",
            slug: modalData.slug || "",
          });
        } else {
          setFormData(defaultAdminData);
        }
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
    setFormData(defaultAdminData);
  };

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>
          {modalRequestData.productKeyID ? "Update Product" : "Add Product"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Product Name <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  maxLength={100}
                  name="productTitle"
                  value={formData.productTitle}
                  onChange={handleChange}
                  placeholder="Enter Product Name"
                />
                {error &&
                (formData.productTitle === "" ||
                  formData.productTitle === null ||
                  formData.productTitle === undefined) ? (
                  <span style={{ color: "red" }}>This field is required</span>
                ) : (
                  ""
                )}
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Slug <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  maxLength={100}
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="Enter Slug"
                />
                {error &&
                (formData.slug === "" ||
                  formData.slug === null ||
                  formData.slug === undefined) ? (
                  <span style={{ color: "red" }}>This field is required</span>
                ) : (
                  ""
                )}
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Product Description <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  placeholder="Enter Product Description"
                />
                {error &&
                (formData.productDescription === "" ||
                  formData.productDescription === null ||
                  formData.productDescription === undefined) ? (
                  <span style={{ color: "red" }}>This field is required</span>
                ) : (
                  ""
                )}
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="custom-button"
          onClick={() => {
            onHide();
            setInitial();
          }}
        >
          Close
        </button>
        <button className="custom-button" onClick={handleSubmit}>
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
          modalRequestData.productKeyID === null
            ? "Product Added successfully!"
            : "Product Updated successfully!"
        }
      />
    </Modal>
  );
};

export default AddUpdateProduct;

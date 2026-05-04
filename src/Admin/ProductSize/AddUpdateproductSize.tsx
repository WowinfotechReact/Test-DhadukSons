import React, { useState, useEffect } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { useLoader } from "../../Context/Context";
import {
  addUpdateProductSize,
  getProductSizeDetails,
} from "../../APIServices/ProducrSizeApi/ProductSizeApi";

import SuccessPopUP from "../../components/SuccessPopUp";
import { getProductLookupList } from "../../APIServices/ProductApi/ProductApi";
import { unitLookupList } from "../../APIServices/ProductUnitApi/ProductUnitApi";

interface ProductUnit {
  productUnitKeyID: string;
  productUnitName: string;
}

interface Product {
  productKeyID: string;
  productTitle: string;
}

interface AdminData {
  productSizeKeyID: string | null;
  productKeyID: string | null;
  productUnitKeyID: string | null;
  productSize: string;
  productPrice: string;
  productPriceUSD: string;
  productDiscount: string;
  productDiscountUSD: string;
}

interface AddUpdateAdminModalProps {
  show: boolean;
  onHide: () => void;
  modalRequestData: {
    Action: string | null;
    productSizeKeyID: string | null;
    productKeyID?: string | null; // ✅ include productKeyID
  };
  setAddUpdateActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultAdminData: AdminData = {
  productSizeKeyID: null,
  productKeyID: null,
  productUnitKeyID: null,
  productSize: "",
  productPrice: "",
  productPriceUSD: "",
  productDiscount: "",
  productDiscountUSD: "",
};

const AddUpdateproductSize: React.FC<AddUpdateAdminModalProps> = ({
  show,
  onHide,
  modalRequestData,
  setAddUpdateActionDone,
}) => {
  const [formData, setFormData] = useState<AdminData>(defaultAdminData);
  const [error, setError] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const { setLoader } = useLoader();

  const [productList, setProductList] = useState<Product[]>([]);
  const [unitList, setUnitList] = useState<ProductUnit[]>([]);

  // Fetch dropdown data
  useEffect(() => {
    if (show) {
      fetchProductList();
      fetchUnitList();
    }
  }, [show]);

  const fetchProductList = async () => {
    try {
      const res = await getProductLookupList(null);
      if (res.statusCode === 200) {
        setProductList(res.responseData?.data || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUnitList = async () => {
    try {
      const res = await unitLookupList(null);
      if (res.statusCode === 200) {
        setUnitList(res.responseData?.data || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Get data for update
  useEffect(() => {
    if (show && modalRequestData.productSizeKeyID) {
      GetAdminDataByID(modalRequestData.productSizeKeyID);
    } else if (show && !modalRequestData.productSizeKeyID) {
      setFormData(defaultAdminData);
    }
  }, [modalRequestData.productSizeKeyID, show]);

  const GetAdminDataByID = async (productSizeKeyID: string | null) => {
    if (!productSizeKeyID) return;
    setLoader(true);
    try {
      const res = await getProductSizeDetails(productSizeKeyID);
      if (res.statusCode === 200) {
        setLoader(false);
        const modalData = res.responseData?.data;
        if (modalData) {
          setFormData({
            productSizeKeyID: modalData.productSizeKeyID || null,
            productKeyID: modalData.ProductKeyID || null,
            productUnitKeyID: modalData.ProductUnitKeyID || null,
            productSize: modalData.ProductSize || "",
            productPrice: modalData.productPrice || "", // Note: check if API returns ProductPrice or productPrice
            productPriceUSD: modalData.productPriceUSD || "", // Note: check if API returns ProductPrice or productPrice
            productDiscount: modalData.productDiscount || "",
            productDiscountUSD: modalData.productDiscountUSD || "",
          });
        }
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
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
      !formData.productUnitKeyID ||
      !formData.productSize ||
      !formData.productPrice ||
      !formData.productPriceUSD
    ) {
      isValid = true;
      setError(true);
    }
    if (!isValid) {
      AddUpdateAdminData({
        ...formData,
        productKeyID: modalRequestData.productKeyID, // ✅ this is correct
        productSizeKeyID: modalRequestData.productSizeKeyID,
      });
    }
  };

  const AddUpdateAdminData = async (params: any) => {
    try {
      const res = await addUpdateProductSize(params);
      if (res.statusCode === 200) {
        setAddUpdateActionDone(true);
        setShowSuccessPopUp(true);
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
    setFormData(defaultAdminData);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>
          {modalRequestData.productSizeKeyID
            ? "Update Product Size"
            : "Add Product Size"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            {/* <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Product <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Select
                  name="productKeyID"
                  value={formData.productKeyID || ""}
                  onChange={handleChange}
                >
                  <option disabled value="">Select Product</option>
                  {productList.map((p) => (
                    <option key={p.productKeyID} value={p.productKeyID}>
                      {p.productTitle}
                    </option>
                  ))}
                </Form.Select>
                {error && !formData.productKeyID && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </Form.Group>
            </Col> */}

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Product Unit <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select
                  name="productUnitKeyID"
                  value={formData.productUnitKeyID || ""}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Select Unit
                  </option>
                  {unitList.map((u) => (
                    <option key={u.productUnitKeyID} value={u.productUnitKeyID}>
                      {u.productUnitName}
                    </option>
                  ))}
                </Form.Select>
                {error && !formData.productUnitKeyID && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Size <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="productSize"
                  value={formData.productSize}
                  onChange={handleChange}
                  placeholder="Enter Size"
                />
                {error && !formData.productSize && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </Form.Group>
            </Col>

            {/* Price in rupees */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Price (in ₹)<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="productPrice"
                  value={formData.productPrice}
                  onChange={handleChange}
                  placeholder="Enter Price"
                />
                {error && !formData.productPrice && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Discount (% for ₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="productDiscount"
                  value={formData.productDiscount}
                  onChange={handleChange}
                  placeholder="Enter Discount"
                />
                {error && !formData.productDiscount && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </Form.Group>
            </Col>

            {/* Price  in USD */}

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Price (in $)<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="productPriceUSD"
                  value={formData.productPriceUSD}
                  onChange={handleChange}
                  placeholder="Enter Price"
                />
                {error && !formData.productPriceUSD && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Discount (% for $)</Form.Label>
                <Form.Control
                  type="number"
                  name="productDiscountUSD"
                  value={formData.productDiscountUSD}
                  onChange={handleChange}
                  placeholder="Enter Discount"
                />
                {error && !formData.productDiscountUSD && (
                  <span style={{ color: "red" }}>This field is required</span>
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
          modalRequestData.productSizeKeyID === null
            ? "Product Size Added successfully!"
            : "Product Size Updated successfully!"
        }
      />
    </Modal>
  );
};

export default AddUpdateproductSize;

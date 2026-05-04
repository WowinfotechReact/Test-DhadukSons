import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import {
  addUpdateAdminAPI,
  getAdminByIDAPI,
} from "../../APIServices/AdminAPI/AdminAPI";
import SuccessPopUP from "../../components/SuccessPopUp";
import {
  addUpdateEnquiryAPI,
  getEnquiryByIDAPI,
} from "../../APIServices/EnquiryAPI/EnquiryAPI";
import { useLoader } from "../../Context/Context";

interface AdminData {
  enquiryKeyID: null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  message: string;
}

interface AddUpdateEnquiryModalProps {
  show: boolean;
  onHide: () => void;
  modalRequestData: {
    Action: string | null;
    enquiryKeyID: string | null;
  };
  setAddUpdateActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultAdminData: AdminData = {
  enquiryKeyID: null,
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  message: "",
};

const AddUpdateEnquiryModal: React.FC<AddUpdateEnquiryModalProps> = ({
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
    if (modalRequestData.enquiryKeyID) {
      GetEnquiryDataByID(modalRequestData.enquiryKeyID);
    } else {
      setFormData(defaultAdminData); // reset to default when adding new
    }
  }, [modalRequestData.enquiryKeyID]);

  const handleChange = (e: any) => {
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
      formData.firstName === "" ||
      formData.firstName === null ||
      formData.firstName === undefined ||
      formData.lastName === "" ||
      formData.lastName === null ||
      formData.lastName === undefined ||
      formData.email === "" ||
      formData.email === null ||
      formData.email === undefined ||
      formData.phoneNumber === "" ||
      formData.phoneNumber === null ||
      formData.phoneNumber === undefined ||
      formData.message === "" ||
      formData.message === null ||
      formData.message === undefined
    ) {
      isValid = true;
      setError(true);
    } else if (formData.email && !isValidEmail(formData.email)) {
      isValid = true;
      setError(true);
    }

    const params = {
      enquiryKeyID: modalRequestData.enquiryKeyID,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      message: formData.message,

      // status: formData.status,
    };

    if (!isValid) {
      AddUpdateEnquiryData(params);
    }
  };

  const AddUpdateEnquiryData = async (params: any) => {
    setLoader(true);
    try {
      const res = await addUpdateEnquiryAPI(params);

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

  const GetEnquiryDataByID = async (enquiryKeyID: string | null) => {
    if (!enquiryKeyID) return; // don't call API if null
    setLoader(true);
    try {
      const res = await getEnquiryByIDAPI(enquiryKeyID);

      if (res.statusCode === 200) {
        setLoader(false);
        const modalData = res.responseData.data[0];
        setFormData((prev) => ({
          ...prev,
          firstName: modalData.firstName,
          lastName: modalData.lastName,
          email: modalData.email,
          phoneNumber: modalData.phoneNumber,
          message: modalData.message,
        }));
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

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const setInitial = () => {
    setError(false);
    setFormData(defaultAdminData);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header>
        <Modal.Title>
          {modalRequestData.enquiryKeyID ? "Update Enquiry" : "Add Enquiry"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  First Name <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  maxLength={100}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  disabled
                />
                {error &&
                (formData.firstName === "" ||
                  formData.firstName === null ||
                  formData.firstName === undefined) ? (
                  <span style={{ color: "red" }}>This field is required</span>
                ) : (
                  ""
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Last Name <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  maxLength={100}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  disabled
                />
                {error &&
                (formData.lastName === "" ||
                  formData.lastName === null ||
                  formData.lastName === undefined) ? (
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
                  Phone Number <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  maxLength={10}
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    const onlyNumbers = e.target.value.replace(/\D/g, ""); // Remove non-digits
                    setFormData((prev) => ({
                      ...prev,
                      phoneNumber: onlyNumbers,
                    }));
                  }}
                  placeholder="Enter Phone Number"
                  disabled
                />

                {error &&
                (formData.phoneNumber === "" ||
                  formData.phoneNumber === null ||
                  formData.phoneNumber === undefined) ? (
                  <span style={{ color: "red" }}>This field is required</span>
                ) : (
                  ""
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Email <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  maxLength={100}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  disabled
                />
                {error &&
                (formData.email === "" ||
                  formData.email === null ||
                  formData.email === undefined) ? (
                  <span style={{ color: "red" }}>This field is required</span>
                ) : formData.email && !isValidEmail(formData.email) ? (
                  <span style={{ color: "red" }}>
                    Please enter a valid email
                  </span>
                ) : (
                  ""
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group controlId="exampleTextarea">
                <Form.Label>
                  Message <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  maxLength={500}
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter Message here"
                  disabled
                />
                {error &&
                (formData.message === "" ||
                  formData.message === null ||
                  formData.message === undefined) ? (
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
          // style={{
          //   backgroundColor: "#2e7d32",
          //   color: "white",
          //   borderRadius: "0.375rem",
          //   padding: "10px 0",
          //   whiteSpace: "nowrap",
          // }}
          onClick={() => {
            onHide();
            setInitial();
          }}
          className="custom-button"
        >
          Close
        </button>
        {/* <button
          // style={{
          //   backgroundColor: "#2e7d32",
          //   color: "white",
          //   borderRadius: "0.375rem",
          //   padding: "10px 0",
          //   whiteSpace: "nowrap",
          // }}
          onClick={handleSubmit}
          className="custom-button"
        >
          Save Changes
        </button> */}
      </Modal.Footer>

      <SuccessPopUP
        show={showSuccessPopUp}
        onHide={closeAll}
        message={
          modalRequestData.enquiryKeyID === null
            ? "Enquiry Added successfully!"
            : "Enquiry Updated successfully!"
        }
      />
    </Modal>
  );
};

export default AddUpdateEnquiryModal;

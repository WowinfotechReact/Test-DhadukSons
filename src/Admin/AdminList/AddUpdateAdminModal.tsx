import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import {
  addUpdateAdminAPI,
  getAdminByIDAPI,
} from "../../APIServices/AdminAPI/AdminAPI";
import SuccessPopUP from "../../components/SuccessPopUp";
import { useLoader } from "../../Context/Context";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface AdminData {
  adminKeyID: string | null;
  firstName: string;
  lastName: string;
  phoneNo: string;
  email: string;
  status: string;
  password: string;
}

interface AddUpdateAdminModalProps {
  show: boolean;
  onHide: () => void;
  modalRequestData: {
    Action: string | null;
    adminKeyID: string | null;
  };
  setAddUpdateActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultAdminData: AdminData = {
  adminKeyID: null,
  firstName: "",
  lastName: "",
  phoneNo: "",
  email: "",
  status: "Activate",
  password: "",
};

const AddUpdateAdminModal: React.FC<AddUpdateAdminModalProps> = ({
  show,
  onHide,
  modalRequestData,
  setAddUpdateActionDone,
}) => {
  const [formData, setFormData] = useState<AdminData>(defaultAdminData);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const { setLoader } = useLoader();

  useEffect(() => {
    if (modalRequestData.adminKeyID) {
      GetAdminDataByID(modalRequestData.adminKeyID);
    } else {
      setFormData(defaultAdminData); // reset to default when adding new
    }
  }, [modalRequestData.adminKeyID]);

  const handleChange = (e: any) => {
    setError(false);
    const { name, value } = e.target;

    let newValue = value;

    if (name === "firstName" || name === "lastName") {
      // Prevent empty space as first character
      if (newValue.startsWith(" ")) {
        newValue = newValue.trimStart();
      }
      newValue = newValue.replace(/[^a-zA-Z\s]/g, "");
    } else if (name === "phoneNo") {
      // Allow only digits
      newValue = newValue.replace(/\D/g, "");
    } else if (name === "password") {
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
      formData.firstName === "" ||
      formData.firstName === null ||
      formData.firstName === undefined ||
      formData.lastName === "" ||
      formData.lastName === null ||
      formData.lastName === undefined ||
      formData.email === "" ||
      formData.email === null ||
      formData.email === undefined ||
      // formData.status === "" ||
      // formData.status === null ||
      // formData.status === undefined ||
      formData.phoneNo === "" ||
      formData.phoneNo === null ||
      formData.phoneNo === undefined
    ) {
      isValid = true;
      setError(true);
    } else if (formData.email && !isValidEmail(formData.email)) {
      isValid = true;
      setError(true);
    }
    if (
      modalRequestData.adminKeyID === null &&
      (formData.password === "" ||
        formData.password === null ||
        formData.password === undefined)
    ) {
      isValid = true;
      setError(true);
    }

    const params = {
      adminKeyID: modalRequestData.adminKeyID,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNo: formData.phoneNo,
      email: formData.email,
      password: formData.password,
      // status: formData.status,
    };

    if (!isValid) {
      AddUpdateAdminData(params);
    }
  };

  const AddUpdateAdminData = async (params: any) => {
    try {
      const res = await addUpdateAdminAPI(params);

      if (res.statusCode === 200) {
        setAddUpdateActionDone(true);
        setShowSuccessPopUp(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetAdminDataByID = async (adminKeyID: string | null) => {
    if (!adminKeyID) return; // don't call API if null
    setLoader(true);
    try {
      const res = await getAdminByIDAPI(adminKeyID);

      if (res.statusCode === 200) {
        setLoader(false);
        const modalData = res.responseData.data[0];
        setFormData((prev) => ({
          ...prev,
          firstName: modalData.firstName,
          lastName: modalData.lastName,
          email: modalData.email,
          phoneNo: modalData.phoneNo,
          status: modalData.status,
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

  const setInitial = () => {
    setError(false);
    setFormData(defaultAdminData);
  };

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header>
        <Modal.Title>
          {modalRequestData.adminKeyID ? "Update Admin" : "Add Admin"}
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
                  name="phoneNo"
                  maxLength={10}
                  value={formData.phoneNo}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                />
                {error &&
                (formData.phoneNo === "" ||
                  formData.phoneNo === null ||
                  formData.phoneNo === undefined) ? (
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
                  autoComplete="off"
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
            {!modalRequestData.adminKeyID && (
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Password <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      maxLength={100}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                      autoComplete="new-password"
                    />
                    <button
                      style={{
                        backgroundColor: "#2e7d32",
                        color: "white",
                        borderRadius: "0.375rem",
                        padding: "10px 30px",
                        whiteSpace: "nowrap",
                      }}
                      onClick={togglePasswordVisibility}
                      type="button"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </InputGroup>
                  {error &&
                  (formData.password === "" ||
                    formData.password === null ||
                    formData.password === undefined) ? (
                    <span style={{ color: "red" }}>This field is required</span>
                  ) : (
                    ""
                  )}
                </Form.Group>
              </Col>
            )}

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
          modalRequestData.adminKeyID === null
            ? "Admin Added Successfully!"
            : "Admin Updated Successfully!"
        }
      />
    </Modal>
  );
};

export default AddUpdateAdminModal;

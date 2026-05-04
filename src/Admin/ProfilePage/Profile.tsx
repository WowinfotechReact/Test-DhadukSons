import React, { useEffect, useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import {
  addUpdateAdminAPI,
  getAdminByIDAPI,
} from "../../APIServices/AdminAPI/AdminAPI";
import { useAuth } from "../../Context/Context";
import SuccessPopUP from "../../components/SuccessPopUp";

const AdminProfile: React.FC = () => {
  const { user } = useAuth();
  const [error, setError] = useState(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
  });

  useEffect(() => {
    if (user?.adminKeyID) {
      GetAdminDataByID(user?.adminKeyID);
    } else {
      setFormData(formData); // reset to default when adding new
    }
  }, [user?.adminKeyID]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    }
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const GetAdminDataByID = async (adminKeyID: string | null) => {
    if (!adminKeyID) return; // don't call API if null
    try {
      const res = await getAdminByIDAPI(adminKeyID);

      if (res.statusCode === 200) {
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
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = false;

    if (
      formData.firstName === "" ||
      formData.firstName === undefined ||
      formData.firstName === null ||
      formData.lastName === "" ||
      formData.lastName === undefined ||
      formData.lastName === null ||
      formData.email === "" ||
      formData.email === undefined ||
      formData.email === null ||
      formData.phoneNo === "" ||
      formData.phoneNo === undefined ||
      formData.phoneNo === null
    ) {
      isValid = true;
      setError(true);
    } else if (formData.email && !isValidEmail(formData.email)) {
      isValid = true;
      setError(true);
    }

    const params = {
      adminKeyID: user?.adminKeyID,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNo: formData.phoneNo,
      email: formData.email,
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
        // setAddUpdateActionDone(true);
        setShowSuccessPopUp(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4" style={{ color: "#2e7d32" }}>
        Admin Profile
      </h2>

      <Card
        className="shadow-sm"
        style={{
          transition: "none",
          transform: "none",
          boxShadow: "0 0 0 rgba(0,0,0,0)", // removes shadow if hover causes it
        }}
      >
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-start d-block">
                    First Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    // disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-start d-block">
                    Last Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    // disabled
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-start d-block">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    // disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="text-start d-block">
                    Phone Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNo"
                    maxLength={10}
                    value={formData.phoneNo}
                    onChange={handleChange}
                    // disabled
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end">
              <button
                type="submit"
                style={{
                  backgroundColor: "#2e7d32",
                  color: "white",
                  borderRadius: "0.375rem",
                  padding: "10px 30px",
                  whiteSpace: "nowrap",
                }}
              >
                Save Changes
              </button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <SuccessPopUP
        show={showSuccessPopUp}
        onHide={() => setShowSuccessPopUp(false)}
        message="Admin Updated Successfully!"
      />
    </div>
  );
};

export default AdminProfile;

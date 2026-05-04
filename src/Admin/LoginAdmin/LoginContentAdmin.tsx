/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoginAPI } from "../../APIServices/Auth/AuthAPI";
import logo from "/assets/img/logo.png";
import { useAuth, useLoader } from "../../Context/Context";
import {
  Form,
  Card,
  Container,
  Row,
  Col,
  FormGroup,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

interface FormEventHandler {
  (event: React.FormEvent<HTMLFormElement>): void;
}

const LoginContentAdmin = () => {
  const handleForm: FormEventHandler = (event) => {
    event.preventDefault();
  };

  const [error, setError] = useState(false);
  const { setLoader } = useLoader();
  const [loginObj, setLoginObj] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const adminData = localStorage.getItem("authUser");
    if (adminData) {
      localStorage.removeItem("Userlogin");
      navigate("/admin/dashboard");
    }
  }, []);

  const handleLogin = () => {
    let isValid = false;
    if (
      loginObj.email === "" ||
      loginObj.email === null ||
      loginObj.email === undefined ||
      loginObj.password === "" ||
      loginObj.password === null ||
      loginObj.password === undefined
    ) {
      isValid = true;
      setError(true);
    }

    const params = {
      email: loginObj.email,
      password: loginObj.password,
    };

    if (!isValid) {
      LoginApiData(params);
    }
  };

  const LoginApiData = async (params: { email: string; password: string }) => {
    setLoader(true); // 🔄 show loader
    try {
      const res = await LoginAPI(params);

      if (res.statusCode === 200) {
        setLoader(false);
        toast.success(res.message || "Login successful ✅");
        const data = res.responseData.data;
        login(data);
        navigate("/admin/dashboard");
      } else {
        setLoader(false);
        toast.error(res.response.data.errorMessage);
      }
    } catch (error: any) {
      setLoader(false);
      toast.error(error?.responseData?.data?.errorMessage);
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center min-vh-100 bg-light"
        // style={{ background: `url(${logo})` }}
      >
        <Container>
          <Row className="justify-content-between">
            <Col
              md={6}
              className="d-flex justify-content-center align-items-center"
            >
              <img src={logo} alt="Logo" />
            </Col>

            <Col md={6} lg={5}>
              <Card
                className="shadow-sm"
                style={{
                  transition: "none",
                  transform: "none",
                  boxShadow: "0 0 0 rgba(0,0,0,0)",
                }}
              >
                <Card.Body>
                  <h3 className="text-center mb-3">Welcome back</h3>
                  <p className="text-center text-muted mb-4">
                    Enter your email and password to continue
                  </p>
                  <Form onSubmit={handleForm}>
                    {/* Email */}
                    <FormGroup className="mb-3">
                      <FormControl
                        type="email"
                        placeholder="Enter email"
                        autoComplete="off"
                        maxLength={50}
                        required
                        style={{ transition: "none" }}
                        onChange={(e) => {
                          let input = e.target.value;
                          if (input.startsWith(" ")) {
                            input = input.trimStart();
                          }
                          setLoginObj((prev) => ({
                            ...prev,
                            email: input,
                          }));
                        }}
                      />
                    </FormGroup>

                    {/* Password with eye icon */}
                    <FormGroup className="mb-4">
                      <InputGroup>
                        <FormControl
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          autoComplete="off"
                          maxLength={45}
                          required
                          style={{ transition: "none" }}
                          onChange={(e) => {
                            let input = e.target.value;
                            if (input.startsWith(" ")) {
                              input = input.trimStart();
                            }
                            setLoginObj((prev) => ({
                              ...prev,
                              password: input,
                            }));
                          }}
                        />
                        <InputGroup.Text
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ cursor: "pointer" }}
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                          {/* {showPassword ? <Eye /> : <EyeOff />} */}
                        </InputGroup.Text>
                      </InputGroup>
                    </FormGroup>

                    {/* Submit */}
                    <button
                      style={{ color: "white", backgroundColor: "#2e7d32" }}
                      type="submit"
                      className="w-100"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default LoginContentAdmin;

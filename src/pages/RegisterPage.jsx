import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import {
  isValidPhoneNumber,
  toastNavigateHelper,
  toastHelper,
  validatePassword,
  isUserLoggedIn,
} from "../utils/helpers";
import { ToastContainer } from "react-toastify";
import { useUserContext } from "../context/user_context";
const RegisterPage = () => {
  const { register, result_register, login } = useUserContext();
  const [resultRegister, setResultRegister] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    setEmail(email);
    const password = formData.get("password");
    setPassword(password);
    const repeat_password = formData.get("repeat_password");
    const phone = formData.get("phone");
    console.log(name, email, password, repeat_password, phone);
    const { isValid, errorMessage } = validatePassword(
      password,
      repeat_password
    );
    if (!isValidPhoneNumber(phone)) {
      toastHelper("error", "Phone number must have at least 10 digits", 2000);
    } else if (!isValid) {
      toastHelper("error", errorMessage, 4500);
    } else {
      register(name, email, phone, password, setResultRegister);
    }
  };
  useEffect(() => {
    if (isUserLoggedIn()) {
      navigateTo("/");
    }
  });
  useEffect(() => {
    if (
      result_register != "" &&
      result_register != null &&
      email != null &&
      password != null &&
      result_register === "Register user successfully!"
    ) {
      console.log(result_register);
      login(email, password);
      console.log(result_register);
      toastNavigateHelper("success", result_register, 1000, () => {
        navigateTo("/");
      });
    } else if (
      result_register != "" &&
      result_register != null &&
      email != null &&
      password != null
    ) {
      toastHelper("error", result_register);
    }
  }, [result_register]);
  return (
    <Wrapper>
      <ToastContainer />
      <div className="container_login">
        <MDBContainer fluid>
          <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol
                  md="10"
                  lg="7"
                  className="order-1 order-lg-1 d-flex align-items-center"
                >
                  <MDBCardImage
                    src="https://img.freepik.com/free-vector/mega-sale-banner-your-online-store-realistic-style-with-phone-map-cart-bag-gift-vector-illustration_548887-132.jpg?w=1380&t=st=1680888938~exp=1680889538~hmac=3a9583321b4dfcfc87c5ba4101580759a3b9ab4153ee519d9c5b564f3185c800"
                    fluid
                  />
                </MDBCol>

                <MDBCol
                  md="10"
                  lg="5"
                  className="order-2 order-lg-2 d-flex flex-column align-items-center"
                >
                  <form
                    onSubmit={handleSubmit}
                    className="order-2 order-lg-2 d-flex flex-column align-items-center"
                  >
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Register
                    </p>

                    <div className="d-flex flex-row align-items-center mb-4  input_login">
                      <MDBIcon fas icon="user me-3" size="lg" />
                      <MDBInput
                        required
                        name="name"
                        label="Your Name"
                        id="form1"
                        type="text"
                        className="w-200"
                      />
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4 input_login">
                      <MDBIcon fas icon="envelope me-3" size="lg" />
                      <MDBInput
                        label="Your Email"
                        id="form2"
                        type="email"
                        required
                        name="email"
                      />
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4 input_login">
                      <MDBIcon fas icon="lock me-3" size="lg" />
                      <MDBInput
                        label="Password"
                        id="form3"
                        type="password"
                        required
                        name="password"
                      />
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4 input_login">
                      <MDBIcon fas icon="key me-3" size="lg" />
                      <MDBInput
                        label="Repeat your password"
                        id="form4"
                        type="password"
                        required
                        name="repeat_password"
                      />
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4 input_login">
                      <MDBIcon fas icon="phone me-3" size="lg" />
                      <MDBInput
                        label="Phone"
                        id="form5"
                        type="number"
                        required
                        name="phone"
                      />
                    </div>
                    {/* <div className="mb-4">
                    <MDBCheckbox
                      name="flexCheck"
                      value=""
                      id="flexCheckDefault"
                      label="Subscribe to our newsletter"
                    />
                  </div> */}
                    <div className="text-center mb-5 mx-1 mx-md-4 ">
                      <p className="mb-1">You have an account yet?</p>
                      <Link className="" to="/login">
                        Login
                      </Link>
                    </div>
                    <MDBBtn className="mb-4" size="lg">
                      Register
                    </MDBBtn>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>

          <link
            href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
            rel="stylesheet"
          />
        </MDBContainer>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .container_login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 10rem);
    background-color: #eaded78c;
  }
  .input_login {
    input {
      width: 32vh;
    }
  }
`;
export default RegisterPage;

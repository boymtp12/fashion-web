import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/user_context";
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
  isTokenExpired,
  isUserLoggedIn,
  toastHelper,
  toastNavigateHelper,
} from "../utils/helpers";
const LoginPage = ({ handleLogin }) => {
  const navigateTo = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logined, setLogined] = useState("");
  const { loading, result, login, error_login } = useUserContext();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("username", username);
    console.log("password", password);
    login(username, password, setLogined);
  };
  useEffect(() => {
    if (logined === "Đăng nhập thành công") {
      toastNavigateHelper("success", "Logged in successfully", 1000, () => {
        navigateTo("/");
      });
      setLogined("");
      console.log("logined", logined);
      handleLogin(true);
    } else if (logined === "Đăng nhập không thành công!") {
      toastHelper("warming", "Login unsuccessful!", 1000);
      setLogined("");
      console.log("logined 123", logined);
    } else if (logined === "error") {
      toastHelper("warming", "Something went wrong!", 1000);
      console.log("logined 123", logined);
      setLogined("");
    } else if (isUserLoggedIn()) {
      console.log("logined 123", logined);
      toastNavigateHelper("success", "Logged", 500, () => {
        navigateTo("/");
      });
    }
  }, [logined]);

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
                    action=""
                    onSubmit={submitHandler}
                    style={{ textAlign: "center" }}
                  >
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Log in
                    </p>

                    <div className="d-flex flex-row align-items-center mb-4  input_login">
                      <MDBIcon fas icon="user me-3" size="lg" />
                      <MDBInput
                        label="Your Account"
                        id="form1"
                        type="text"
                        className="w-200"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4 input_login">
                      <MDBIcon fas icon="lock me-3" size="lg" />
                      <MDBInput
                        label="Password"
                        id="form3"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="text-center mb-5 mx-1 mx-md-4 ">
                      <p className="mb-1">Don't you have an account yet?</p>
                      <Link className="" to="/register">
                        Register
                      </Link>
                    </div>
                    <MDBBtn
                      className="mb-4"
                      size="lg"
                      type="submit"
                      value="Login"
                    >
                      Login
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
export default LoginPage;

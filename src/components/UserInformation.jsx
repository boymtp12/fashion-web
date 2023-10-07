import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { message } from "antd";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBInput,
  MDBModalBody,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import PageHero from "./PageHero";
import { useUserContext } from "../context/user_context";
import { isUserLoggedIn } from "../utils/helpers";
import UpdateUserInfor from "./UpdateUserInfor";
import userApi from "../api/userApi";

const UserInformation = () => {
  const {
    result,
    user_information,
    getUser,
    result_update_user,
    changePassword,
    result_change_password,
  } = useUserContext();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [resultChange, setResultChange] = useState("");

  useEffect(() => {
    if (isUserLoggedIn()) {
      getUser();
    }
  }, [result]);
  useEffect(() => {
    console.log(user_information);

    if (isUserLoggedIn()) {
      if (result_update_user) {
        toast.success("Cập nhật thành công", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (result_update_user != null && result_update_user === false) {
        toast.error("Cập nhật không thành công", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }, [user_information]);
  console.log(user_information);
  const [isOpen, setIsOpen] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(resultChange);
    if (newPassword !== confirmNewPassword) {
      toast.warning("New password and confirm password do not match!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (
      oldPassword === newPassword &&
      oldPassword === confirmNewPassword
    ) {
      toast.warning("The old password is the same as the new password!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      changePassword(oldPassword, newPassword, setResultChange);
    }
  };
  useEffect(() => {
    console.log("come here", result);
    if (
      result_change_password !== null &&
      result_change_password !== "" &&
      resultChange === false
    ) {
      console.log("come here", result);

      if (result_change_password === "Change password success!!") {
        toast.success("Change password success!!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Change Password failed!!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setResultChange("not changed");
    }
  }, [resultChange]);
  return (
    <Wrapper>
      <ToastContainer />{" "}
      <section className="user_container" style={{ backgroundColor: "#eee" }}>
        <PageHero title="user" />
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px", marginBottom: "10px" }}
                    fluid
                  />
                  <p className="text-muted mb-4">{user_information.name}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn onClick={() => setIsOpen(true)}>
                      Update information
                    </MDBBtn>
                  </div>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn onClick={() => setIsChangePassword(true)}>
                      Change password
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>ID</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user_information.id}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user_information.name}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user_information.email}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Gender</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user_information.gender}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user_information.phone}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user_information.address}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          {isChangePassword && (
            <MDBRow className="justify-content-center">
              <MDBCol lg="8">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBModalBody>
                      <form>
                        <MDBInput
                          label="Old password"
                          type="password"
                          name="phone"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          required
                        />
                        <hr />
                        <MDBInput
                          label="New password"
                          type="password"
                          name="phone"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                        <hr />
                        <MDBInput
                          label="Repeat new password"
                          type="password"
                          name="phone"
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                          required
                        />
                        <MDBBtn
                          type="submit"
                          color="primary"
                          className="w-100 my-3"
                          onClick={handleSubmit}
                        >
                          <MDBIcon fas icon="user-edit" className="me-2" />
                          Update
                        </MDBBtn>
                        <div className="d-flex justify-content-end">
                          <MDBBtn
                            color="secondary"
                            onClick={() => {
                              setIsChangePassword(false);
                            }}
                          >
                            Cancel
                          </MDBBtn>
                        </div>
                      </form>
                    </MDBModalBody>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          )}
        </MDBContainer>{" "}
      </section>
      {isOpen && <UpdateUserInfor setIsOpen={setIsOpen} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    min-height: calc(100vh - 10rem - 12.587rem);
  }
`;
export default UserInformation;

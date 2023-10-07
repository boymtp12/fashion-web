import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useUserContext } from "../context/user_context";

const UpdateUserInfor = ({ setIsOpen }) => {
  const { user_information, updateUser } = useUserContext();
  const [formData, setFormData] = useState({
    name: user_information.name,
    gender: user_information.gender,
    phone: user_information.phone,
    address: user_information.address,
  });

  const { name, gender, phone, address } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FORM DATA", formData);
    updateUser(
      formData.name,
      formData.gender,
      formData.phone,
      formData.address
    );
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <MDBModal
      show={true}
      onClick={(e) => setIsOpen(false)}
      //   onClick={(e) => e.stopPropagation()}
      tabIndex="-1"
      //   dialogClassName="modal-dialog-centered modal-lg"
    >
      <MDBModalDialog
        style={{ marginTop: "10%", maxWidth: "700px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <MDBModalContent>
          <MDBModalHeader>
            <h5 className="modal-title">Update Information</h5>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={() => setIsOpen(false)}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <form onSubmit={handleSubmit}>
              <MDBInput
                className="mb-3"
                label="Full Name"
                type="text"
                name="name"
                value={name || ""}
                onChange={handleChange}
                required
              />
              <MDBInput
                className="mb-3"
                label="Address"
                type="address"
                name="address"
                value={address || ""}
                onChange={handleChange}
                required
              />
              <MDBInput
                className="mb-3"
                label="Gender"
                type="text"
                name="gender"
                value={gender || ""}
                onChange={handleChange}
                required
              />
              <MDBInput
                label="Phone"
                type="number"
                name="phone"
                value={phone || ""}
                onChange={handleChange}
                required
              />
              <MDBBtn type="submit" color="primary" className="w-100 my-3">
                <MDBIcon fas icon="user-edit" className="me-2" />
                Update
              </MDBBtn>
              <MDBBtn color="secondary" onClick={handleCancel}>
                Cancel
              </MDBBtn>
            </form>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default UpdateUserInfor;

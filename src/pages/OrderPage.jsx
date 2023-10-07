import React from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import { formatPrice } from "../utils/helpers";
const OrderPage = ({ setIsOpen, selectedOrder }) => {
  console.log("selectedOrder", selectedOrder);
  const orderItem = selectedOrder;
  const { orderItemsRespList, orderDetailDTO } = orderItem;
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
        style={{ marginTop: "10%", maxWidth: "1180px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <MDBModalContent>
          <MDBModalHeader>
            <h5 className="modal-title">Chi tiết đơn đặt hàng</h5>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={() => setIsOpen(false)}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBContainer className="mb-5 h-100">
              <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol lg="12" xl="11">
                  <MDBCard className="border border-3 border-color-custom">
                    <MDBCardBody>
                      <p className="lead fw-bold " style={{ color: "#f37a27" }}>
                        Purchase Reciept
                      </p>
                      <MDBRow>
                        <MDBCol>
                          <p className="small text-muted mb-1 fw-bold">
                            Id order
                          </p>
                          <p>{orderItem.id}</p>
                        </MDBCol>
                        <MDBCol>
                          <p className="small text-muted mb-1 fw-bold">Date</p>
                          <p>{orderItem.createTime}</p>
                        </MDBCol>
                        <MDBCol>
                          <p className="small text-muted mb-1 fw-bold">
                            Order Items
                          </p>
                          <p>{orderItem.orderItemsRespList.length}</p>
                        </MDBCol>
                        <MDBCol>
                          <p className="small text-muted mb-1 fw-bold ">
                            Status
                          </p>
                          <p className="fw-bold">{orderItem.status}</p>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol>
                          <p className="small text-muted mb-1 fw-bold">
                            Receiver Name
                          </p>
                          <p>{orderDetailDTO.receiverName}</p>
                        </MDBCol>
                        <MDBCol>
                          <p className="small text-muted mb-1 fw-bold">
                            Receiver Phone
                          </p>
                          <p>{orderDetailDTO.receiverPhone}</p>
                        </MDBCol>
                        <MDBCol>
                          <p className="small text-muted mb-1 fw-bold">
                            Delivery Address
                          </p>
                          <p>{orderDetailDTO.deliveryAddress}</p>
                        </MDBCol>
                        <MDBCol>
                          <p className="small text-muted mb-1 fw-bold ">
                            Delivery Date
                          </p>
                          <p>{orderDetailDTO.deliveryDate || "Waiting"}</p>
                        </MDBCol>
                      </MDBRow>
                      <div
                        className="mx-n5 px-5"
                        style={{ backgroundColor: "#f2f2f2" }}
                      >
                        <MDBRow>
                          <MDBCol md="4" lg="4">
                            <p className="fw-bold">Product name</p>
                          </MDBCol>
                          <MDBCol md="2" lg="2">
                            <p className="fw-bold">Amount</p>
                          </MDBCol>
                          <MDBCol md="2" lg="2">
                            <p className="fw-bold">Option</p>
                          </MDBCol>
                          <MDBCol md="2" lg="2">
                            <p className="fw-bold">Color</p>
                          </MDBCol>
                          <MDBCol md="2" lg="2">
                            <p className="fw-bold">Price</p>
                          </MDBCol>
                        </MDBRow>
                        {orderItemsRespList.map((orderItem) => {
                          return (
                            <MDBRow key={orderItem.id}>
                              <MDBCol md="4" lg="4">
                                <p>{orderItem.productName}</p>
                              </MDBCol>
                              <MDBCol md="2" lg="2">
                                <p>{orderItem.quantity}</p>
                              </MDBCol>
                              <MDBCol md="2" lg="2">
                                <p>{orderItem.productOptionName}</p>
                              </MDBCol>
                              <MDBCol md="2" lg="2">
                                <p>{orderItem.colorName}</p>
                              </MDBCol>
                              <MDBCol md="2" lg="2">
                                <p>{formatPrice(orderItem.price)}</p>
                              </MDBCol>
                            </MDBRow>
                          );
                        })}
                      </div>
                      <MDBRow>
                        <MDBCol
                          md="12"
                          className="offset-md-8 col-lg-3 offset-lg-10"
                        >
                          <p
                            className="lead fw-bold mb-0"
                            style={{ color: "#f37a27" }}
                          >
                            {formatPrice(orderItem.orderDetailDTO.totalPrice)}
                          </p>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};
export default OrderPage;

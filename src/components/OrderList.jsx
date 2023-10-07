import React, { useRef, useState } from "react";
import OrderItem from "./OrderItem";
import { MDBContainer } from "mdb-react-ui-kit";
import { formatPrice } from "../utils/helpers";
import { OrderPage } from "../pages";
import { ToastContainer, toast } from "react-toastify";
const OrderList = ({ order }) => {
  console.log(order);
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrer] = useState();
  const handleSelectOrder = (orderItem) => {
    setIsOpen(true);
    setSelectedOrer(orderItem);
  };
  if (order.length < 1) {
    return (
      <>
        <div className="" style={{ display: "flex" }} ref={ref}>
          <h5
            style={{
              color: "var(--clr-primary-5)",
              fontSize: "1.5rem",
              margin: "auto",
              marginBottom: "2rem",
            }}
          >
            Bạn chưa đặt đơn hàng nào!
          </h5>
        </div>
      </>
    );
  }
  return (
    <>
      <ToastContainer />
      <div className="" style={{ display: "flex" }} ref={ref}>
        <h5
          style={{
            color: "var(--clr-primary-5)",
            fontSize: "1.5rem",
            margin: "auto",
            marginBottom: "2rem",
          }}
        >
          LIST ORDER
        </h5>
      </div>
      <MDBContainer className="mb-5 h-100">
        <table className="table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th style={{ width: "36%" }}>Sản phẩm</th>
              <th>Giá</th>
              <th>Người nhận</th>
              <th>Trạng thái</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {order.map((orderItem) => {
              if (orderItem.orderItemsRespList.length > 0) {
                return (
                  <tr key={orderItem.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="ms-3">
                          <p className="fw-bold mb-1">
                            {orderItem.orderItemsRespList[0].productName}
                          </p>
                          <div style={{ display: "flex", width: "250px" }}>
                            <div style={{ flex: 1 }}>
                              <p
                                className="text-muted mb-0 me-2"
                                style={{ display: "inline-block" }}
                              >
                                Size:
                              </p>
                              <p
                                className="text-muted mb-0"
                                style={{ display: "inline-block" }}
                              >
                                {
                                  orderItem.orderItemsRespList[0]
                                    .productOptionName
                                }
                              </p>
                            </div>
                            <div style={{ flex: 1 }}>
                              <p
                                className="text-muted mb-0 me-2"
                                style={{ display: "inline-block" }}
                              >
                                Color:
                              </p>
                              <span
                                style={{
                                  background:
                                    orderItem.orderItemsRespList[0].colorName,
                                  border: "1px solid black",
                                  display: "inline-block",
                                  width: "0.7rem",
                                  height: "0.7rem",
                                  marginLeft: "0.5rem",
                                }}
                              ></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">
                        {formatPrice(orderItem.orderItemsRespList[0].price)}
                      </p>
                    </td>
                    <td>{orderItem.orderDetailDTO.receiverName}</td>
                    <td>
                      <span
                        className="badge badge-success rounded-pill d-inline"
                        style={{ textTransform: "capitalize" }}
                      >
                        {orderItem.status}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-link btn-sm btn-rounded"
                        style={{ fontSize: "0.7rem", fontWeight: "bold" }}
                        onClick={() => handleSelectOrder(orderItem)}
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        {isOpen && (
          <OrderPage setIsOpen={setIsOpen} selectedOrder={selectedOrder} />
        )}
      </MDBContainer>

      {/* {order.map((orderItem) => {
        if (orderItem.orderItemsRespList.length > 0) {
          return <OrderItem key={orderItem.id} orderItem={orderItem} />;
        }
      })} */}
    </>
  );
};

export default OrderList;

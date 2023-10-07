import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
Modal.setAppElement("#root");
const ModalConfirm = ({ isOpen, onClose, onConfirm }) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);
  const closeModal = () => {
    // setModalIsOpen(false);
    onClose();
  };

  const handleConfirm = () => {
    closeModal();
    onConfirm();
  };
  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="modalConfirm"
      contentLabel="Confirm Dialog"
    >
      <div className="modal-content">
        <h2>Xác nhận đặt hàng</h2>
        <p>Bạn có chắc chắn muốn đặt hàng không?</p>
        <div className="modal-buttons">
          <button className="btn-confirm" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="btn-cancel" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </CustomModal>
  );
};
const CustomModal = styled(Modal)`
  overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid var(--clr-primary-5);
  }

  h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 20px;
    font-weight: bold;
  }

  .modal-buttons {
    display: flex;
    justify-content: center;
  }

  .btn-confirm,
  .btn-cancel {
    padding: 10px 20px;
    margin: 0 10px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }

  .btn-confirm {
    background-color: var(--clr-primary-5);
    color: #fff;
  }

  .btn-confirm:hover {
    background-color: #95532c;
  }

  .btn-cancel {
    background-color: #e8594e;
    color: #fff;
  }

  .btn-cancel:hover {
    background-color: #d32f2f;
  }
`;
export default ModalConfirm;

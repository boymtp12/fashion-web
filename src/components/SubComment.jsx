import React from "react";
import { MDBCardImage } from "mdb-react-ui-kit";
const SubComment = ({ subComment, user_information }) => {
  console.log("subComment", subComment);
  return (
    <div className="d-flex flex-start mt-4">
      <a className="me-3" href="#">
        <MDBCardImage
          className="rounded-circle shadow-1-strong me-3"
          src="https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
          alt="avatar"
          width="65"
          height="65"
        />
      </a>

      <div className="flex-grow-1 flex-shrink-1">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-1">
              {subComment.userName}{" "}
              <span className="small">- {subComment.createTime}</span>
            </p>
          </div>
          <p className="small mb-0">{subComment.content}</p>
        </div>
      </div>
    </div>
  );
};

export default SubComment;

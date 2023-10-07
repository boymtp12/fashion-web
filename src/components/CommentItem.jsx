import React, { useEffect, useState, useRef } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";

import { isUserLoggedIn } from "../utils/helpers";
import SubComment from "./SubComment";
import { useCommentContext } from "../context/comment_context";

const CommentItem = ({ comment, user_information }) => {
  const { id } = useParams();

  const inputRef = useRef(null);
  const [commentsList, setCommentList] = useState(false);

  const { insertSubComment, fetchComments, deleteComment } =
    useCommentContext();
  const [contentComment, setContentComment] = useState("");
  const handleSubmitSubComment = (e) => {
    e.preventDefault();
    console.log("contentComment", contentComment);
    if (contentComment != "") {
      insertSubComment(contentComment, comment.id, setCommentList);
      setCommentList(false);
      inputRef.current.value = "";
    }
  };
  const handleDeleteComment = (e) => {
    e.preventDefault();
    deleteComment(comment.id, setCommentList);
    setCommentList(false);
  };
  useEffect(() => {
    fetchComments(id);
  }, [commentsList]);
  console.log(comment);
  return (
    <div className="d-flex flex-start mb-2">
      <MDBCardImage
        className="rounded-circle shadow-1-strong me-3"
        src="https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
        alt="avatar"
        width="65"
        height="65"
      />

      <div className="flex-grow-1 flex-shrink-1 ">
        <div className="pb-3 pt-2 border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-1 fw-bold">
              {comment.userName}{" "}
              <span className="small fw-bold">- {comment.createTime}</span>
            </p>
            {user_information.id === comment.userId && (
              <MDBBtn onClick={handleDeleteComment}>
                <MDBIcon fas icon="reply fa-xs" />
                <span className="small"> Delete</span>
              </MDBBtn>
            )}
          </div>
          <p className=" mb-0">{comment.content}</p>
        </div>
        {isUserLoggedIn() ? (
          <div className="d-flex flex-start mt-3">
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
                  <p className="mb-1">{user_information.name}</p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <input
                    onChange={(e) => setContentComment(e.target.value)}
                    ref={inputRef}
                    type="text"
                    style={{
                      height: "35px",
                      padding: "0 15px",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid #000000",
                      width: "90%",
                    }}
                  />
                  <MDBBtn
                    onClick={handleSubmitSubComment}
                    style={{
                      marginTop: "10px",
                      width: "10%",
                      marginLeft: "10px",
                    }}
                  >
                    Submit
                  </MDBBtn>
                </div>

                {/* <p className="small mb-0">
            the majority have suffered alteration in some
            form, by injected humour, or randomised words.
          </p> */}
              </div>
            </div>
          </div>
        ) : null}

        {comment.subComments != null && comment.subComments.length > 0
          ? comment.subComments.map((subComment) => {
              return (
                <SubComment
                  key={subComment.id}
                  subComment={subComment}
                  user_information={user_information}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default CommentItem;

import React, { useEffect, useState, useRef } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import { useUserContext } from "../context/user_context";
import { isUserLoggedIn } from "../utils/helpers";
import { useCommentContext } from "../context/comment_context";
import CommentItem from "./CommentItem";

const CommentList = () => {
  const { id } = useParams();
  const [contentComment, setContentComment] = useState("");
  const { user_information } = useUserContext();
  const { fetchComments, comments } = useCommentContext();
  const inputRef = useRef(null);
  useEffect(() => {
    fetchComments(id);
  }, [id]);
  const [commentsList, setCommentList] = useState(false);
  useEffect(() => {
    fetchComments(id);
  }, [commentsList]);
  const handleSubmitComment = (e) => {
    e.preventDefault();
    console.log("contentComment", contentComment);
    if (contentComment != "") {
      setCommentList(false);
      inputRef.current.value = "";
    }
  };
  console.log("comments in COMMENT", comments);

  console.log("USER INFOR COMMENTs", user_information);
  console.log("isUserLoggedIn COMMENTs", isUserLoggedIn());

  return (
    <section className="gradient-custom ">
      <MDBContainer className="py-5 pb-0">
        <MDBRow className="justify-content-center">
          <MDBCol md="12" lg="12" xl="12">
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBTypography tag="h4" className="text-center mb-4 pb-2">
                  Comments
                </MDBTypography>

                <MDBRow>
                  <MDBCol>
                    {isUserLoggedIn() ? (
                      <div className="d-flex flex-start mb-2">
                        <MDBCardImage
                          className="rounded-circle shadow-1-strong me-3"
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                          alt="avatar"
                          width="65"
                          height="65"
                        />

                        <div className="flex-grow-1 flex-shrink-1">
                          <div>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-1">{user_information.name}</p>
                            </div>
                            <input
                              onChange={(e) =>
                                setContentComment(e.target.value)
                              }
                              ref={inputRef}
                              type="text"
                              style={{
                                background: "transparent",
                                border: "none",
                                borderBottom: "1px solid #000000",
                                padding: "2px 5px",
                                width: "100%",
                              }}
                            />
                          </div>
                          <MDBBtn
                            style={{ marginTop: "20px" }}
                            onClick={handleSubmitComment}
                          >
                            Comments
                          </MDBBtn>
                        </div>
                      </div>
                    ) : null}
                    {comments != null && comments.length > 0 ? (
                      comments.map((comment) => {
                        return (
                          <CommentItem
                            key={comment.id}
                            comment={comment}
                            user_information={user_information}
                          />
                        );
                      })
                    ) : (
                      <p>There are no comments yet</p>
                    )}

                    {/* {comments.map((comment) => {
                      return <Comment key={comment.id} {...comment} />;
                    })} */}
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default CommentList;

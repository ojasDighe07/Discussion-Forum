import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CommentsContext } from "../../context/CommentContext";
import { Context } from "../../context/Context";
import { timeAgo } from "../../functions/convertDate";
import { publicRequest } from "../../functions/requestMethods";
import "./comment.css";

function Comment({ comment, index }) {
  const [replyMode, setReplyMode] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(true);
  const location = useLocation();
  const threadId = location.pathname.split("/")[2];
  const { user } = useContext(Context);
  const { comments } = useContext(CommentsContext);

  const handleReply = (e) => {
    e.preventDefault();
    setReplyMode(true);
  };
  const submitReply = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.post("/comment/add", {
        description: replyText,
        thread: threadId,
        user: user._id,
        parent: comment._id,
      });

      window.alert("Comment Added");
      window.location.reload();
    } catch (error) {}
    setReplyMode(false);
  };

   const checkFunc = () => {
    if (comment.user._id === user._id) {
      return { color: "lightblue", fontSize: "13px" };
    }
    return { fontSize: "13px" };
  };

  return (
    <div className="comment-container">
      {comment.parent !== null && (
        <div
          className="horizontalReply-pointer"
          style={{ backgroundColor: "white" }}
        ></div>
      )}

      <div style={{ display: "flex" }}>
        <div style={{ width: "100%" }}>
          <div className="commentTight-container">
            <div
              className="commentTop-container"
              onClick={() => setShowReplies((prev) => !prev)}
            >
              <div className="commentUserName-container">
                <span style={{ color: "#ff7272" }}>#{index + 1} </span>
                <span style={checkFunc()}>
                  <Link to={"/user/" + comment.user._id} style={checkFunc()}>
                    {comment.user.name}
                  </Link>
                </span>
              </div>
            </div>
            <div className="commentBody-container">
              <div style={{ fontSize: "15px" }}>{comment.description}</div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ color: "rgb(157, 148, 136)" }}>
                  posted {timeAgo(comment.createdAt)} ago
                </div>
                {!replyMode && (
                  <div onClick={handleReply} className="reply-button">
                    Reply
                  </div>
                )}
              </div>
            </div>

            {replyMode && (
              <div style={{ marginTop: "10px" }}>
                <input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button
                  className="startThread-button"
                  onClick={submitReply}
                  style={{ marginLeft: "10px" }}
                >
                  Reply
                </button>
                <button
                  style={{ marginLeft: "5px" }}
                  className="startThread-button"
                  onClick={() => setReplyMode(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div>
            {showReplies && (
              <div className="child-replies">
                {comments &&
                  comments.length &&
                  comments.map((element, index) => {
                    if (
                      element.parent !== null &&
                      element.parent._id === comment._id
                    ) {
                      return (
                        <span key={element._id}>
                          <div
                            className="vericalReply-pointer"
                            style={{ backgroundColor: "white" }}
                          ></div>

                          <Comment
                            key={element._id}
                            comment={element}
                            index={index}
                          />
                        </span>
                      );
                    }
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
//comment.parent !== null ||
//  comment.parent === null &&

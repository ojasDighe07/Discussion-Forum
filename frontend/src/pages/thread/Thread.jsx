import React, { useContext } from "react";
import Comment from "../../component/comment/Comment";
import "./thread.css";
import { useEffect, useState } from "react";
import { publicRequest } from "../../functions/requestMethods";
import { useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import { CommentsContext } from "../../context/CommentContext";
import { timeAgo } from "../../functions/convertDate";

function Thread() {
  const [thread, setThread] = useState({});
  const [commentDetails, setCommentDetails] = useState({});
  const [commentMode, setCommentMode] = useState(false);
  const location = useLocation();
  const threadId = location.pathname.split("/")[2];
  const { user } = useContext(Context);
  const { comments, dispatchComments } = useContext(CommentsContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await publicRequest.get(`/thread/byId/${threadId}`);
      setThread(res.data);
      dispatchComments({ type: "UPDATE_START" });
      const { data } = await publicRequest.get(`/comment/comments/${threadId}`);
      dispatchComments({ type: "UPDATE_SUCCESS", payload: data });
    };
    fetchData();
  }, [threadId, dispatchComments]);

  const createComment = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.post("/comment/add", {
        ...commentDetails,
        thread: threadId,
        user: user._id,
        parent: null,
      });
      window.alert("Comment Added");
      window.location.reload();
    } catch (error) {}
    setCommentMode((prev) => !prev);
  };

  const checkFunc = () => {
    if (thread?.user?._id === user?._id) {
      return { color: "lightblue", fontSize: "13px" };
    }
    return { fontSize: "13px" };
  };

  return (
    <div className="forum-container">
      <div className="threadHeading-container">
        <div className="threadUsername-container">
          Welcome to{" "}
          <span style={checkFunc()}>
            <span style={{ fontSize: "15px" }}>{thread?.user?.name}'s</span>{" "}
          </span>
          Thread
        </div>
        <div className="threadName-container">{thread.name}</div>
        <div className="topicName-container">
          posted in{" "}
          <span style={{ color: "rgb(77, 198, 250" }}>
            {thread.topic?.name}
          </span>
        </div>
      </div>
      <div
        style={{
          fontSize: "16px",
          marginTop: "20px",
          color: "white",
          padding: "10px",
          width: "98%",
        }}
        className="commentTight-container"
      >
        <div style={{ fontSize: "18px", marginBottom: "10px" }}>
          Description
        </div>
        <div style={{ fontSize: "16px" }}>{thread.description}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <span>
            {commentMode && (
              <input
                type="text"
                value={commentDetails?.description}
                onChange={(e) =>
                  setCommentDetails({
                    ...commentMode,
                    description: e.target.value,
                  })
                }
              />
            )}
          </span>
          <button
            onClick={createComment}
            className="startThread-button box"
            style={{ margin: "10px" }}
          >
            {commentMode && "Submit"} {!commentMode && "New Comment"}
          </button>
        </div>
      </div>

      <div className="comments-container">
        {comments && comments.length ? (
          comments.map((element, index) => {
            if (element.parent === null)
              return (
                <Comment key={element._id} comment={element} index={index} />
              );
          })
        ) : (
          <div>No Comments</div>
        )}
      </div>
    </div>
  );
}

export default Thread;

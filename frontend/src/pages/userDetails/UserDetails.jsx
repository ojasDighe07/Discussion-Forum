import React, { useEffect, useState } from "react";
// import { useContext } from "react";
// import { Context } from "../../context/Context";
import { publicRequest } from "../../functions/requestMethods";
import { convertDate, timeAgo } from "../../functions/convertDate";
import "./userDetails.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
function UserDetails() {
  const [user, setUser] = useState({});
  const [userThreads, setUserThreads] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [tab, setTab] = useState("threads");
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await publicRequest.get(`user/byId/${userId}`);
        setUser(data);
      } catch (error) {}
    };
    const fetchUserComments = async () => {
      try {
        const { data } = await publicRequest.get(`/comment/user/${userId}`);
        setUserComments(data);
      } catch (error) {}
    };
    const fetchUserThreads = async () => {
      try {
        const { data } = await publicRequest.get(`/thread/byUserId/${userId}`);
        setUserThreads(data);
      } catch (error) {}
    };
    fetchUser();
    fetchUserComments();
    fetchUserThreads();
  }, [userId]);

  return (
    <div className="userDetails-wrapper">
      <div className="userIntro-container box">
        <div style={{ fontSize: " 24px", marginBottom: "10px" }}>
          {user.username}
        </div>
        <div style={{ fontSize: "14px", marginBottom: "10px" }}>
          <i>Registered </i> : {convertDate(user.createdAt)}
        </div>
        <div style={{ fontSize: "14px", marginBottom: "10px" }}>
          <span style={{ fontSize: "14px" }}>
            <i>Last Posted : </i>
          </span>
          {userThreads &&
            userThreads.length &&
            convertDate(userThreads[userThreads.length - 1]?.createdAt)}
        </div>
        <div style={{ fontSize: "14px" }}>
          <i> Posts</i> : {userThreads.length}
        </div>
      </div>
      <div className="userPosts-container">
        <div className="userPosts-heading">
          <div className={tab === "comments" ? "selected" : "rejected"}>
            <div className="userPosts-tab" onClick={() => setTab("comments")}>
              <div>Comments Posted</div>
            </div>
          </div>
          <div className={tab === "threads" ? "selected" : "rejected"}>
            <div className="userPosts-tab" onClick={() => setTab("threads")}>
              <div>Threads Posted</div>
            </div>
          </div>
          <div className={tab === "followed" ? "selected" : "rejected"}>
            <div className="userPosts-tab" onClick={() => setTab("followed")}>
              <div>Topics Followed</div>
            </div>
          </div>
        </div>
        {tab === "threads" && (
          <div className="userThreads-container">
            {userThreads && userThreads.length ? (
              userThreads.map((thread) => (
                <div className="userThread-container box" key={thread._id}>
                  <div className="userThread-heading">
                    <span style={{ color: "rgb(77, 198, 250)" }}>
                      <Link to={"/thread/" + thread._id}>{thread.name} </Link>
                    </span>
                    posted in{" "}
                    <span style={{ color: "rgb(77, 198, 250)" }}>
                      <Link to={"/topic/" + thread?.topic._id}>
                        {thread?.topic.name}{" "}
                      </Link>
                    </span>
                  </div>
                  <div style={{ marginTop: "10px", fontSize: "13px" }}>
                    thread created {timeAgo(thread.createdAt)} ago
                  </div>
                </div>
              ))
            ) : (
              <div>No Threads</div>
            )}
          </div>
        )}
        {tab === "comments" && (
          <div className="userComments-container">
            {userComments && userComments.length ? (
              userComments.map((comment) => (
                <div className="userComment-container box" key={comment._id}>
                  <div>
                    commented on{" "}
                    <span style={{ color: "rgb(77, 198, 250)" }}>
                      <Link to={"/thread/" + comment?.thread._id}>
                        {comment?.thread.name}{" "}
                      </Link>
                    </span>
                  </div>
                  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <div
                      style={{
                        padding: "10px 15px 10px 5px",
                        border: "1px dotted wheat",
                        // wordSpacing: "3px",
                        fontSize: "13px",
                        color: " rgb(233, 230, 225)",
                      }}
                    >
                      {comment.description}
                    </div>
                  </div>
                  <div style={{ marginTop: "10px", fontSize: "13px" }}>
                    posted {timeAgo(comment.createdAt)} ago
                  </div>
                </div>
              ))
            ) : (
              <div>No Comments</div>
            )}
          </div>
        )}
        {tab === "followed" && (
          <div style={{ marginTop: "20px", width: "30%" }}>
            {user?.following && user?.following.length ? (
              user?.following.map((topic, index) => (
                <Link key={topic._id} to={"/topic/" + topic._id}>
                  <div className="topic-container">
                    <div
                      style={{
                        fontSize: "14px",
                        paddingTop: "5px",
                        paddingBottom: "2px",
                      }}
                    >
                      {topic.name}
                    </div>
                    <div
                      style={{
                        paddingRight: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                      }}
                    >
                      {topic.followers}
                      <FontAwesomeIcon
                        icon={faUsers}
                        style={{ marginLeft: "20px" }}
                      />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div style={{ fontSize: "14px" }}>No Topics</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetails;

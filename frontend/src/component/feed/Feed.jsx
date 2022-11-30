import React, { useEffect, useState, useContext } from "react";
import "./feed.css";
import { publicRequest } from "../../functions/requestMethods";
import { Link } from "react-router-dom";
import { convertDate, timeAgo } from "../../functions/convertDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../context/Context";

function Feed() {
  const [threads, setThreads] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const { data } = await publicRequest.get(`/user/feed/${user._id}`);
        setThreads(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchThreads();
  }, []);
  return (
    <div className="feed-container">
      <div
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "18px",
          marginBottom: "20px",
        }}
      >
        Feed
      </div>
      {threads && threads.length ? (
        threads.map((thread) => (
          <div className="feedThread-container" key={thread._id}>
            <div className="feedThreadUser-container">
              <div
                style={{
                  display: "flex",
                  padding: "5px 10px 0px 10px",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{
                    fontSize: 20,
                    color: "rgb(255, 114, 114)",
                    padding: "0px 5px 0px 0px",
                  }}
                />
                <span style={{ fontSize: "15px" }}>
                  <Link to={"/user/" + thread.user?._id}>
                    {thread.user?.name}
                  </Link>
                  <span
                    style={{
                      marginLeft: "7px",
                      fontSize: "12px",
                      textDecoration: "none",
                    }}
                  >
                    {" "}
                    posted {timeAgo(thread.createdAt)} ago
                  </span>
                </span>
              </div>

              <div style={{ padding: "5px 20px 0px 0px", fontSize: "15px" }}>
                {convertDate(thread.createdAt)}
              </div>
            </div>

            <div className="feedThreadInfo-container">
              <div
                style={{
                  textAlign: "center",
                  padding: "0px 10px 10px 0px",
                  fontSize: "23px",
                }}
              >
                <Link to={"/thread/" + thread._id}>{thread.name} </Link>
              </div>
              <div
                style={{ padding: "0px 10px 10px 5px", textAlign: "center" }}
              >
                <Link to={"/topic/" + thread?.topic?._id}>
                  {thread?.topic?.name}
                </Link>
              </div>
              <div style={{ padding: "10px" }}>{thread.description}</div>
            </div>
          </div>
        ))
      ) : (
        <div style={{ textAlign: "center" }}>No Threads to show</div>
      )}
    </div>
  );
}

export default Feed;

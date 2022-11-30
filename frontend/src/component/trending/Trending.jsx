import React, { useEffect, useState } from "react";
import "./trending.css";
import { publicRequest } from "../../functions/requestMethods";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Trending() {
  const [threads, setThreads] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await publicRequest.get(`/thread/trending`);
        setThreads(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="trendingThreads-container">
      <div
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "18px",
          marginBottom: "20px",
        }}
      >
        Trending Threads
      </div>
      {threads && threads.length ? (
        threads.map((thread, index) => (
          <Link to={"/thread/" + thread._id} key={thread._id}>
            <div key={thread._id} className="thread-container">
              <div style={{ paddingLeft: "20px" }}>
                <div
                  style={{
                    fontSize: "14px",
                    paddingTop: "5px",
                    paddingBottom: "2px",
                  }}
                >
                  {thread.name}
                </div>
                <div
                  style={{
                    width: "100%",
                    paddingLeft: "3px",
                    paddingRight: "3px",
                    paddingBottom: "2px",
                    fontSize: "12px",
                  }}
                >
                  posted in {thread.topic?.name}
                </div>
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
                {thread?.comments}
                <FontAwesomeIcon
                  icon={faComments}
                  style={{ marginLeft: "20px" }}
                />
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div style={{ textAlign: "center" }}>No Threads</div>
      )}
    </div>
  );
}

export default Trending;

import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { publicRequest } from "../../functions/requestMethods";
import "./topics.css";
function Topics() {
  const [followedTopics, setfollowedTopics] = useState([]);
  const [allTopics, setAllTopics] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchFollowedTopics = async () => {
      if (!user) return;
      try {
        const { data } = await publicRequest.get(`/user/topics/${user?._id}`);

        setfollowedTopics(data);
      } catch (error) {
        console.log(error, "followed topics");
      }
    };
    const fetchSomeTopics = async () => {
      const res = await publicRequest.get("/topic");
      setAllTopics(res.data);
    };
    fetchFollowedTopics();
    fetchSomeTopics();
  }, [user]);
  return (
    <div className="followedTopics-container">
      <div
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "18px",
          marginBottom: "20px",
        }}
      >
        Followed Topics
      </div>
      <div>
        {followedTopics && followedTopics.length ? (
          followedTopics.map((topic, index) => (
            <Link
              key={topic._id}
              to={"/topic/" + topic._id}
              style={{ marginBottom: "30px" }}
            >
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
          <div
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            No Topics
          </div>
        )}
      </div>
      <div
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "18px",
          marginTop: "30px",
          marginBottom: "10px",
        }}
      >
        Topics you may like
      </div>
      <div>
        {allTopics && allTopics.length ? (
          allTopics.slice(0, 9).map((topic, index) => (
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
          <div
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            No Topics
          </div>
        )}
      </div>
    </div>
  );
}

export default Topics;

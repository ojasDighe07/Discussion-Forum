import { faChartSimple, faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import { convertDate, timeAgo } from "../../functions/convertDate";
import { publicRequest } from "../../functions/requestMethods";
import "./relatedThreads.css";

function RelatedThreads() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [threads, setThreads] = useState([]);
  const [topic, setTopic] = useState({});
  const location = useLocation();
  const topicId = location.pathname.split("/")[2];
  const { user, dispatch } = useContext(Context);

  useEffect(() => {
    if (user && user?.following.includes(topicId.toString())) {
      setIsFollowing(true);
    }
  }, [topicId, user]);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const { data } = await publicRequest.get(`/topic/byId/${topicId}`);
        setTopic(data);
      } catch (error) {}
    };
    const fetchThreads = async () => {
      try {
        const { data } = await publicRequest.get(
          `/thread/byTopicId/${topicId}`
        );
        setThreads(data);
      } catch (error) {}
    };
    fetchTopic();
    fetchThreads();
  }, [topicId]);

  const handleFollow = async (e) => {
    e.preventDefault();
    if (isFollowing) {
      try {
        dispatch({ type: "UPDATE_START" });
        const { data } = await publicRequest.put(
          `/user/unfollow/${topicId}`,
          user
        );
        window.alert("Unfollow Request Successfull");
        dispatch({ type: "UPDATE_SUCCESS", payload: data });
        setTopic((prev) => ({ ...prev, followers: prev.followers - 1 }));
        setIsFollowing(false);
      } catch (error) {
        dispatch({ type: "UPDATE_FAILURE" });
      }
    } else {
      try {
        dispatch({ type: "UPDATE_START" });
        const { data } = await publicRequest.put(
          `/user/follow/${topicId}`,
          user
        );

        window.alert("Follow Request Successfull");
        dispatch({ type: "UPDATE_SUCCESS", payload: data });
        setIsFollowing(true);
        setTopic((prev) => ({ ...prev, followers: prev.followers + 1 }));
      } catch (error) {
        dispatch({ type: "UPDATE_FAILURE" });
        console.log(error);
      }
    }
  };

  return (
    <div className="relatedThreads-wrapper">
      <div className="userIntro-container box">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: " 24px", marginBottom: "10px" }}>
            {topic.name}
          </div>
          <div>
            <Link
              to="/newThread"
              state={{ topicName: threads.length && threads[0]?.topic?.name }}
            >
              <button className="startThread-button box">Start Thread </button>
            </Link>
          </div>
        </div>

        <div style={{ fontSize: "14px", marginBottom: "10px" }}>
          <i>Created </i> : {convertDate(topic.createdAt)}
        </div>
        <div style={{ fontSize: "14px", marginBottom: "10px" }}>
          <span style={{ fontSize: "14px" }}>
            <i>Last Posted : </i>
          </span>
          {threads &&
            threads.length &&
            convertDate(threads[threads.length - 1]?.createdAt)}
        </div>
        <div style={{ fontSize: "14px", marginBottom: "10px" }}>
          Followers : {topic.followers}
        </div>
        <div style={{ fontSize: "14px" }}>
          <i> Related Threads</i> : {threads.length}
          <FontAwesomeIcon
            icon={faChartSimple}
            style={{ marginLeft: "10px" }}
          />
        </div>
      </div>
      <div className="userThreads-container">
        {threads.map((thread) => (
          <div className="relatedThread-container box" key={thread._id}>
            <div>
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
            <div>
              <div>
                posted by{" "}
                <Link
                  to={"/user/" + thread?.user._id}
                  style={{ color: "rgb(77, 198, 250)" }}
                >
                  {thread?.user.name}
                </Link>
              </div>
              <div style={{ textAlign: "center" }}>
                {thread.comments}{" "}
                <FontAwesomeIcon
                  icon={faComments}
                  style={{ marginLeft: "10px" }}
                />{" "}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <button onClick={handleFollow} className="startThread-button box">
          {!isFollowing && "Follow Topic ++"}
          {isFollowing && "Unfollow Topic --"}
        </button>
      </div>
    </div>
  );
}

export default RelatedThreads;

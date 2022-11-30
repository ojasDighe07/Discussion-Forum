import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { publicRequest } from "../../functions/requestMethods";
import "./newThread.css";
function NewThread() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [threadInfo, setThreadInfo] = useState({
    name: "",
    description: "",
    topic: location.state?.topicName || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.post("/topic/add", threadInfo);
      const { data } = await publicRequest.post(`/thread/add`, {
        ...threadInfo,
        user: user._id,
      });
      window.alert("Thread Created");
      navigate(`../thread/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="newThread-wrapper">
      <div className="newThreadDetails-wrapper">
        <div className="form-container">
          <div>
            <div>Topic Name</div>
            <input
              type="text"
              onChange={(e) =>
                setThreadInfo({ ...threadInfo, topic: e.target.value })
              }
              value={threadInfo.topic}
            />
          </div>
          <div>
            <div>Thread Name</div>
            <input
              type="text"
              onChange={(e) =>
                setThreadInfo({ ...threadInfo, name: e.target.value })
              }
              value={threadInfo.name}
              // className="box"
            />
          </div>

          <div>
            <div>Description</div>
            <textarea
              onChange={(e) =>
                setThreadInfo({ ...threadInfo, description: e.target.value })
              }
              value={threadInfo.description}
            />
          </div>
          <button onClick={handleSubmit} className="startThread-button box">
            Submit Thread
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewThread;

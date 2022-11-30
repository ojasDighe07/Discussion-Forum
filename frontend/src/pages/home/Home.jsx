import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Feed from "../../component/feed/Feed";
import Topbar from "../../component/topbar/Topbar";
import Topics from "../../component/topics/Topics";
import Trending from "../../component/trending/Trending";
import { Context } from "../../context/Context";
import "./home.css";
function Home() {
  const { user } = useContext(Context);
  // const { user, dispatch, isFetching } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      console.log("please navigate");
      navigate("./auth");
    }
  }, [user]);
  return (
    <div className="container">
      <div className="home-container">
        <Topics />
        <Feed />
        <Trending />
      </div>
    </div>
  );
}

export default Home;

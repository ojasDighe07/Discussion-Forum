import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faFeatherPointed,
  faHome,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { publicRequest } from "../../functions/requestMethods";

function Topbar() {
  const { user, dispatch, isFetching } = useContext(Context);
  const [searchTopic, setSearchTopic] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const searchRef = useRef(),
    buttonRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const navigation = async () => {
      if (!user) {
        navigate("./auth");
      }
    };
    navigation();
  }, [user]);

  const handleTopicSearch = async (e) => {
    try {
      const { data } = await publicRequest.get(
        `/topic/byName/${searchRef.current.value}`
      );
      if (data === null) {
        window.alert(`Couldn't find topic ${searchRef?.current?.value}`);
      } else navigate(`/topic/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="topbar-container">
      <div className="appName-container">Forum-App</div>
      <div className="homeLink-container">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Topic.."
          className="searchBar"
          value={searchTopic}
          onChange={(e) => setSearchTopic(e.target.value)}
          ref={searchRef}
        />

        <button
          className="startThread-button box"
          onClick={handleTopicSearch}
          ref={buttonRef}
          disabled={
            !searchRef?.current?.value ||
            searchRef?.current?.value?.length === 0
          }
        >
          Search
        </button>
      </div>
      <div className="topbarNewThread-container">
        <Link to="/newThread">
          <span style={{ position: "relative" }}>
            <FontAwesomeIcon
              icon={faFeatherPointed}
              style={{ fontSize: "22px" }}
            />
            <FontAwesomeIcon
              icon={faPlus}
              style={{ position: "absolute", fontSize: "12px" }}
            />
          </span>
        </Link>
      </div>
      <div className="pfp-container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to={"/user/" + user._id} style={{ paddingLeft: "20px" }}>
            <span>
              <FontAwesomeIcon icon={faUser} />
            </span>
          </Link>

          <span style={{ paddingLeft: "20px", paddingRight: "20px" }}>
            <FontAwesomeIcon icon={faBell} />
          </span>
        </div>
      </div>
      <div className="logout-container">{<Link to="/logout">Logout</Link>}</div>
    </div>
  );
}

export default Topbar;

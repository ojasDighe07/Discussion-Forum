import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";

function Logout() {
  const { user, dispatch, isFetching } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: "LOGOUT" });
    const navigateFunc = async () => {
      navigate("../");
    };
    navigateFunc();
  }, []);
  return <div>Logging Out...</div>;
}

export default Logout;

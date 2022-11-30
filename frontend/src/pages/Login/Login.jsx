import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { publicRequest } from "../../functions/requestMethods";

function Login() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const { dispatch, isFetching } = useContext(Context);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGIN_START" });
      const res = await publicRequest.post("/user/login", userDetails);
      console.log(res.data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      // window.alert("Login Successful");
      console.log("login successful");
      navigate("../../");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      console.log(error);
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Discussion Forum</h3>
          <span className="loginDesc">
            Discuss with friends and the world around you about the things you
            dig.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox" style={{ height: "300px" }}>
            <div>
              <input
                placeholder="Username"
                type="text"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, username: e.target.value })
                }
                value={userDetails?.username}
                className="loginInput"
                style={{ marginBottom: "20px" }}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
                value={userDetails?.password}
                className="loginInput"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="loginButton"
              disabled={isFetching}
            >
              Log In
            </button>
            <button
              className="loginRegisterButton"
              style={{ backgroundColor: "red" }}
              onClick={() => {
                setUserDetails({
                  username: "guestUser",
                  password: "123",
                });
              }}
            >
              Enter as Guest User
            </button>
            <button
              className="loginRegisterButton"
              onClick={() => navigate("../")}
            >
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

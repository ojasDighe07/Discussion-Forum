import React, { useContext, useState } from "react";
import { publicRequest } from "../../functions/requestMethods";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import "./register.css";
function Register() {
  const [userDetails, setUserDetails] = useState({});
  const { dispatch, isFetching } = useContext(Context);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      window.alert("Password doesn't match confirmation");
    } else {
      try {
        dispatch({ type: "LOGIN_START" });
        const res = await publicRequest.post("/user/add", userDetails);
        console.log(res.data);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        window.alert("Registration Successful");
        navigate("../");
      } catch (error) {
        console.log(error);
      }
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
          <div className="loginBox">
            <input
              placeholder="Name"
              className="loginInput"
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
            />
            <input
              placeholder="Username"
              className="loginInput"
              onChange={(e) =>
                setUserDetails({ ...userDetails, username: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="loginInput"
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button
              className="loginButton"
              onClick={handleSubmit}
              disabled={isFetching}
            >
              Sign Up
            </button>
            <button
              className="loginRegisterButton"
              onClick={() => navigate("./login")}
            >
              Log into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

import React, { useContext, useState } from "react";

import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import {
  initializeLoginFramework,
  handleGoogleSignIn,
  handlegoogleSignOut,
  handleFbSignin,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "./LoginManager";

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    signInUser: false,
    name: "",
    email: "",
    photo: "",
    password: "",
    success: false
  });
  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then((res) => {
        handleResponse(res, true)
      });
  };
  const fbSignIn = () => {
    handleFbSignin()
      .then((res) => {
        handleResponse(res, true)
      });
  }
  const signOut = () => {
    handlegoogleSignOut()
      .then((res) => {
        handleResponse(res, false)
      });
  };
  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  }
  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true)
        })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true)
        })
    }
    e.preventDefault();
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.signInUser ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign In</button>
      )}
      <br />
      <button onClick={fbSignIn}>Facebook Signin</button>
      {user.signInUser && (
        <div>
          <p>Welcome, {user.name} </p>
          <img src={user.photo} alt="" />
          <p>Email: {user.email}</p>
        </div>
      )}
      <h3>Our Own authentication</h3>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Sign up</label>

      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleBlur}
            placeholder="Enter Name"
          />
        )}
        <br />
        <input
          type="text"
          onBlur={handleBlur}
          name="email"
          placeholder="Enter Your email"
          required
        />
        <br />
        <input
          type="password"
          onBlur={handleBlur}
          name="password"
          placeholder="Enter Password"
          required
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "Created" : "Logged in"} Successfully
        </p>
      )}
      <p style={{ color: "red" }}>{user.error}</p>
    </div>
  );
}

export default Login;

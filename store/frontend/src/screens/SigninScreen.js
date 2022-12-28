import React, { useContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utilities";
import { useEffect } from "react";

function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  //uselocation is a hook from react-router-dom that return ur current location
  //the value of redirectinUrl will be /shipping
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: contextDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (event) => {
    //stop refreshing page when sign in
    event.preventDefault();
    try {
      //pass email and password thru post method to /api/users/signin (CRUD : create=post),get response and extract response from data
      const { data } = await Axios.post("/api/users/signin", {
        email,
        password,
      });
      //after signin is successful, pass type of action (user_signin) and payload would be data from backend
      contextDispatch({ type: "USER_SIGNIN", payload: data });
      //save user info
      localStorage.setItem("userInfo", JSON.stringify(data));
      //then redirect to the current location or to the Homepage
      navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>

      <h1 className="login-heading mb-4">Sign In</h1>
      <Form autoComplete="off" onSubmit={submitHandler}>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="email"
            id="floatingInput"
            name="email"
            placeholder=" email@address.com"
            // value={credentials.email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label>Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter Password"
            // value={credentials.password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <label>Password</label>
        </div>

        {/* <span className="text-danger">{error}</span> */}
        <div className="d-grid">
          <Button
            className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
            type="submit"
          >
            Sign in
          </Button>
          <div className="text-center"></div>
          <div className="mb-3">
            {" "}
            New Customer?{" "}
            <Link to={`/signup?redirect=${redirect}`}>Create Your Account</Link>
          </div>
        </div>
      </Form>
    </Container>
  );
}

export default SigninScreen;

import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {Helmet} from 'react-helmet-async'
import {useLocation, Link} from 'react-router-dom'
function SigninScreen() {
    const {search} =useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl? redirectInUrl : "/"
  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>

      <h1 className="login-heading mb-4">Sign In</h1>
      <Form autoComplete="off">
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="email"
            id="floatingInput"
            name="email"
            placeholder=" email@address.com"
            // value={credentials.email}
            // onChange={handleChange}
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
            // onChange={handleChange}
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
          <div className="mb-3"> New Customer? {' '} 
          <Link to={`/signup?redirect=${redirect}`}>Create Your Account</Link>
          </div>
        </div>
      </Form>
    </Container>
  );
}

export default SigninScreen;

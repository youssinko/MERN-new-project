import React from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function ShippingScreen() {
  const [fullname, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <Helmet>Shipping Address</Helmet>
      <h1 className="my-3">Shipping Address</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            value={fullname}
            onChange={(event) => setFullName(event.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(event) => setCity(event.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            value={postal}
            onChange={(event) => setPostal(event.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Country</Form.Label>
          <Form.Control
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            required
          ></Form.Control>
        </Form.Group>
      </Form>
      <div className='mb-3'>
        <Button variant='primary' type='submit'>Continue</Button>
      </div>
    </div>
  );
}

export default ShippingScreen;

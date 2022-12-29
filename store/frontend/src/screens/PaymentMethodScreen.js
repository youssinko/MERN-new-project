import React, { useContext, useEffect, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Helmet} from 'react-helmet-async'
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
function PaymentMethodScreen() {
    const navigate = useNavigate();
    const{state,dispatch: contextDispatch}=useContext(Store)
    const{
        cart: {shippingAddress ,PaymentMethod}
    } = state  

    const [PaymentMethodName, setPaymentMethodName]=useState(PaymentMethod || 'PayPal')
    useEffect(()=>{
        if(!shippingAddress.address){
            navigate('/shipping')
        }
    },[])
    const submitHandler=(e)=>{
        e.preventDefault()
        contextDispatch({type: "SAVE_PAYMENT_METHOD" , payload:PaymentMethodName})
        localStorage.setItem('paymentMethod', PaymentMethodName)
    }
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={PaymentMethodName === "PayPal"}
              onChange={(e) => {
                setPaymentMethodName(e.target.value);
              }}
            ></Form.Check>
          </div>
        </Form>
        <div className="mb-3">
          <Button type="submit">Continue</Button>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethodScreen;

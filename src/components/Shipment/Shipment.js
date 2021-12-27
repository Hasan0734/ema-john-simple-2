import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import ProcessPayment from "../ProcessPyment/ProcessPayment";
import "./Shipment.css"
const Shipment = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [shipingData, setShipingData] = useState(null)
  const onSubmit = (data) => {
    setShipingData(data)
  };

  const handlePaymentProcess = paymentId => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser, 
      products: savedCart, 
      shipment: shipingData,
      paymentId,
       orderTime: new Date()};

    fetch('https://damp-temple-19778.herokuapp.com/addOrder', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(orderDetails)
    })
    .then(res => res.json())
    .then(data =>{
      if (data) {
        processOrder()
     
      }
    })
  }

  return (
    <div className="row">
      <div style={{display: shipingData ? 'none': 'block'}} className="col-md-6">
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      
      <input {...register("name", { required: true })} defaultValue={loggedInUser.name} placeholder="Your Name" />
      {errors.name && <span className="error">This name is required</span>}
      <input {...register("email", { required: true })} defaultValue={loggedInUser.email} placeholder="Your Email"/>
      {errors.email && <span className="error">This email is required</span>}
      <input {...register("phone", { required: true })} placeholder=" Your Phone Number" />
      {errors.phone && <span className="error">This phone is required</span>}
      <input {...register("address", { required: true })} placeholder="Enter your address" />
      {errors.address && <span className="error">This address is required</span>}
      <input type="submit" />
    </form>
      </div>
      <div style={{display: shipingData ? 'block': 'none'}} className="col-md-6">
        <h1>Please for me</h1>
        <ProcessPayment handlePayment={handlePaymentProcess}></ProcessPayment>
      </div>
    </div>
  );
};

export default Shipment;

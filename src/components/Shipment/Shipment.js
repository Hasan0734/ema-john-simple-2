import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import "./Shipment.css"
const Shipment = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log('form submitting data', data)
  };
  console.log(watch("example"));
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  return (
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
  );
};

export default Shipment;

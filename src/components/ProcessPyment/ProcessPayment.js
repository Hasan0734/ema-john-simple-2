import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import SimpleCardForm from "./SimpleCardForm";

const stripePromise = loadStripe(
  "pk_test_51J9iFXEdTZX2Ev8ogUfZQP9Nko7rLsT2yGjlhv8uyEpx91qaBe91vVWtIff0nHRmUgZLMdSA9X0jspfP4EN0Gjnr00D7gCBYJJ"
);
const ProcessPayment = ({handlePayment}) => {
  return (
    <Elements stripe={stripePromise}>
     <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
    </Elements>
  );
};

export default ProcessPayment;

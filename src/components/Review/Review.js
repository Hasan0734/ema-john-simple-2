import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import happyImage from '../../images/giphy.gif'
import { useHistory } from "react-router-dom";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] =  useState(false)
  const history = useHistory()
  const handleProceedCheckout = () =>{
    history.push('./shipment')
  }
  const handleRemoveProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    fetch('https://damp-temple-19778.herokuapp.com/productByKeys', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(productKeys)
    })
    .then(res=> res.json())
    .then(data => setCart(data))

  }, []);
  let thankYou;
  if(orderPlaced){
    thankYou =  <img src={happyImage} alt="" />
  }
  return (
    <div className="twin-container">
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem
            product={pd}
            key={pd.key}
            removeProduct={handleRemoveProduct}
          ></ReviewItem>
        ))}
        {
          thankYou
        }
      </div>
      <div className="cart-container">
            <Cart cart={cart}>
              <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
            </Cart>
      </div>
    </div>
  );
};

export default Review;

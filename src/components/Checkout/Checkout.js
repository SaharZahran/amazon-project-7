import React from "react";
import "./Checkout.css";
import Subtotal from "../Subtotal/Subtotal";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { useStateValue } from "../../StateProvider";

function Checkout() {
  console.log = function(){};
  const [{ basket , user},dispatch] = useStateValue();
    
  return (
    
    <div className="checkout">
      {basket.length == 0 ? (
        <div className="bg-[#EAEDED]">
          <h1 className="text-[75px] flex justify-center m-64 ">
            your cart is empty
          </h1>
        </div>
      ):(
      <div className="checkout__left">
        <div>
          <h2 className="checkout__title">Your Shopping Basket</h2>
          {basket.map((item) => (
            <CheckoutProduct
            key={item.id+Math.floor(Math.random()*50)}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
      </div>
      )}
    </div>
  );
}

export default Checkout;

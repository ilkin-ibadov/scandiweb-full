import React from "react";
import { useSelector } from "react-redux";

export default function Cart() {
  const cart = useSelector((state) => state.cart.cartProducts);
  const activeCurrency = useSelector((state) => state.activeCurrency.currency);
  let priceNow;

  if (cart.length) {
    const totalPrice = [];
    let sumWPrice;

    return (
      <>
        <div className="CartProducts">
          <h1>CART</h1>
          {cart.map((product, index) => {
            return (
              <div className="cartProduct">
                <div className="left">
                  <h2>{product.brand}</h2>
                  <h2>{product.name}</h2>
                  <h2>
                    {activeCurrency}
                    {product.prices.filter((price) => {
                      if (price.currency.symbol === activeCurrency) {
                        priceNow = price.amount;
                        console.log(priceNow)
                        totalPrice.push(Math.round(priceNow));
                        sumWPrice = totalPrice.reduce(function (a, b) {
                          return a + b;
                        }, 0);
                      }
                    })}
                    {priceNow}
                  </h2>
                </div>
                <div className="right">
                  <img src={product.gallery[0]} alt="" />
                </div>
              </div>
            );
          })}
          <div className="order">
            <h2>
              <span>Tax 21%:</span> {activeCurrency}
              {Math.round((sumWPrice * 21) / 100)}
            </h2>
            <h2>
              <span>Quantity:</span> {cart.length}
            </h2>
            <h2>
              <span>Total:</span> {activeCurrency}
              {sumWPrice}
            </h2>
            <button>Order</button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="emptyCart">
          <h1>CART</h1>
          <div className="status">
            <h3>Your cart is empty</h3>
          </div>
        </div>
      </>
    );
  }
}

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addActiveProduct } from "../redux/activeProductSlice";
import { addToCart } from "../redux/cartSlice";

function ProductPage() {
  const cart = useSelector((state) => state.cart.cartProducts);
  const activeProduct = useSelector((state) => state.activeProduct.product);
  const activeCurrency = useSelector((state) => state.activeCurrency.currency);
  const [activePhoto, setActivePhoto] = useState();
  const dispatch = useDispatch();
  let priceNow;
  

  if (activeProduct != null) {
    return (
      <div className="Container">
        <div className="ProductPage">
          <div className="photoGallery">
            {activeProduct.gallery.map((image, index) => {
              return (
                <img
                  key={index}
                  src={image}
                  onClick={() => {
                    setActivePhoto(image);
                  }}
                ></img>
              );
            })}
          </div>

          <div className="photoDisplay">
            <img
              src={activePhoto ? activePhoto : activeProduct.gallery[0]}
            ></img>
          </div>

          <div className="productInfo">
            <h1 style={{ marginBottom: 10 }}>{activeProduct.brand}</h1>
            <h1 style={{ fontWeight: 400, marginBottom: 25 }}>
              {activeProduct.name}
            </h1>
            <h1 style={{ fontFamily: "Roboto Condensed", marginBottom: 10 }}>
              Price:
            </h1>
            <h1>
              {activeCurrency}
              {activeProduct.prices.filter((price) => {
                    if (price.currency.symbol === activeCurrency) {
                      priceNow = price.amount;
                    }
                  })}
                {priceNow}
            </h1>
            <button
              onClick={() => {
                dispatch(addToCart(activeProduct));
              }}
            >
              ADD TO CART
            </button>
            <div className="textBox">
              <p style={{ fontFamily: "Roboto" }}>
                {activeProduct.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;

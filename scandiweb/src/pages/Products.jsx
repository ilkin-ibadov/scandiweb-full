import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductPage from "./ProductPage";
import { addActiveProduct } from "../redux/activeProductSlice";
import { addToCart } from "../redux/cartSlice";
import { addActiveCurrency } from "../redux/activeCurrencySlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function Products() {
  const { error, loading, data } = useProducts();
  const cart = useSelector((state) => state.cart.cartProducts);
  const activeCurrency = useSelector((state) => state.activeCurrency.currency);
  const activeCategory = useSelector((state) => state.activeCategory.category);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categorized = [];
  let priceNow;

  

  if (!loading && activeCategory) {
    data.category.products.filter((product) => {
      if (product.category === activeCategory) {
        categorized.push(product);
      }
    });
    // console.log(categorized);
  }

  if (categorized.length) {
    return (
      <div className="Products">
        {categorized.map((product, index) => {
          return (
            <div
              className="Product"
              key={index}
              onClick={() => {
                dispatch(addActiveProduct(product));
                navigate("/product");
              }}
            >
              <div className="productPhoto">
                <img src={product.gallery[0]} />
              </div>
              <div
                className="addCart"
                onClick={() => {
                  dispatch(addToCart(product));
                }}
              >
                <i class="fa-solid fa-cart-shopping"></i>
              </div>
              <div className="productInfo">
                <h2>{product.name}</h2>
                <h3>
                  {activeCurrency}
                  {product.prices.filter((price) => {
                    if (price.currency.symbol === activeCurrency) {
                      priceNow = price.amount;
                    }
                  })}
                  {priceNow}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h1>Something went wrong, please reload the page</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!loading || (!categorized.length && activeCategory === "all")) {
    return (
      <div className="Products">
        {data.category.products.map((product, index) => {
          return (
            <div
              className="Product"
              key={index}
              onClick={() => {
                dispatch(addActiveProduct(product));
                navigate("/product");
              }}
            >
              <div className="productPhoto">
                <img src={product.gallery[0]} />
              </div>
              <div className="addCart">
                <i class="fa-solid fa-cart-shopping"></i>
              </div>
              <div className="productInfo">
                <h2>{product.name}</h2>
                <h3>
                  {activeCurrency}
                  {product.prices.filter((price) => {
                    if (price.currency.symbol === activeCurrency) {
                      priceNow = price.amount;
                    }
                  })}
                  {priceNow}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
